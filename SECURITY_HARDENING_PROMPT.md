# Prompt — Blindagem de Segurança do Sistema "Gestão de Pessoas"

> Copie tudo abaixo desta linha e cole como instrução para o agente/dev que vai executar a blindagem.
> O prompt foi escrito a partir de uma auditoria real deste repositório (commit da branch `claude/security-hardening-checklist-k5fi30`). As referências `arquivo:linha` apontam para código existente, não para hipóteses.

---

## Papel

Você é um engenheiro de segurança de aplicações (AppSec) sênior, com experiência prática em React/Vite, Supabase (Postgres + RLS + GoTrue + Edge Functions em Deno), PWA e deploy em Netlify/Vercel. Você também conhece a LGPD (Lei 13.709/2018), em especial o tratamento de **dados sensíveis** (biometria facial, art. 5º, II) e dados financeiros/bancários de pessoas físicas.

Seu trabalho é **blindar** este sistema contra invasão, vazamento de dados, escalação de privilégio, força bruta, abuso de API e exposição de segredos, **sem alterar nenhuma funcionalidade visível ao usuário final**.

## Contexto do sistema

- Sistema de ponto e RH para clínicas (Porto Terapia e Grupo IB): estagiários, profissionais PJ e funcionários CLT.
- Front-end: React 18 + Vite 5 + Tailwind, PWA via `vite-plugin-pwa`, reconhecimento facial no navegador com `face-api.js`.
- Back-end: Supabase (um único projeto compartilhado pelos dois workspaces). Toda autorização é feita por **RLS + funções `SECURITY DEFINER`** em `supabase_schema.sql`. Uma Edge Function (`supabase/functions/sync-grupoib-professional/index.ts`) sincroniza cadastros para outro sistema usando a `service_role`.
- Deploy: Netlify (`netlify.toml`) ou Vercel (`vercel.json`). Não há servidor próprio: o navegador fala direto com a API do Supabase usando a `anon key`.
- Dados armazenados: CPF, RG, endereço, dados bancários, chave PIX, salários/bolsas, dependentes, descritores faciais (`face_descriptor`), fotos, ocorrências disciplinares, saúde ocupacional, documentos anexados em base64.
- Papéis: `supervisor` (admin), `intern_unit`, `professional_unit`, `employee_unit` (contas compartilhadas dos tablets de quiosque). O papel e a unidade ficam em `auth.users.raw_user_meta_data` e são lidos pelo RLS via `auth.jwt() -> 'user_metadata'`.

## Regras invioláveis

1. **Zero mudança funcional.** Todo fluxo que funciona hoje (login admin, login de quiosque, autocadastro, registro de ponto com GPS/biometria, emissão de documentos, folha, exportações) tem que continuar funcionando exatamente igual do ponto de vista do usuário. Mudança de *mecanismo* interno é permitida; mudança de *comportamento observável* não.
2. Quando uma correção de segurança **necessariamente** muda um comportamento (ex.: item C-1 abaixo), você **não decide sozinho**: implementa a alternativa mais próxima do comportamento atual, deixa a antiga desligável por configuração, e documenta a decisão pendente no relatório final.
3. Nunca apague dados, tabelas, colunas ou usuários. Migrações são sempre aditivas ou de permissão (`REVOKE`/`GRANT`/`CREATE POLICY`).
4. Nunca coloque um segredo novo em arquivo versionado. Segredos vão para variáveis de ambiente (Netlify/Vercel) ou para os *secrets* da Edge Function (`supabase secrets set`).
5. Cada correção vem com uma forma de **provar** que funcionou (query, comando, teste ou passo manual reproduzível). Nada de "corrigido" sem evidência.
6. Se algo não puder ser verificado a partir do repositório (configurações do painel do Supabase, DNS, WAF), liste como **"verificar no painel"** com o caminho exato e o valor esperado; não presuma que está certo.

## Achados confirmados na auditoria (ordem de prioridade)

Trate cada item como uma tarefa. Corrija na ordem. Não pule os críticos para fazer os fáceis primeiro.

### CRÍTICO

