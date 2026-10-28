# Auditoria de Segurança (AppSec Checklist — 20 pontos)

**Repositório:** `controle-de-estagiario`
**Stack identificada:** SPA React 18 + Vite (sem build step de backend próprio) consumindo **Supabase** diretamente do front-end (`@supabase/supabase-js`) — Postgres com RLS, Auth (email/senha), Storage e 4 Edge Functions (Deno) para integrações servidor-a-servidor. Não há Express/Node backend tradicional: a "camada de servidor" deste sistema é o Postgres (RLS + funções `SECURITY DEFINER`) e as Edge Functions em `supabase/functions/`.
**Deploy:** Vercel/Netlify (estático) — `vercel.json`/`netlify.toml` já definem CSP, HSTS, `X-Frame-Options: DENY` etc.
**Dado sensível em jogo:** CPF, dados bancários, biometria facial, saúde ocupacional de estagiários/PJ/CLT reais (confirmado pelo próprio `SECURITY.md` do repo).

Esta auditoria é cética por padrão: onde o código já mitiga um risco, isso é reportado como CONFORME com a evidência que sustenta a conclusão — não como cortesia.

---

## Sumário Executivo

- **Senha fixa de quiosque (`estagio123`) e os e-mails de todas as contas de quiosque (estagiário/PJ/CLT, de todas as unidades) estão embutidos em texto puro no bundle JS público** (`src/App.jsx`, `src/config/branding.js`). Qualquer pessoa que abra o DevTools consegue autenticar-se remotamente como o quiosque de qualquer unidade — sem estar fisicamente lá — e bater ponto/ver dados daquela unidade. **Crítica.**
- **Sessão do Supabase Auth (JWT) é persistida em `localStorage`** (`src/supabase.js:33-38`, `persistSession: true` sem storage customizado), não em cookie `HttpOnly`. Qualquer XSS bem-sucedido no app rouba o token de sessão inteiro (supervisor incluído). **Alta.**
- **Segredo de webhook ficou hardcoded em texto puro no histórico do Git** (commit `692455c`, `supabase/functions/sync-grupoib-professional/index.ts`) e só foi corrigido no commit `4e347c7`. O valor está permanentemente exposto para quem tiver acesso ao repositório/clones antigos e **precisa ser rotacionado no Supabase** — o `SECURITY.md` do próprio projeto já reconhece isso mas não há evidência de rotação. **Alta.**
- **Tabela `public.workspaces` foi criada sem `ENABLE ROW LEVEL SECURITY` e sem nenhum `REVOKE`** (`supabase_schema.sql:962-971`), quebrando a garantia de "RLS em toda tabela" que o resto do schema segue à risca (25 das 26 outras tabelas têm RLS). Na configuração padrão do Supabase, isso normalmente deixa a tabela gravável por `anon`. **Média** (dado de baixa sensibilidade, mas é uma falha de padrão sistemático).
- **Sem validação de magic bytes/servidor para uploads de PDF (folha de pagamento e NFSe)** — a checagem é só `file.type`/extensão no navegador, trivialmente falsificável, e o `INSERT`/`UPSERT` vai direto para a tabela sem RPC de validação. **Média.**
- **Política de senha praticamente inexistente** (mínimo de 4 caracteres, senha padrão fixa `"0000"` para estagiários, `"estagio123"` para quiosques, `"primeiro.ultimo123"` para sincronização Grupo IB) e **nenhum schema validator (Zod/Joi) no projeto** — toda validação é manual e dispersa entre componente React e função de banco. **Média/Alta conforme o fluxo.**

Pontos fortes que a auditoria confirma (para não distorcer o quadro): senhas de estagiário e PINs de profissional são armazenados com `bcrypt` via `pgcrypto` (nunca texto puro); há uma migração dedicada (`20260909_harden_authorization_app_metadata.sql`) que já corrigiu uma escalação de privilégio grave (usuário se autopromovendo a `supervisor` editando o próprio `user_metadata`); RLS cobre 25/26 tabelas com policies que usam `app_metadata` (que só `service_role` grava); IDs são UUID em praticamente 100% do schema; não há concatenação de SQL dinâmico em nenhuma função do banco.

---

## 1. `.env` ou segredos rastreados no git

**[VULNERÁVEL]** (parcial — o `.env` em si está correto, mas há outro segredo exposto no histórico)

- `.gitignore` (raiz) já lista `.env`, `.env.local`, `.env.*.local` corretamente.
- `git log --all --full-history -- .env` não retorna nenhum commit — o arquivo `.env` real nunca foi versionado. Apenas `.env.example` está no git, e contém apenas placeholders (`your-project-id`, `your-anon-key`).
- **Porém**, uma varredura mais ampla do histórico (`git log --all -p`) encontra um segredo real hardcoded fora do `.env`:
  - **Localização:** commit `692455cf2fc715961a6469add4ba54bd5138da1c`, `supabase/functions/sync-grupoib-professional/index.ts` (linha `const WEBHOOK_SECRET = "[REDACTED — ver git log do commit para o valor; rotacionar imediatamente no Supabase]";`).
  - Corrigido no commit `4e347c7e1d57a1149721dfcbfe3df7bd974a7e36`, que passou a exigir `Deno.env.get("SYNC_WEBHOOK_SECRET")` (código atual: `supabase/functions/sync-grupoib-professional/index.ts:19-22`).
  - **Impacto:** qualquer clone feito antes da correção, ou qualquer acesso ao histórico do repositório (inclusive um fork antigo, um `git log` num CI, um backup), expõe esse valor. Se o segredo não foi rotacionado no Supabase (Database Webhook + `supabase secrets set`), ele **ainda é válido hoje** e permite chamar a função com privilégio de `service_role` (cria usuários, altera perfis).
  - **Severidade:** Alta.
  - **Correção:** já aplicada no código atual; falta apenas confirmar a rotação operacional. `SECURITY.md:17-23` já lista isso como pendência ("Rotação de segredos"). Se ainda não foi feito:
    ```
    supabase secrets set SYNC_WEBHOOK_SECRET=<novo-valor-gerado-com-openssl-rand-hex-32>
    ```
    e atualizar o header correspondente no Database Webhook do Supabase Studio. Reescrever o histórico do Git (`git filter-repo`) é opcional e só faz sentido se o segredo antigo ainda não tiver sido rotacionado — rotacionar é a correção real, reescrever histórico sem rotacionar não resolve nada.

