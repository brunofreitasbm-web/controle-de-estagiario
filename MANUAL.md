# 📖 Manual do Usuário — Sistema de Controle de Estagiário (Porto Terapia)

Este manual foi feito para ajudar **você** a usar o sistema de controle de ponto e presença, mesmo que não tenha muita experiência com computadores ou celulares. O sistema é bem simples, intuitivo e foi desenhado para facilitar a rotina dos estagiários e da supervisão.

---

## 📌 Sumário
1. [Como funciona o sistema?](#-como-funciona-o-sistema)
2. [Guia do Estagiário (Como bater o ponto)](#-guia-do-estagiário-como-bater-o-ponto)
3. [Guia da Supervisão (Painel Administrativo)](#-guia-da-supervisão-painel-administrativo)
4. [Dúvidas Frequentes e Resolução de Problemas](#-dúvidas-frequentes-e-resolução-de-problemas)

---

## 🌐 Como funciona o sistema?

O sistema é uma página da web que você pode acessar pelo computador ou pelo celular. Ele registra quando os estagiários entram e saem do estágio. 

Para evitar marcações incorretas, o sistema tem duas regras principais:
1. **Confirmação de Localização (GPS):** O celular do estagiário verifica se ele está fisicamente na unidade selecionada (Antônio Barreto ou Generalíssimo). O ponto só é liberado se ele estiver a uma distância segura da clínica (raio de 100 metros).
2. **Foto de Confirmação:** O estagiário tira uma foto rápida na hora de bater o ponto para registrar que é ele mesmo quem está marcando.

---

## 🧑‍🎓 Guia do Estagiário (Como bater o ponto)

Siga os passos abaixo toda vez que chegar ou sair do seu estágio:

### Passo 1: Acessar o sistema
1. Abra o navegador do seu celular (como o Google Chrome ou Safari).
2. Acesse o link que a supervisão enviou para você (exemplo: `https://seu-sistema.netlify.app`).

### Passo 2: Fazer o login
1. Na tela inicial, digite seu **Nome de Usuário** (geralmente é no formato `nome.sobrenome`, ex: `joao.silva`) e sua **Senha** (caso seja o seu primeiro acesso, a supervisão lhe dará a senha padrão e o sistema pedirá para você criar uma nova senha pessoal).
2. Clique em **Entrar**.

### Passo 3: Escolher a Unidade e a Ação
1. Selecione em qual unidade você está trabalhando hoje:
   * **Unidade Antônio Barreto**
   * **Unidade Generalíssimo**
2. Escolha o que você está fazendo:
   * **Entrada:** Se você acabou de chegar para iniciar o turno.
   * **Saída:** Se você está indo embora.

### Passo 4: Autorizar a Localização (GPS)
1. O sistema vai pedir permissão para acessar a localização do seu celular.
2. **⚠️ Atenção:** Se aparecer uma mensagem perguntando se o site pode acessar sua localização, clique em **Permitir**, **Autorizar ou Sim**. Se você bloquear, não conseguirá bater o ponto.

### Passo 5: Tirar a Foto de Confirmação
1. A câmera do seu celular vai abrir dentro do sistema.
2. Olhe para a câmera e clique no botão **Tirar Foto** (ou toque na tela).
3. A imagem será salva temporariamente junto com o seu registro de ponto.

### Passo 6: Finalizar
1. Clique em **Confirmar Ponto**.
2. O sistema mostrará uma mensagem verde: `"Ponto registrado com sucesso!"`. Pronto! Seu horário está gravado na nuvem.

---

## 👩‍💼 Guia da Supervisão (Painel Administrativo)

Se você é o supervisor ou responsável pela clínica, você tem acesso a uma área restrita para cadastrar estagiários, ver relatórios e assinar documentos.

### Como entrar na Área Administrativa
1. No canto superior direito da tela inicial, procure por um ícone de **Escudo** 🛡️ ou botão **Administrativo**.
2. Digite o **PIN de Acesso** (o padrão é `1234`) ou faça login com o e-mail da supervisão (`supervisor@portoterapia.com` e a senha definida, ex: `admin123`).
3. Clique em **Acessar**.

---

### 1. Cadastro de Estagiários (Gestão de Alunos)
Nesta aba, você gerencia quem pode usar o sistema:
* **Para adicionar um novo estagiário:** Clique em **"Novo Estagiário"** ou **"Adicionar"**, preencha os dados (Nome, Curso, Faculdade, Turno e a Unidade padrão dele) e salve.
* **Documentos Admissionais:** Você pode marcar quais documentos o estagiário já entregou (como o Termo de Compromisso TCE, Apólice de Seguro, Comprovante de Matrícula).
* **Dados Bancários:** Guarde as informações de pagamento de bolsa-auxílio e chave PIX do estagiário para facilitar a folha de pagamento.

---

### 2. Histórico de Pontos e Frequência
Aqui você acompanha as horas trabalhadas:
* **Visualizar Registro:** Veja o dia, a hora exata, a foto tirada pelo estagiário e se ele bateu o ponto dentro do limite do GPS.
* **Gerar Relatórios de Horas:** O sistema calcula automaticamente se o estagiário está cumprindo as regras da Lei do Estágio (máximo de **6 horas por dia** e **30 horas por semana**).
* **Justificativas de Faltas/Atrasos:** Caso o estagiário tenha se atrasado ou faltado e anexado um atestado, você poderá ver o documento e a justificativa inserida por ele.

---

### 3. Calibração do GPS (Ajustar a Localização das Clínicas)
Se o sistema começar a dizer que os estagiários estão "longe da clínica" mesmo estando dentro dela, você pode calibrar a localização:
1. Vá até a unidade física (ex: Unidade Generalíssimo) com o seu celular ou notebook.
2. Entre no painel da Supervisão e clique na aba **Unidades**.
3. Ao lado da unidade desejada, clique em **"Calibrar com minha localização atual"**.
4. O sistema usará o GPS do seu aparelho para atualizar as coordenadas exatas da clínica. Clique em **Salvar**.

---

## ❓ Dúvidas Frequentes e Resolução de Problemas

### 🔴 O sistema diz "Erro de Localização" ou "Você está fora do raio permitido". O que fazer?
1. **Verifique se o GPS está ligado:** No celular do estagiário, puxe a barra de notificações e veja se o ícone de "Localização" ou "GPS" está ativado.
2. **Permissão no Navegador:** 
   * Se você usa **iPhone (Safari)**: Vá em Ajustes > Privacidade > Serviços de Localização e veja se o Safari está autorizado. No site, toque nas letras `aA` do lado esquerdo do link e selecione "Ajustes do Site" > "Localização" > "Permitir".
   * Se você usa **Android (Chrome)**: Clique no ícone de "Cadeado" ao lado do endereço do site na barra de pesquisa do topo, vá em "Permissões" e ative a "Localização".
3. **Localização imprecisa:** Se o estagiário estiver muito nos fundos da clínica, o sinal do GPS pode falhar. Peça para ele se aproximar de uma janela ou da porta de entrada e tentar novamente.

### 🔴 O estagiário esqueceu de bater o ponto ou o celular dele descarregou. Como resolver?
O supervisor pode inserir um ponto manual para o estagiário:
1. Entre no Painel Administrativo com o PIN `1234`.
2. Vá na aba de **Registros de Ponto** e clique em **"Lançar Ponto Manual"**.
3. Selecione o estagiário, o dia, a hora correta e digite o motivo (ex: "Celular descarregou").
4. Salve. O sistema registrará que foi uma inserção manual autorizada pela supervisão.

### 🔴 Como trocar a senha de um estagiário que esqueceu?
1. Acesse o Painel da Supervisão.
2. Vá em **Gestão de Estagiários**, encontre o aluno e clique em **Editar**.
3. Você verá uma opção para **"Redefinir Senha"**. Digite uma nova senha temporária para ele e clique em **Salvar**.
4. Repasse a nova senha para o estagiário. No próximo login, o sistema pedirá para ele escolher uma senha definitiva.

---
*Este manual foi elaborado para garantir o uso correto e transparente do controle de ponto da Porto Terapia.*