**C-1. Cadeia completa: qualquer pessoa na internet vira administrador do banco.**
- Passo 1: a senha das contas de quiosque está em texto puro no bundle do front-end: `'estagio123'` em `src/App.jsx:1142`, `1178` e `1209`. Os e-mails dessas contas estão em `src/config/branding.js` (linhas 92, 104, 223 a 257). Qualquer um que abra o DevTools consegue `signInWithPassword` com essas credenciais.
- Passo 2: o RLS confia em `auth.jwt() -> 'user_metadata' ->> 'role'` (dezenas de ocorrências em `supabase_schema.sql`, ex.: linhas 577, 681, 771, 1025, 1049). No Supabase, **`user_metadata` é editável pelo próprio usuário autenticado** via `supabase.auth.updateUser({ data: { role: 'supervisor', workspace_scope: ['all'] } })`. Não existe trigger em `auth.users` impedindo isso (verificado: nenhum `CREATE TRIGGER ... ON auth.users` no schema).
- Resultado: logado como quiosque com a senha pública, o atacante se promove a `supervisor` com escopo `all` e lê/edita CPF, dados bancários, salários e descritores faciais de todas as unidades dos dois workspaces.
- Correção obrigatória:
  1. Migrar **toda** a autorização de `user_metadata` para `app_metadata` (`auth.jwt() -> 'app_metadata'`), que só a `service_role` consegue alterar. Isso inclui `role`, `unit_id`, `workspace_scope` e `must_change_password`. Atualizar as funções `jwt_is_supervisor_for_unit`, `jwt_has_workspace_access`, `jwt_is_employee_kiosk_for_unit`, todas as policies e todas as funções `SECURITY DEFINER` que leem `caller_role`/`caller_unit`. Escrever uma migração que copie os valores atuais de `raw_user_meta_data` para `raw_app_meta_data` para todos os usuários existentes, sem apagar o original (para rollback).
  2. Como defesa em profundidade, criar um trigger `BEFORE UPDATE ON auth.users` que rejeite alteração das chaves `role`, `unit_id` e `workspace_scope` em `raw_user_meta_data` quando o executor não for `service_role`/`postgres`.
  3. Remover a senha fixa do front-end. Alternativa que preserva a experiência do tablet: senha por unidade lida de variável de ambiente de build (`VITE_KIOSK_PASSWORD_<UNIT>`) **não** resolve (continua no bundle). Opções reais, em ordem de preferência: (a) trocar o login do quiosque por um **link de dispositivo** (token longo gerado pelo supervisor, guardado no `localStorage` do tablet, trocado por sessão via função `SECURITY DEFINER` que verifica hash + validade + unidade); (b) manter e-mail/senha mas com senha forte por unidade que o supervisor digita uma única vez no tablet e o `persistSession` mantém. Em ambas, o botão "entrar como quiosque" continua existindo e a tela do quiosque não muda. Implemente (a) ou (b), mantenha o fluxo antigo atrás de uma flag `VITE_ALLOW_LEGACY_KIOSK_LOGIN=false`, e **troque a senha `estagio123` de todas as contas de quiosque em produção** assim que o novo fluxo estiver no ar.
- Prova: com um JWT de quiosque, executar `updateUser` alterando `role` e depois tentar `select * from interns` de outra unidade. Deve retornar zero linhas. Testar também `PATCH /auth/v1/user` direto por `curl`.

**C-2. Segredo de webhook hardcoded e versionado.**
- `supabase/functions/sync-grupoib-professional/index.ts`: `WEBHOOK_SECRET = "d6b458cfe..."` está no código e no histórico do git (commit `692455c`). Quem tem o repositório dispara a função que cria usuários com `service_role` no sistema CLINICA.
- Correção: ler de `Deno.env.get("SYNC_WEBHOOK_SECRET")`, falhar com 500 se ausente, **rotacionar o segredo** (gerar novo, atualizar o Database Webhook no painel do Supabase e o secret da função). Comparar com `crypto.subtle.timingSafeEqual` ou equivalente, não com `!==`.
- Prova: `grep -rn "d6b458" .` retorna vazio; chamada com o segredo antigo retorna 401.