---

## 2. Chaves/API keys embutidas no bundle front-end

**[VULNERÁVEL]**

- `VITE_SUPABASE_ANON_KEY` no bundle é **esperado e não é o problema** — é a chave pública do Supabase, desenhada para ficar no cliente, protegida pelo RLS (confirmado: 25/26 tabelas com RLS).
- O problema real é outro tipo de segredo embutido: **credenciais de autenticação completas das contas de quiosque**.
  - **Localização:** `src/App.jsx:1155-1158`, `:1191-1194`, `:1222-1225` (`password: 'estagio123'` hardcoded em `handleDirectUnitLogin`/`handleDirectProfessionalLogin`/`handleDirectEmployeeLogin`) + `src/config/branding.js:95,229-282` (lista completa de `kioskEmail`/`professionalKioskEmail`/`employeeKioskEmail` de **todas** as unidades, dos dois workspaces).
  - Confirmado no lado do banco: `supabase_schema.sql:436,495,1334,1706,2386` — todas essas contas usam literalmente `crypt('estagio123', gen_salt('bf'))` como senha.
  - **Impacto:** qualquer pessoa com acesso ao bundle publicado (ou seja, qualquer visitante do site) lê e-mail + senha de login válidos para o quiosque de estagiários, de profissionais PJ e de funcionários CLT de **cada uma das unidades** dos dois workspaces. Como essas contas autenticam de verdade via `supabase.auth.signInWithPassword`, um atacante pode logar remotamente (sem estar na unidade física) e, dentro do escopo de RLS daquele papel/unidade, registrar pontos falsos, abrir o autocadastro daquela unidade ou apenas espionar o que aquele papel vê.
  - Isso **não é hipotético**: o próprio `SECURITY_HARDENING_PROMPT.md` e `SECURITY.md:22` já registram isso como decisão pendente ("Senhas das contas de quiosque — ver decisão pendente... item C-1"), então a equipe já sabe do risco mas ele segue no código em produção.
  - **Severidade:** Crítica (o vazamento de app_metadata que tornava isso uma escalação para *supervisor* já foi corrigido — ver item 9 — mas o acesso não autorizado ao papel de quiosque em si continua de pé).
  - **Correção:** eliminar a senha compartilhada fixa. Duas opções viáveis sem redesenho grande:
    - **Antes** (`src/App.jsx`):
      ```js
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: 'estagio123',
      });
      ```
    - **Depois** — trocar o modelo de "login automático com senha fixa" por um token efêmero assinado pelo servidor (Edge Function) entregue só depois de confirmar geolocalização/rede da unidade, ou, no mínimo, gerar uma senha aleatória por unidade nunca exposta no bundle e obtida via RPC autenticada por um segredo do dispositivo (ex.: um PIN de ativação de tablet configurado uma única vez e guardado em `localStorage` daquele tablet específico, não no bundle público):
      ```js
      const { error } = await supabase.rpc('kiosk_session_token', {
        p_unit_id: unitOption,
        p_device_pin: getDevicePin(), // configurado uma vez por tablet, nunca no bundle
      });
      // função no banco troca o PIN do dispositivo por uma sessão de curta duração
      ```
    Enquanto a correção definitiva não sai, ao menos rotacionar a senha `estagio123` periodicamente reduz a janela de exposição — mas não resolve, porque a nova senha entra no próximo bundle e volta a ficar pública.

---

## 3. Senhas de usuário em texto puro ou hash fraco

**[CONFORME]** (com uma ressalva de política, ver item 6)

- `CREATE EXTENSION IF NOT EXISTS pgcrypto;` (`supabase_schema.sql:7`).
- Toda gravação de senha usa `crypt(p_new_password, gen_salt('bf'))` (bcrypt), nunca texto puro:
  - `reset_intern_password` / `change_intern_password`: `supabase_schema.sql:708,742,1295`.
  - PIN de profissional: `set_professional_pin`/`change_professional_pin`: `supabase_schema.sql:1527,1578,2729`.
  - Verificação usa comparação via `crypt()` contra o hash armazenado (`supabase_schema.sql:1548`), nunca `=` direto sobre senha em claro.
  - Contas de sistema (`create_system_user`): `supabase_schema.sql:3436` também usa `crypt(...gen_salt('bf'))`.
- Não há nenhuma coluna `password`/`pin` armazenada em texto puro em nenhuma tabela do schema.
- **Ressalva:** o hash é forte, mas o *conteúdo* hasheado costuma ser trivial (`"0000"`, PIN de 6 dígitos) — ver item 6, que é o problema real aqui.

---

## 4. Tokens JWT/sessão em localStorage vs cookies HttpOnly/Secure/SameSite

**[VULNERÁVEL]**

- **Localização:** `src/supabase.js:26-39`.
  ```js
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { fetch: fetchWithRetry },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  ```
  Sem um `storage` customizado, o `supabase-js` v2 usa `localStorage` do navegador por padrão para persistir `access_token`/`refresh_token`.
