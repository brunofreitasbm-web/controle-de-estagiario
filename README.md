# Controle de Estagiário — Porto Terapia

Sistema de controle de **frequência e ponto de estagiários** com validação por **GPS**
(raio de 1 km de cada unidade), gestão de estagiários, cálculo de horas
(diário/semanal) e painel da supervisão. Duas unidades: **Antônio Barreto** e **Generalíssimo**.

- **PIN da supervisão:** `1234`
- **Regras trabalhistas:** Lei do Estágio nº 11.788/2008 (6h/dia • 30h/semana)

---

## 1. O que instalar antes (uma vez só)

1. **Node.js** — baixe a versão LTS em https://nodejs.org e instale (Avançar, Avançar).
   - Para conferir, abra o **Prompt de Comando** e digite: `node -v` (deve mostrar um número de versão).

## 2. Criar o banco de dados (Firebase) — gratuito

1. Acesse https://console.firebase.google.com e clique em **"Criar um projeto"** (dê o nome que quiser).
2. Menu esquerdo → **Criação (Build) → Authentication → Começar → aba "Sign-in method"**
   → ative **"Anônimo" (Anonymous)** → Salvar.
3. Menu esquerdo → **Criação (Build) → Firestore Database → "Criar banco de dados"**
   → escolha um local (ex.: `southamerica-east1`) → confirme.
4. **Regras de segurança:** ainda no Firestore, abra a aba **"Regras" (Rules)**,
   apague o conteúdo, cole o conteúdo do arquivo **`firestore.rules`** (está nesta pasta)
   e clique em **"Publicar" (Publish)**.
5. **Pegar a configuração:** clique na **engrenagem ⚙ → Configurações do projeto →**
   role até **"Seus apps" → ícone da Web `</>`** → registre um app (qualquer apelido)
   → copie o objeto `firebaseConfig` que aparece.
6. Abra o arquivo **`src/firebase.js`** desta pasta (com o Bloco de Notas ou VS Code)
   e cole os valores no lugar dos `SEU_...`. Salve.

## 3. Rodar no seu computador (para testar)

Abra o **Prompt de Comando** dentro desta pasta e rode:

```bash
npm install
npm run dev
```

Vai aparecer um endereço como `http://localhost:5173` — abra no navegador.
> Dica: aparece também um endereço "Network" (ex.: `http://192.168.0.10:5173`).
> Enquanto seu PC estiver ligado e na mesma rede Wi-Fi, os estagiários podem abrir
> esse endereço pelo celular para bater o ponto (o GPS só funciona assim ou publicado — passo 4).

## 4. Publicar no Netlify (para usar de qualquer celular)

> **Importante:** o GPS do navegador só funciona em endereços **`https://`** (seguros).
> O Netlify já entrega `https://` de graça. Escolha **um** dos dois modos:

### Modo A — Arrastar e soltar (mais simples, sem Git)

1. No seu computador, dentro desta pasta, rode: `npm run build` (gera a pasta **`dist`**).
2. Crie uma conta gratuita em https://app.netlify.com.
3. Vá em **"Add new site" → "Deploy manually"** e **arraste a pasta `dist`** para a área indicada.
4. Em segundos aparece um link `https://algum-nome.netlify.app`. Pronto — é esse link que você distribui.
   - Para trocar o nome: **Site configuration → Change site name**.
   - **Sempre que mudar algo**, rode `npm run build` de novo e arraste a nova pasta `dist`.

### Modo B — Conectar ao GitHub (atualiza sozinho a cada alteração)

1. Suba esta pasta para um repositório no GitHub.
2. No Netlify: **"Add new site" → "Import an existing project" → GitHub** e escolha o repositório.
3. O Netlify lê o arquivo **`netlify.toml`** já incluído (build `npm run build`, publicação `dist`) — só confirmar.

### ⚠️ Ajuste obrigatório do banco após publicar (Authorized domains)

Depois de ter o link do Netlify (ex.: `algum-nome.netlify.app`):

1. No **Console do Firebase → Authentication → Settings (Configurações) → aba "Authorized domains"**.
2. Clique em **"Add domain"** e adicione o seu domínio do Netlify (ex.: `algum-nome.netlify.app`).
3. Salve. Isso autoriza o login (anônimo) a funcionar a partir do endereço publicado.

> Os outros ajustes de banco (login Anônimo ligado + regras `firestore.rules` publicadas) já foram
> feitos no **passo 2**. Não é preciso criar índices no Firestore — o sistema não usa consultas que exijam índice.

## 5. Primeiro uso (supervisão)

1. Abra o sistema → clique no ícone de escudo (canto superior direito) → digite o PIN **`1234`**.
2. Em **"Unidades & Localização do GPS"**: estando **fisicamente em cada unidade**,
   toque em **"Calibrar com minha localização"** para fixar o ponto exato de cada uma.
   (Sem calibrar, ficam as coordenadas aproximadas — o raio de 1 km ajuda, mas calibrar é o ideal.)
3. Em **"Gestão de Estagiários"**: cadastre os estagiários (nome, curso, unidade padrão, etc.).
4. Pronto. Os estagiários já podem bater o ponto na tela inicial, escolhendo nome, unidade,
   Entrada/Saída — o GPS valida automaticamente.

---

## Recursos de IA (opcional)

Os botões "✨ Profissionalizar" e "✨ Analisar Frequências" usam o Google Gemini.
Para ativá-los, copie `.env.example` para `.env` e cole uma chave gratuita
(https://aistudio.google.com/app/apikey) em `VITE_GEMINI_API_KEY`. Sem isso, o resto
do sistema funciona normalmente.

## Arquivos do projeto

| Arquivo | Para que serve |
|---|---|
| `src/App.jsx` | Todo o sistema (telas e lógica) |
| `src/firebase.js` | **Onde você cola a configuração do Firebase** |
| `firestore.rules` | Regras de segurança do banco (colar no Firebase) |
| `netlify.toml` | Configuração de publicação no Netlify (modo GitHub) |
| `public/_redirects` | Faz o Netlify servir o app corretamente (página única) |
| `.env.example` | Modelo para a chave opcional de IA |

## Observações importantes

- **Dados na nuvem e compartilhados:** todos os aparelhos veem os mesmos estagiários e registros.
- **GPS por dispositivo:** cada estagiário bate o ponto no próprio celular; a localização é conferida
  contra a unidade escolhida (entrada e saída), dentro de 1 km.
- **Estagiários, não empregados:** o sistema segue a Lei 11.788/2008 (estágio), com alertas de
  6h/dia e 30h/semana — não é ponto CLT.