**C-3. Senhas iniciais previsíveis criadas com `service_role`.**
- Mesma função, `buildInitialPassword`: senha = `primeiro.ultimo123`. Nome completo é dado público dentro da clínica. Qualquer colega adivinha a senha inicial de qualquer profissional sincronizado.
- Correção: gerar senha aleatória forte (`crypto.getRandomValues`, 16+ chars) e não devolvê-la; enviar convite por `admin.inviteUserByEmail` ou `admin.generateLink({ type: 'recovery' })`. `must_change_password: true` deve ser efetivamente exigido no sistema destino (confirme; se não for, é apenas um campo decorativo).
- Também: `admin.auth.admin.listUsers()` sem paginação lista todos os usuários do projeto a cada colisão de e-mail. Trocar por `getUserByEmail`/`listUsers({ page, perPage })` filtrando pelo e-mail.

**C-4. Senhas de admin e seeds em texto puro no schema versionado.**
- `supabase_schema.sql:193, 252, 311, 370`: `crypt('admin321', ...)` para contas de supervisores nomeados; linhas 124, 435, 494, 1324: `'estagio123'` e `'TROQUE_ESTA_SENHA_...'`. E-mails reais de pessoas (`bruno@`, `guimelly@`, `isabella@`, `ian@portoterapia.com`) idem.
- Correção: remover blocos de `INSERT INTO auth.users` do schema (mover para um `seed.local.sql` ignorado pelo git, com senhas lidas de `\set` do psql). **Confirmar no painel que nenhuma conta ativa ainda usa `admin321` ou `estagio123`** e forçar reset das que usarem. Esta parte não é código: é uma ação operacional que precisa constar do relatório com data.

### ALTO

**A-1. Funções `SECURITY DEFINER` expostas ao papel `anon`.**
- `create_intern_user` (`supabase_schema.sql:1229`), `create_professional_self_registration` (`2646`), `create_employee_self_registration` (`2981`), `attach_*_self_registration_document` (`2693`, `3034`) têm `GRANT EXECUTE ... TO anon`. Um bot sem sessão pode inserir milhares de cadastros "pendentes" com fotos base64 de até 2 MB, esgotando o banco (DoS por custo) e poluindo a fila de validação.
- Correção sem mudar funcionalidade: (1) as telas de autocadastro são abertas **a partir do quiosque logado** (`KIOSK_ROLE_SCOPE` em `src/config/permissions.js`); confirme se de fato existe um caminho `anon` real. Se não existir, `REVOKE ... FROM anon`. (2) Se existir, adicionar *rate limit* no banco: tabela `rpc_rate_limits(key, window_start, count)` consultada dentro dessas funções por IP (`current_setting('request.headers')::json->>'x-forwarded-for'`) e por unidade, com limite conservador (ex.: 10 cadastros/hora/unidade). (3) Limitar o tamanho de `p_photo`/`p_documents` no banco com `CHECK (octet_length(...) < N)`, não só no front.
- Prova: script que chama a RPC 50 vezes em 1 minuto com a `anon key` recebe erro a partir do limite.

**A-2. Source maps de produção publicados.**
- `vite.config.js:63`: `sourcemap: true`. O código-fonte inteiro (com comentários sobre regras de RLS, nomes de tabelas e lógica de negócio) fica público em `dist/assets/*.map`.
- Correção: `sourcemap: mode !== 'production'` ou `sourcemap: 'hidden'` com upload para ferramenta de erro. Se hoje alguém depende do `.map` em produção para depurar tela branca, `'hidden'` mantém isso sem servir o arquivo.

**A-3. Chave de terceiro exposta ao navegador por prefixo `VITE_`.**
- `.env.example`: `VITE_GEMINI_API_KEY`. Qualquer variável com prefixo `VITE_` vai para o bundle. Hoje o front não usa Gemini (`grep -rn gemini src` vazio), então a variável é resíduo perigoso: se alguém preencher, a chave vaza.
- Correção: remover do `.env.example` e do front; Gemini só na Edge Function via `Deno.env`.