- **Impacto:** qualquer XSS no app (mesmo um vetor menor, ex. um campo mal sanitizado em algum lugar não coberto pelo `sanitizeHtml`, ou uma dependência de terceiro comprometida) consegue ler `localStorage` via JS e exfiltrar o token de sessão inteiro — inclusive de contas `supervisor`. Cookies `HttpOnly` não são legíveis por JavaScript, o que elimina essa classe de roubo de token.
- **Severidade:** Alta (agravada pelo fato de o app processar CPF, dados bancários e biometria — uma sessão de supervisor rouba tudo isso).
- **Correção:** migrar para o padrão `@supabase/ssr` com cookies (mesmo em SPA puro isso é possível via um pequeno endpoint de troca de sessão), ou, no mínimo, isolar o storage e reduzir o TTL do refresh token. Exemplo mínimo de mitigação (não elimina o risco, mas reduz a superfície) usando armazenamento em memória + `sessionStorage` como fallback, o que já evita que o token sobreviva ao fechamento da aba/persista indefinidamente:
  ```js
  // Antes: localStorage padrão (implícito)
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });

  // Depois: storage explícito + CSP rígida (já existe em vercel.json/netlify.toml)
  // como camada adicional — o ideal é mover para cookie HttpOnly via um
  // backend/Edge Function de troca de sessão, o que exige refatorar o fluxo
  // de auth para não depender de supabase-js rodando 100% no navegador.
  ```
  Dado que este é um SPA 100% client-side sem backend próprio, a correção completa (cookie `HttpOnly`) exige introduzir uma camada de backend (ex. Edge Function que emite cookie de sessão) — é uma mudança arquitetural, não um patch de uma linha. Registrar como débito técnico prioritário.

---

## 5. Ausência de verificação de e-mail antes de permissões críticas

**[INSUFICIENTE/AUSENTE]**

- Não existe nenhum fluxo de confirmação de e-mail no sistema: contas são criadas por um administrador (via `create_system_user`/`create_intern_user`) ou por sincronização automática, sempre com o e-mail marcado como confirmado de saída:
  - `supabase/functions/sync-grupoib-professional/index.ts:222`: `email_confirm: true` — a conta nasce "confirmada" sem o dono nunca ter clicado em nada.
  - Não há chamada a `signUp` com fluxo de confirmação, nem verificação de `email_confirmed_at` em nenhuma policy/função (`grep` por `email_confirmed_at`/`email_verified` só aparece no dump interno do `auth.users`, nunca checado pela aplicação).
- **Compensação parcial existente:** os fluxos de autocadastro (`EmployeeSelfRegistration.jsx`, `ProfessionalSelfRegistration.jsx`) criam o registro com `registration_status = 'pending_validation'`, e a concessão de papel/permissão real só acontece depois que um humano (RH/supervisor) valida manualmente o cadastro. Isso mitiga o risco de "e-mail não verificado vira acesso automático", mas é uma aprovação manual, não uma verificação de posse do e-mail.
- **Por que isso é insuficiente e não "conforme":** nada impede que alguém se autocadastre usando um e-mail que não é seu (ex. o e-mail do RH real) e, se o processo de validação manual falhar em perceber a inconsistência, o sistema passa a mandar comunicações (senha inicial, notificações) para um endereço que a pessoa nunca comprovou controlar.
- **Correção recomendada:** adicionar verificação de posse de e-mail (link de confirmação com token de uso único, TTL curto) como pré-requisito para qualquer conta que receba um papel além de "candidato pendente" — inclusive as contas de sincronização (`sync-grupoib-professional`), que hoje pulam a confirmação (`email_confirm: true`) por decisão consciente mas documentada como pendência em `sync-grupoib-professional/index.ts:136-146`.

---

## 6. Falta de requisitos mínimos de senha (comprimento/entropia)

**[VULNERÁVEL]**

- **Localização:** `src/App.jsx:1264-1272` (troca de senha de estagiário):
  ```js
  if (newPassword.trim() === '0000') {
    setPasswordChangeError('A nova senha deve ser diferente da inicial "0000".');
    return;
  }
  if (newPassword.length < 4) {
    setPasswordChangeError('A nova senha deve conter pelo menos 4 caracteres.');
    return;
  }
  ```
  Isso é **só front-end**: a RPC `change_intern_password` (`supabase_schema.sql:724-753`) não repete nenhuma validação de tamanho/força — aceita qualquer string, inclusive vazia, se chamada diretamente (via `supabase.rpc(...)` no console do navegador ou por qualquer cliente HTTP autenticado, contornando a tela).
- Senha inicial/reset fixa e trivial: `"0000"` para estagiários (`App.jsx:1264,1312`), `"estagio123"` para contas de quiosque (item 2), `"admin321"` para as contas seed de supervisor no schema (`supabase_schema.sql:194,253,312,371` — dado de seed/demo, mas se esse script rodar em produção sem troca imediata, é uma senha de admin previsível e documentada em texto puro no repositório).
- **Impacto:** um estagiário pode manter/trocar para uma senha de 4 caracteres numéricos (10.000 combinações), e a única barreira contra força bruta é o rate limiting nativo do Supabase Auth (fora do controle desta aplicação — ver item 15). Comparar com o PIN de profissional, que tem regra de força aplicada **no banco** (`is_valid_professional_pin`, `supabase_schema.sql:1505-1510`) — o mesmo padrão simplesmente não existe para senha de estagiário.
- **Severidade:** Média-Alta (mitigada parcialmente pelo RLS que limita o que a conta comprometida alcança, mas ainda expõe ponto, dados pessoais e autocadastro daquele estagiário).
- **Correção:**
  - **Antes** (`supabase_schema.sql:724`):
    ```sql
    CREATE OR REPLACE FUNCTION public.change_intern_password(p_intern_id uuid, p_new_password text) RETURNS void AS $$
    BEGIN
      ...
      UPDATE auth.users SET encrypted_password = crypt(p_new_password, gen_salt('bf')), updated_at = now()
      WHERE id = p_intern_id;
    END;
    $$;
    ```
  - **Depois:**
    ```sql
    CREATE OR REPLACE FUNCTION public.change_intern_password(p_intern_id uuid, p_new_password text) RETURNS void AS $$
    BEGIN
      ...
      IF length(p_new_password) < 8
         OR p_new_password IN ('0000','00000000','12345678','estagio123')
         OR p_new_password !~ '[0-9]' OR p_new_password !~ '[A-Za-z]' THEN
        RAISE EXCEPTION 'password_too_weak';
      END IF;
      UPDATE auth.users SET encrypted_password = crypt(p_new_password, gen_salt('bf')), updated_at = now()
      WHERE id = p_intern_id;
    END;
    $$;
    ```
    Aplicar a mesma checagem em `reset_intern_password` para a senha usada por quem reseta manualmente, e trocar o reset padrão de `"0000"` fixo para um valor aleatório de uso único.