**A-4. Credenciais de projeto em script solto.**
- `test_connection_esm.js` tem URL do projeto e `sb_publishable_...` hardcoded. A chave anon é pública por desenho, mas isso fixa o `project ref` no repositório e cria hábito de colar chave no código. O histórico do git ainda carrega uma chave anon JWT de um projeto anterior (`ref mwsstrbanpgppapscrwk`).
- Correção: apagar o script ou lê-lo de `.env`; adicionar `gitleaks`/`trufflehog` como hook de pré-commit e etapa de CI (`.github/workflows/security.yml`) para bloquear novos segredos. Avaliar reescrever o histórico só se o repositório for público; se for privado, rotacionar e seguir em frente.

**A-5. Ausência total de cabeçalhos de segurança HTTP.**
- `netlify.toml` e `vercel.json` só configuram `Cache-Control`. Faltam: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Correção: adicionar aos dois arquivos. CSP mínima compatível com o app: `default-src 'self'; connect-src 'self' https://<project-ref>.supabase.co wss://<project-ref>.supabase.co; img-src 'self' data: blob:; media-src 'self' blob:; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; worker-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`. Atenção: `face-api.js` usa WebAssembly/TF.js (precisa de `'wasm-unsafe-eval'`), o `index.html` tem `<script>` inline (linha 8) que precisa virar arquivo ou receber `nonce`/`hash`, e o app usa `blob:` para a câmera. `Permissions-Policy: camera=(self), geolocation=(self), microphone=()`. Teste em ambiente de preview antes de produção: CSP quebrada = tela branca, o que violaria a regra 1.
- Prova: `curl -I https://<site>/` mostra os cabeçalhos; observatório da Mozilla ou `securityheaders.com` com nota A.

**A-6. Biometria e dados bancários trafegam e ficam legíveis para todo papel de quiosque.**
- `get_employee_kiosk_roster` (`supabase_schema.sql:2206`) devolve `face_descriptor` de todos os funcionários da unidade para o tablet. Policies de `interns` liberam ao `intern_unit` a linha inteira (CPF, banco, PIX). O tablet compartilhado é o dispositivo menos confiável do sistema.
- Correção sem mudar funcionalidade: (1) criar *views* ou RPCs "enxutas" para o quiosque que exponham só `id, name, photo, face_descriptor, last_type` e restringir as policies de `SELECT` dos papéis `*_unit` a essas views (usar `security_invoker = true`); (2) para colunas de dados bancários/CPF em `interns`, `employees`, `professionals`, usar policy por coluna via RPC de leitura para supervisores, ou ao menos `REVOKE SELECT (cpf, bank_account, pix_key, ...) ON ... FROM authenticated` + `GRANT` seletivo. Confirme que o front do quiosque não usa nenhuma das colunas retiradas; se usar, mantenha só aquela.
- LGPD: registrar no relatório onde está o consentimento biométrico (`biometric_consent_at`, `biometric_consent_version`) e propor política de retenção (apagar `face_descriptor` no encerramento do contrato). Não implemente a exclusão automática sem aprovação; apenas deixe a função pronta e desligada.

**A-7. Proteção contra força bruta depende só do padrão do Supabase.**
- O login de admin (`src/App.jsx:1106`) e o de quiosque não têm nenhuma proteção própria. O PIN de profissional PJ tem bloqueio (5 erros, 15 min: `supabase_schema.sql:1541`), o que é bom, mas o login por e-mail/senha não.
- Correção: (1) **verificar no painel** Authentication → Rate Limits e Attack Protection (habilitar hCaptcha/Turnstile no `signInWithPassword` do admin; o quiosque não pode ter captcha sem mudar a experiência, então depende de C-1); (2) tabela `auth_login_attempts` alimentada por trigger em `auth.audit_log_entries`, com alerta quando um e-mail passar de N falhas/hora; (3) no front, desabilitar o botão por 2 s após falha e não diferenciar "e-mail inexistente" de "senha errada" (hoje a mensagem `'Senha incorreta.'` já é genérica; manter).
- Prova: 20 tentativas erradas seguidas resultam em `429` ou bloqueio temporário.

### MÉDIO

**M-1. HTML gerado a partir de dados do usuário.**
- `dangerouslySetInnerHTML` em `src/App.jsx:5864` e `src/components/tabs/DocumentosProfissionaisTab.jsx:502`; `document.write` em 6 pontos (`DocumentosTab.jsx:134,163`, `FinanceiroTab.jsx:258`, `AniversariantesTab.jsx:200`, `App.jsx:5693`, `utils/documentPrint.js:8`). Existe `escapeHtmlForDocument` e `sanitizeInternForDocumentHtml` (`App.jsx:5055`), mas a cobertura é por lista de campos, não por padrão.
- Correção: adotar `DOMPurify` na saída de **todo** HTML gerado (contratos, declarações, folha, aniversariantes) antes de `innerHTML`/`document.write`, com `ALLOWED_TAGS` compatível com os templates atuais. Adicionar testes em `src/utils/__tests__` com payloads `<img onerror>` e `<script>` para cada gerador. Um estagiário que se autocadastra com nome contendo HTML não pode executar código na sessão do supervisor.

**M-2. `window.open('', '_blank')` sem `noopener` e HTML montado por concatenação.**
- Sete ocorrências. Como é a própria origem, o risco de *tabnabbing* é baixo, mas o padrão é frágil. Padronizar em `utils/documentPrint.js` com `noopener,noreferrer` e passar pelo DOMPurify de M-1.

**M-3. Dados sensíveis em `localStorage`.**
- Registros de ponto offline (`src/App.jsx:1953`, inclui `geo`, nome, possivelmente foto) e configurações de unidade ficam em `localStorage` do tablet compartilhado sem expiração. A sessão do Supabase (`persistSession: true`) também.
- Correção: (1) limitar registros offline a N dias e limpá-los após sincronização (já há `removeItem` na linha 734, confirme que cobre falha parcial); (2) não guardar foto no registro offline, só o hash/descritor; (3) avaliar `storage: sessionStorage` para a sessão do **admin** (não do quiosque), configurável em `src/supabase.js`.

**M-4. Overlay de erro em produção expõe caminhos e mensagens.**
- `index.html:8-32`: qualquer `window.onerror` imprime mensagem, arquivo e linha na tela. Útil em dev, vazamento de informação em prod.
- Correção: mostrar só "Ocorreu um erro, recarregue" em produção e enviar o detalhe para `console.error` ou serviço de erro. Manter o comportamento atual quando `import.meta.env.DEV`.

**M-5. Dependências vulneráveis.**
- `npm audit --omit=dev`: 4 high, 2 moderate, 2 low. `face-api.js@0.22.2` arrasta `@tensorflow/tfjs-core` antigo e `node-fetch`; `browserslist`/`baseline-browser-mapping` têm advisories.
- Correção: `npm audit fix` para o que não for major; para `face-api.js`, avaliar `@vladmandic/face-api` (mantido, mesmos modelos, API compatível) **somente se** os descritores gerados forem idênticos, senão toda a biometria cadastrada quebra e viola a regra 1. Fazer o teste com 5 descritores existentes antes de trocar. Adicionar `npm audit --audit-level=high` no CI e Dependabot/Renovate.

**M-6. Edge Function sem validação de payload e sem restrição de origem.**
- `index.ts` aceita qualquer JSON e confia em `record` inteiro. Adicionar validação de forma (`table ∈ {professionals, employees}`, `record.id` uuid, `unit_id` string), e limitar o método a `POST`. Logar `err` inteiro em `console.error(err)` pode gravar CPF/e-mail nos logs da função; logar só código e id.

**M-7. Lista de tentativas de PIN sem limite global.**
- O bloqueio de PIN é por profissional. Um atacante pode testar 4 PINs em cada um dos N profissionais da unidade sem nunca ser bloqueado. Adicionar contador por sessão/quiosque (`created_by`) com limite de 20 falhas/hora.

### BAIXO / HIGIENE