---

## 7. Painel admin com OAuth vulnerável (state CSRF, callback, escopos, validação de domínio)

**[INSUFICIENTE/AUSENTE]** — justificativa: não há OAuth no sistema

- `grep -rn "OAuth\|oauth\|signInWithOAuth\|provider:" src/ supabase/` não retornou nenhuma ocorrência.
- Toda autenticação é feita via `supabase.auth.signInWithPassword` (e-mail/senha) — não há Google/Microsoft/GitHub login, nem qualquer fluxo `authorization_code`/`implicit` com `state`/`redirect_uri` para auditar.
- Como não existe o mecanismo, os subpontos do item (CSRF via `state`, validação do callback, escopos, validação de domínio do provedor) não se aplicam. Isto não é "conforme por ausência de risco" — é reportado como **INSUFICIENTE/AUSENTE** apenas para deixar explícito que o item foi checado e não encontrado, e não porque o item foi tratado com sucesso.
- **Observação:** os únicos "logins federados" que existem são internos entre sistemas Supabase distintos (Grupo IB ⇄ Clínica, item 17), autenticados por segredo compartilhado, não OAuth — já cobertos no item 17.

---

## 8. Ausência de RLS/controle equivalente no banco

**[VULNERÁVEL]** (parcial — quase toda a base está correta, mas uma tabela ficou de fora)

- 25 de 26 tabelas do schema versionado têm `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` explícito (confirmado por contagem: `grep -c "^CREATE TABLE" supabase_schema.sql` = 27 tabelas — 1 é criada dentro de outra migração à parte — e `grep -c "ENABLE ROW LEVEL SECURITY"` = 26).
- A exceção:
  - **Localização:** `supabase_schema.sql:962-971` — `CREATE TABLE IF NOT EXISTS public.workspaces (id text PRIMARY KEY, name text NOT NULL, created_at timestamptz DEFAULT now());` seguida de um `INSERT` com os dois workspaces (`porto-terapia`, `grupoib`). **Não há nenhum `ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY` em nenhum lugar do arquivo**, nem `REVOKE`/`GRANT` específico para essa tabela (`grep -n "GRANT.*workspaces\|REVOKE.*workspaces"` não retorna nada).
  - **Impacto:** no comportamento padrão do Supabase (schema `public` com privilégios de `anon`/`authenticated` concedidos por padrão pelo `supabase_admin`), uma tabela sem RLS e sem `REVOKE` explícito fica acessível via PostgREST (`/rest/v1/workspaces`) para leitura e, dependendo dos GRANTs padrão do projeto, também para escrita — por qualquer chamador com a `anon key` (ou seja, sem sequer estar logado). Mesmo sendo um dado de baixa sensibilidade (só nome/id do workspace), um `INSERT`/`UPDATE`/`DELETE` não autorizado nessa tabela pode: (a) quebrar a lógica de `workspace_id` usada em `units`/RLS de outras tabelas que referenciam `workspaces(id)`, (b) ser usado para plantar um workspace falso que RLS de outra tabela aceite por engano se alguma policy comparar apenas string sem validar contra essa lista.
  - **Severidade:** Média (dado pouco sensível isoladamente, mas quebra o invariante "toda tabela tem RLS" que sustenta a confiança no resto do sistema, e é referenciada por FK em `units.workspace_id`).
  - **Correção:**
    ```sql
    -- Antes: tabela sem RLS
    CREATE TABLE IF NOT EXISTS public.workspaces (
      id text PRIMARY KEY,
      name text NOT NULL,
      created_at timestamp with time zone DEFAULT now()
    );

    -- Depois: RLS habilitado, leitura liberada para autenticados
    -- (é referência/lookup, não precisa ser secreta), escrita restrita
    ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

    CREATE POLICY workspaces_select_authenticated
      ON public.workspaces FOR SELECT TO authenticated USING (true);

    -- Nenhuma policy de INSERT/UPDATE/DELETE = ninguém além de service_role
    -- (que ignora RLS) consegue escrever via API.
    REVOKE INSERT, UPDATE, DELETE ON public.workspaces FROM anon, authenticated;
    ```

---

## 9. RBAC validado só no front-end

**[CONFORME]**

- O próprio código documenta e implementa a separação corretamente:
  - **Localização:** `src/config/permissions.js:1-11`:
    > "O papel (...) continua sendo o que o servidor usa para RLS (...). As permissões abaixo são um refinamento POR CIMA disso: escondem/liberam abas e ações dentro do painel (...). Elas nunca substituem a checagem do banco; um supervisor sem a permissão "financeiro.ver" simplesmente não vê a aba, mas o RLS continua sendo a barreira real."
- Isso é verificável no banco: toda função `SECURITY DEFINER` sensível reexecuta a checagem de papel a partir do JWT, independente do que o front-end mostra/esconde — exemplos: `reset_intern_password` (`supabase_schema.sql:1281-1292`), `set_professional_pin` (`:1518-1521`), `change_professional_pin` (`:1570-1572`).
- **Achado histórico relevante (já corrigido, citado para contexto):** a migração `20260909_harden_authorization_app_metadata.sql` documenta que, antes dela, o RLS confiava em `auth.jwt() -> 'user_metadata'`, que o **próprio usuário logado podia editar** via `supabase.auth.updateUser({ data: { role: 'supervisor' } })` — uma escalação de privilégio horizontal→vertical completa, agravada exatamente pela senha fixa de quiosque do item 2. Isso foi corrigido movendo as claims de autorização para `app_metadata` (que só `service_role` grava) e reescrevendo ~19 funções e 12 policies. O código **atual** já reflete a correção (`jwt_is_supervisor_for_unit` e afins leem `app_metadata`, não `user_metadata` — `supabase/migrations/20260909_harden_authorization_app_metadata.sql:59-84`).
- Conclusão: RBAC de UI é cosmético por design documentado, e a barreira real (RLS + funções) está no banco e é a que de fato é aplicada.