- `B-1` `.gitignore` não cobre `supabase/.temp/` nem `*.png` de captura de tela na raiz (`Captura de tela 2026-08-30 150336.png` está versionada; confirme que não mostra dados reais).
- `B-2` `index.html`: `user-scalable=no` não é segurança, mas remova se não houver motivo (acessibilidade).
- `B-3` Padronizar `SET search_path = public, pg_temp` em todas as `SECURITY DEFINER` (a auditoria não encontrou nenhuma sem `search_path`, mas confirme com o Security Advisor do Supabase, que também acusa `search_path` mutável em funções criadas fora deste arquivo).
- `B-4` Adicionar `SECURITY.md` com canal de reporte e política de rotação de chaves (anon key, service_role, webhook, senhas de quiosque) a cada 6 meses ou a cada desligamento de admin.
- `B-5` Habilitar `pg_audit` ou ao menos ampliar `system_user_audit` para registrar leituras em massa (exportações) por supervisor.

## Itens para verificar no painel do Supabase (não visíveis no repositório)

| Onde | Valor esperado |
|---|---|
| Authentication → Providers → Email | *Confirm email* ligado para novos admins; *Secure email change* ligado |
| Authentication → Rate Limits | Sign-in/sign-up ≤ 30/h por IP; token refresh padrão |
| Authentication → Attack Protection | Captcha ligado; *Leaked password protection* (HaveIBeenPwned) ligado |
| Authentication → Sessions | *Time-box user sessions* (ex.: 12 h para admin); *Inactivity timeout* |
| Authentication → URL Configuration | *Site URL* e *Redirect URLs* só com os domínios reais (sem `*`) |
| Database → Extensions | Remover extensões não usadas |
| Database → Webhooks | Webhook de sync com o **novo** segredo de C-2 |
| Project Settings → API | Confirmar que a `service_role` nunca foi usada em cliente; rotacionar se houver dúvida |
| Project Settings → Database | *Restrict database access* por IP se houver acesso direto; SSL enforced |
| Storage | Se houver buckets, nenhum público; policies por papel |
| Advisors → Security | Zero alertas de "RLS disabled" ou "function search_path mutable" |
| Backups | PITR ligado (dados de RH exigem recuperação pontual) |
| Logs | Reter ≥ 30 dias; alerta para `auth` com muitos 400/429 |

Use `get_advisors` / Security Advisor do próprio Supabase e cole o resultado no relatório.

## Ordem de execução

1. C-1 (RLS para `app_metadata` + trigger) — é a única correção que fecha o buraco mesmo que tudo o mais falhe.
2. C-2, C-3, C-4 — segredos e senhas. Rotacionar tudo em produção no mesmo dia.
3. A-5 — cabeçalhos. Testar em preview.
4. A-1, A-6, A-7, M-7 — superfície de API e força bruta.
5. A-2, A-3, A-4, M-4 — exposição de informação.
6. M-1, M-2, M-3, M-5, M-6 — front-end e dependências.
7. B-* e painel.

## Formato do relatório final

Para cada item acima, uma linha em tabela: `ID | Status (feito / feito com decisão pendente / não feito + motivo) | Arquivos alterados | Como foi provado | Ação operacional pendente (rotação, painel)`.

Depois da tabela:
- Lista de decisões que exigem aprovação humana (mínimo: C-1 opção a/b, A-6 retenção de biometria, M-5 troca da lib de biometria).
- Comandos de rollback de cada migração SQL.
- Confirmação explícita de que os fluxos abaixo foram testados manualmente após as mudanças: login admin, login dos três quiosques, autocadastro de estagiário/PJ/CLT, registro de ponto com GPS + biometria, registro de presença com PIN, emissão de contrato/declaração, folha em PDF, exportação de planilha, modo offline do quiosque.

## O que NÃO fazer

- Não "melhorar" a UI, refatorar componentes, renomear tabelas ou trocar bibliotecas fora do que está listado.
- Não desligar RLS "temporariamente" para testar.
- Não usar `service_role` no front-end nem em variável `VITE_*`.
- Não fechar o item C-1 apenas trocando a senha `estagio123` por outra fixa no código. Isso não corrige nada.
- Não afirmar que algo está seguro por não ter encontrado exploração. Afirmar apenas o que foi testado.