---

## 10. IDs sequenciais/previsíveis (IDOR)

**[CONFORME]**

- `grep -n "id uuid" supabase_schema.sql` retorna 76 ocorrências; `grep -n "SERIAL PRIMARY KEY\|BIGSERIAL"` não retorna nenhuma. Todas as chaves primárias relevantes (`interns.id`, `professionals.id`, `employees.id`, `records.id`, tokens de autocadastro, etc.) são `uuid`, tipicamente com `gen_random_uuid()`/`uuid_generate_v4()` como default.
- IDOR clássico por enumeração de ID sequencial não se aplica aqui. O controle de acesso relevante contra IDOR neste sistema é o RLS por unidade/workspace (item 8/9), que já foi auditado separadamente.

---

## 11. Concatenação de strings em SQL (SQL Injection)

**[CONFORME]**

- Não há nenhuma construção de SQL dinâmico por concatenação de string no schema: `grep -n "EXECUTE \|format(\|quote_ident\|quote_literal"` só retorna sintaxe de trigger (`FOR EACH ROW EXECUTE FUNCTION ...`) e `GRANT EXECUTE ON FUNCTION ...` — nenhum `EXECUTE 'SELECT ... ' || variavel` ou uso de `format()`/`quote_literal()` para montar queries.
- Todas as funções `SECURITY DEFINER` usam parâmetros tipados de PL/pgSQL (`p_intern_id uuid`, `p_new_password text`, etc.) comparados com `=`/`crypt()`, nunca interpolados em texto de comando SQL.
- No front-end, todo acesso a dados passa pelo cliente `supabase-js` (`.eq()`, `.select()`, `.rpc()`), que gera queries parametrizadas via PostgREST — não há nenhum lugar no `src/` montando SQL cru a partir de input do usuário.

---

## 12. Ausência de validação de schema (Zod/Joi/DTO)

**[INSUFICIENTE/AUSENTE]**

- `package.json` não lista `zod`, `joi`, `yup` nem `ajv` em `dependencies`/`devDependencies` (confirmado por grep direto no arquivo).
- A validação de entrada é feita manualmente e de forma dispersa: checagens `if (!campo) setError(...)` espalhadas pelos componentes (ex. `PayrollUploadModal.jsx:72-91`, `NfseUploadModal.jsx:101-120`, `App.jsx:1259-1277`), sem um contrato único (schema) que documente o formato esperado de cada entidade, e sem garantia de que toda chamada a uma RPC passe pelas mesmas regras usadas na tela.
- Isso é atenuado por dois fatores: (a) o Postgres aplica `NOT NULL`, `CHECK` (ex. `is_valid_professional_pin`) e tipos de coluna como última linha de defesa; (b) várias RPCs fazem sua própria validação de formato no banco (ex. regex de PIN, whitelist de `doc_key` em `attach_employee_self_registration_document`, `supabase/migrations/20260910185600_...sql:14-19`).
- Ainda assim, a ausência de um validador de schema central é uma lacuna real: qualquer novo campo/formulário tende a repetir (ou esquecer) validação manualmente, e não há um único lugar para auditar "o que é aceito" por entidade.
- **Recomendação:** introduzir Zod nos formulários e nas chamadas a RPC mais sensíveis (autocadastro, upload, financeiro), com o schema compartilhado entre validação de UI e validação da chamada, para eliminar a divergência front-end/back-end vista no item 6.

---

## 13. Renderização de dados de terceiros como HTML bruto (XSS)

**[CONFORME]**

- Todo uso de `dangerouslySetInnerHTML`/`innerHTML`/`document.write` no projeto passa por `sanitizeHtml` (DOMPurify), sem exceção encontrada:
  - `src/App.jsx:5765,5782,5924`
  - `src/utils/documentPrint.js:25,41`
  - `src/components/tabs/FinanceiroTab.jsx:396`
  - `src/components/tabs/DocumentosProfissionaisTab.jsx:222` (sanitiza antes de guardar em `contractPreview.html`, que é o que alimenta o `dangerouslySetInnerHTML` da linha `504` — confirmado lendo o fluxo completo, não é sanitização "solta" sem uso).
- `src/utils/sanitizeHtml.js:11-22` define uma allowlist de tags/atributos (não é um "sanitize" fraco tipo strip só de `<script>`), incluindo `ALLOWED_URI_REGEXP` para bloquear `javascript:`.
- **Observação menor, não elevada a vulnerabilidade:** a allowlist inclui `iframe` e `style` como tags permitidas (`sanitizeHtml.js:12-14`). Isso é mais permissivo do que o mínimo necessário para os documentos gerados (contratos/declarações/folha) — um `<iframe src="https://site-arbitrario">` tecnicamente passa pelo filtro se `ALLOWED_URI_REGEXP` aceitar o esquema `https:`. Como a fonte desses HTMLs é sempre gerada internamente pela própria aplicação (nomes/campos de formulário, não HTML de terceiros ou upload livre), o vetor de exploração real é baixo, mas vale reduzir a allowlist retirando `iframe` caso nenhum gerador de documento realmente precise dele.

---

## 14. Salvamento de req.body inteiro sem filtragem (Mass Assignment)

**[CONFORME]**

- Não há backend HTTP tradicional recebendo `req.body`; a gravação é sempre via `supabase.from(tabela).insert({...})`/`.update({...})` com objetos montados explicitamente campo a campo no código (`grep -rn "\.insert(\s*{\s*\.\.\." src` e `grep -rn "\.update(\s*formData\|\.insert(\s*formData"` não retornam nenhum resultado) — não há um único ponto do front-end que faça `.insert(formData)`/`.insert({...formData})` espalhando um objeto de estado inteiro do formulário direto para o banco.
- No lado das Edge Functions, o mesmo padrão se repete: `sync-grupoib-professional/index.ts:191-206` monta `commonFields` explicitamente campo a campo a partir do payload do webhook, não faz `insert({...record})`.
- Mesmo que um campo extra fosse enviado, o Postgres rejeitaria colunas inexistentes, e RLS/GRANTs por coluna (onde existem) adicionam outra camada — mas o ponto relevante aqui é que o próprio código-fonte já pratica allow-listing explícito de campos, não dependendo só dessas redes de segurança.

---

## 15. Ausência de rate limiting em rotas sensíveis (login)

**[INSUFICIENTE/AUSENTE]**

- **Fluxo com proteção própria, no banco:** PIN de profissional PJ tem lockout explícito e testável — `verify_professional_pin_internal` (`supabase_schema.sql:1536-1559`): 5 tentativas erradas → bloqueio de 15 minutos, contador reseta em sucesso. Isso é rate limiting real, aplicado no servidor (banco), não contornável pelo cliente.
- **Fluxos sem proteção própria:** login de supervisor e de estagiário/quiosque via `supabase.auth.signInWithPassword` (`src/App.jsx:1121-1124,1155-1158,1191-1194,1222-1225`) **não tem nenhum controle de tentativas no código da aplicação** — nem contador de falhas, nem CAPTCHA, nem atraso progressivo. A única proteção existente é o rate limiting nativo da plataforma Supabase Auth, que é genérico (não fica configurável/observável por este repositório) e não substitui uma política de lockout por conta pensada para o caso de uso (ex.: conta de estagiário com senha de 4 dígitos, ver item 6 — combinação de senha fraca + ausência de lockout próprio é o pior cenário).
- **Severidade do gap:** Média (a proteção de plataforma existe e reduz o risco, mas não é auditável nem ajustável por este projeto, e não cobre o cenário de senha numérica curta do item 6).
- **Correção recomendada:** replicar o padrão já usado para PIN de profissional (`professional_pins`/`verify_professional_pin_internal`) para o login de estagiário — uma tabela `intern_login_attempts` com `failed_attempts`/`locked_until` e uma função que o front-end chame antes/depois do `signInWithPassword`, já que o Supabase Auth em si não expõe esse contador para lógica de aplicação.

---

## 16. CORS permissivo (`Access-Control-Allow-Origin: *`) em rotas privadas

**[VULNERÁVEL]**

- **Localização:** `supabase/functions/fetch-talent-bank/index.ts:33-37`:
  ```ts
  const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-retry-count",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
  ```
  Esta é uma rota **privada por design** — o próprio comentário do arquivo (linhas 9-11) diz "Só contas com papel 'supervisor' (...) podem consultar", e a função de fato valida `role !== 'supervisor'` (linha 58) antes de responder. Mesmo assim, o header de CORS libera **qualquer origem**.
  - **Impacto:** o `Access-Control-Allow-Origin: *` não permite, por si só, forjar o JWT de um supervisor — a exigência de Bearer token continua de pé. O risco real é: (a) se o JWT de um supervisor vazar por qualquer outro vetor (ex. XSS + `localStorage`, item 4), um site malicioso em outra origem pode usar esse token via `fetch` cross-origin sem que o navegador bloqueie a resposta por causa do CORS aberto — isto é, o CORS `*` remove uma camada de defesa em profundidade que existiria de graça; (b) é inconsistente com a CSP do próprio projeto (`vercel.json`/`netlify.toml`), que restringe `connect-src` a `'self'`/Supabase — o wildcard no back-end contraria a intenção de origem única que a CSP tenta impor no front-end.
  - **Severidade:** Média (exploração depende de um vazamento de token prévio, mas o item do checklist pede exatamente esse padrão "CORS permissivo em rota privada", e ele está presente de forma inequívoca).
  - **Correção:**
    ```ts
    // Antes
    const CORS_HEADERS = {
      "Access-Control-Allow-Origin": "*",
      ...
    };

    // Depois — restringir às origens reais dos dois deploys (Porto Terapia / Grupo IB)
    const ALLOWED_ORIGINS = new Set([
      "https://app.portoterapia.com.br",
      "https://grupoib.faca-amigos.com.br", // ajustar para os domínios reais de produção
    ]);
    function corsHeaders(req: Request) {
      const origin = req.headers.get("Origin") ?? "";
      return {
        "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "",
        "Vary": "Origin",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-retry-count",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      };
    }
    ```
- As outras 3 Edge Functions (`sync-grupoib-professional`, `therapist-directory`, `intern-course-stats`) não expõem headers de CORS — coerente, pois são chamadas servidor-a-servidor (Database Webhooks) e não pelo navegador, então não é uma falha equivalente.

---

## 17. Webhooks sem validação HMAC

**[INSUFICIENTE/AUSENTE]**

Nenhuma das 3 Edge Functions que recebem webhook usa HMAC (assinatura calculada sobre o corpo da requisição); todas usam **segredo compartilhado fixo em header**, o que é mais fraco que HMAC porque não amarra a assinatura ao conteúdo do payload (não protege contra replay nem detecta payload adulterado em trânsito por um proxy comprometido, por exemplo):

- `sync-grupoib-professional/index.ts:154-158`: **comparação em tempo constante** (`timingSafeEqual`, implementada nas linhas 31-46) — este é o melhor dos três, mas ainda é segredo simples, não HMAC do corpo.
- `therapist-directory/index.ts:87`: `if (req.headers.get("X-Webhook-Secret") !== WEBHOOK_SECRET)` — comparação com `!==`, vulnerável a timing attack (vaza por tempo de execução quantos caracteres iniciais coincidem).
- `intern-course-stats/index.ts:40`: mesmo padrão `!==`.
- Nenhuma das três valida um `nonce`/timestamp para impedir replay de uma requisição capturada.

**Severidade:** Baixa-Média (o segredo em si, se não vazado, já bloqueia a maioria dos atacantes; o ganho de HMAC+timestamp é defesa em profundidade contra replay/timing e contra o cenário em que o segredo vaza mas o atacante não consegue montar o payload esperado sem reverse-engineer).

**Correção (aplicar em `therapist-directory` e `intern-course-stats`, replicando o padrão já usado em `sync-grupoib-professional`):**
```ts
// Antes (therapist-directory/index.ts:87 e intern-course-stats/index.ts:40)
if (req.headers.get("X-Webhook-Secret") !== WEBHOOK_SECRET) {
  return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
}

// Depois
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const bufA = enc.encode(a), bufB = enc.encode(b);
  if (bufA.length !== bufB.length) {
    let dummy = 0;
    for (let i = 0; i < Math.max(bufA.length, bufB.length); i++) dummy |= (bufA[i] ?? 0) ^ (bufB[i] ?? 0);
    return false;
  }
  let diff = 0;
  for (let i = 0; i < bufA.length; i++) diff |= bufA[i] ^ bufB[i];
  return diff === 0;
}
if (!timingSafeEqual(req.headers.get("X-Webhook-Secret") ?? "", WEBHOOK_SECRET)) {
  return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
}
```
Para o ganho completo de HMAC (assinatura do corpo, não só um segredo em header), migrar os três para `HMAC-SHA256(body, secret)` enviado em `X-Webhook-Signature`, no padrão dos Database Webhooks nativos do Supabase (que já suportam isso via configuração).

---

## 18. Upload de arquivos sem validação (magic bytes, MIME, tamanho, path traversal)

**[VULNERÁVEL]** (nos uploads administrativos) / **[CONFORME]** (no autocadastro público)

- **Sem path traversal em nenhum fluxo:** todo upload vira uma coluna `content` (base64) numa linha de tabela Postgres — não há escrita em filesystem/Storage por caminho derivado de input do usuário, então path traversal clássico não se aplica a este design.
- **Validação insuficiente — Localização:**
  - `src/components/PayrollUploadModal.jsx:37-47`:
    ```js
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Por favor, selecione um arquivo no formato PDF.');
      setFile(null);
      return;
    }
    if (selectedFile.size > 20 * 1024 * 1024) { ... }
    ```
  - `src/components/NfseUploadModal.jsx:66-76`: mesmo padrão, limite de 5MB.
  - **Impacto:** `selectedFile.type` vem do `Content-Type` que o próprio navegador infere (ou nem isso, se manipulado via DevTools/Burp antes do envio), e a extensão `.pdf` é só uma checagem de nome de string — nenhuma das duas inspeciona os bytes reais do arquivo (magic number `%PDF-`). Um atacante autenticado com uma dessas contas (ex. o quiosque de estagiário do item 2, ou uma conta interna comum) pode renomear qualquer arquivo (executável, HTML com script, etc.) para `.pdf` e ele passa direto. Como o dado grava direto na tabela (`unit_payroll_documents`/`professional_documents`) sem nenhuma RPC de validação — diferente do autocadastro, ver abaixo — **não há nenhuma barreira de servidor** para esses dois formulários.
  - **Severidade:** Média (o arquivo fica armazenado como blob, não é executado pelo servidor; o risco principal é armazenamento de malware para download posterior por outro funcionário/contador que abra o "PDF", e poluição/corrupção do dossiê financeiro).
- **Contraste — fluxo que faz certo:** os RPCs de anexo de documento no autocadastro validam no banco, não confiando no que o cliente diz:
  - `supabase/migrations/20260910185600_fix_token_hash_bytea_text_comparison.sql:14-19` (`attach_employee_self_registration_document`): whitelist fechada de `doc_key`, limite de tamanho em bytes (`length(p_content) > 2800000`), token de upload com hash SHA-256, expiração e limite de 12 uploads por token. Isso é o padrão que falta nos dois modais acima.
- **Correção para `PayrollUploadModal`/`NfseUploadModal`:**
  - **Antes:** validação só de `file.type`/nome no navegador, `upsert` direto na tabela sem RPC.
  - **Depois:** (1) checar magic bytes no cliente antes de gerar o base64, como primeira barreira de UX:
    ```js
    const buffer = await selectedFile.slice(0, 5).arrayBuffer();
    const header = new TextDecoder().decode(buffer);
    if (header !== '%PDF-') {
      setError('O arquivo selecionado não é um PDF válido.');
      setFile(null);
      return;
    }
    ```
    (2) e, principalmente, mover a gravação de `supabase.from('unit_payroll_documents').upsert(...)`/`professional_documents` direto do cliente para uma função `SECURITY DEFINER` que repita essa checagem de magic bytes (`substring(decode(p_content,'base64') from 1 for 5) = '\x255044462d'::bytea`) e o limite de tamanho no servidor, no mesmo molde de `attach_employee_self_registration_document` — hoje esses dois modais são os únicos fluxos de upload do sistema que gravam direto na tabela sem passar por uma RPC de validação.

---

## 19. Stack traces/erros internos expostos em produção

**[VULNERÁVEL]**

- **Front-end — Localização:** `src/utils/mappings.js:58-76`:
  ```js
  export const getFriendlyDbErrorMessage = (err) => {
    const rawMessage = String(err?.message || err || '');
    const isDuplicateKey = ...
    if (isDuplicateKey) { ... mensagens amigáveis ... }
    return rawMessage; // <- fallback: mensagem crua do Postgres/PostgREST vai direto pro toast do usuário
  };
  ```
  Fora do caso de `duplicate key`, qualquer outro erro (violação de `CHECK`, erro de RLS, erro de sintaxe de RPC, etc.) devolve a mensagem interna do Postgres/PostgREST direto na tela via `toast.error(...)`/`setError(...)`, potencialmente revelando nomes de tabela, coluna, constraint ou trecho de função para o usuário final.
- **Edge Functions — Localização:** todas as 4 funções fazem o mesmo padrão no `catch`:
  - `sync-grupoib-professional/index.ts:254-256`, `fetch-talent-bank/index.ts:86-91`, `therapist-directory/index.ts:132-134`, `intern-course-stats/index.ts:66-68`:
    ```ts
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
    }
    ```
    `String(err)` em um objeto `Error` normalmente produz `"Error: <mensagem>"` (não o stack completo, que ficaria em `err.stack`), mas ainda assim propaga mensagens internas (ex. erro do Postgres via `admin.from(...)`, erro de rede para APIs de terceiros) para quem chamou a função — inclusive, no caso de `sync-grupoib-professional`, para o Database Webhook interno, mas o *response* dessa função não é tipicamente visto por um atacante externo a menos que ele já tenha o segredo do webhook (o que já seria um comprometimento maior).
- **Severidade:** Baixa-Média (não é RCE nem vazamento de segredo diretamente, mas ajuda reconhecimento de schema/stack para um atacante que já tenha alguma forma de acesso, e viola o princípio de não expor detalhe interno a usuário final).
- **Correção:**
  ```js
  // Antes
  return rawMessage;

  // Depois
  console.error('[DB error]', err); // log interno, nunca visível ao usuário
  return 'Ocorreu um erro ao processar sua solicitação. Tente novamente ou contate o suporte.';
  ```
  ```ts
  // Antes (edge functions)
  return new Response(JSON.stringify({ error: String(err) }), { status: 500 });

  // Depois
  console.error(err); // fica só no log da função (Supabase Studio → Logs), não na resposta
  return new Response(JSON.stringify({ error: "internal_error" }), { status: 500 });
  ```

---

## 20. Dependências desatualizadas com CVEs

**[VULNERÁVEL]**

`npm audit --production` (executado neste ambiente contra `package-lock.json`) reporta **5 vulnerabilidades (2 baixas, 1 moderada, 2 altas)**:

| Pacote | Severidade | Advisory | Via |
|---|---|---|---|
| `node-fetch` (<2.6.7) | **Alta** (CVSS 8.8) | [GHSA-r683-j2x4-v87g](https://github.com/advisories/GHSA-r683-j2x4-v87g) — encaminha headers sensíveis (ex. `Authorization`) para sites não confiáveis em redirect | dependência transitiva de `@tensorflow/tfjs-core` → `face-api.js` (dependência direta, `package.json:21`) |
| `node-fetch` | Baixa | [GHSA-w7rc-rwvf-8q5r](https://github.com/advisories/GHSA-w7rc-rwvf-8q5r) — opção `size` ignorada após redirect | idem |
| `@tensorflow/tfjs-core` | Baixa | herda de `node-fetch` | idem |
| `face-api.js` | Baixa | herda da cadeia acima | dependência direta usada para biometria facial (`src/utils/faceBiometrics.js`, `src/components/BiometricEnrollment.jsx`) |
| `esbuild` (≤0.24.2) | Moderada (CVSS 5.3) | [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) — qualquer site pode enviar requisições ao dev server do esbuild e ler a resposta | dependência transitiva de `vite` (`package.json:35`), só afeta `npm run dev`, não o build de produção |

**Impacto real:**
- `esbuild`/`vite`: só afeta a máquina de quem roda `npm run dev` localmente (não é exposto no bundle publicado) — risco baixo em produção, mas ainda vale corrigir no ambiente de desenvolvimento.
- `node-fetch`/`face-api.js`/`tensorflow`: o `node-fetch` vulnerável é usado internamente pelo TensorFlow.js só durante o carregamento de modelos (`public/models/*`), que hoje são todos servidos do próprio domínio (`'self'` na CSP) — o vetor de exploração (redirect para site malicioso vazando headers) exigiria que a própria aplicação seguisse redirects para uma URL não controlada, o que não é o padrão de uso atual. Ainda assim, é uma cadeia de dependência com CVE alta conhecida e sem correção não-breaking disponível.

**Severidade consolidada:** Média (Alta na CVE isolada do `node-fetch`, mas mitigada pelo padrão de uso atual do `face-api.js` no projeto; ainda assim, uma dependência com CVE de severidade Alta não corrigida é uma falha do processo de gestão de dependências, não só do código).

**Correção:**
- Curto prazo, sem quebra: fixar uma versão de `node-fetch` >=2.6.7 via `overrides` no `package.json` (não requer trocar `face-api.js`):
  ```json
  {
    "overrides": {
      "node-fetch": "^2.6.7"
    }
  }
  ```
- Médio prazo: `npm audit fix --force` migra para `face-api.js@0.20.0`/`vite@8` — mudanças com breaking change (major bump), exigem teste manual do fluxo de biometria facial e do build antes de aplicar em produção. Recomenda-se rodar `npm audit` no CI (`npm audit --omit=dev --audit-level=high`) para não deixar essa checagem depender de execução manual.

---

## Anexo — evidências brutas usadas nesta auditoria

- `git log --all --full-history -- .env` → vazio (sem commits).
- `git log --all -S "<valor do segredo — ver commit 692455c>"` → commits `692455c` (introduz) e `4e347c7` (remove/corrige).
- `grep -c "ENABLE ROW LEVEL SECURITY" supabase_schema.sql` → 26; `grep -c "^CREATE TABLE" supabase_schema.sql` → 27 (a tabela sem RLS é `public.workspaces`).
- `npm audit --production` → 5 vulnerabilidades (detalhe na seção 20).
