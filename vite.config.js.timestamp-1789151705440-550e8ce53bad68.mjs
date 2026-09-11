// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/bruno/Documents/Porto%20Terapia/Controle%20de%20Estagiario/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/bruno/Documents/Porto%20Terapia/Controle%20de%20Estagiario/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/bruno/Documents/Porto%20Terapia/Controle%20de%20Estagiario/node_modules/vite-plugin-pwa/dist/index.js";

// src/config/branding.js
var WORKSPACES = {
  "porto-terapia": {
    id: "porto-terapia",
    appTitle: "Fa\xE7aAmigos \u2022 Gest\xE3o de Pessoas",
    shortName: "Fa\xE7aAmigos",
    themeColor: "#1a1a2e",
    logoPath: "/logo.jpg",
    logoAlt: "Logo Fa\xE7aAmigos",
    // Subtítulo mostrado abaixo do nome na tela de login (ver App.jsx).
    subtitle: "Gest\xE3o de Pessoas",
    loginSubtitle: "Gest\xE3o de Pessoas",
    displayName: "Fa\xE7aAmigos",
    legalEntityName: "Porto Terapia Cl\xEDnica de Psicologia LTDA",
    legalEntityShort: "Porto Terapia Cl\xEDnica de Psicologia",
    documentTagline: "Cl\xEDnica de Psicologia e Desenvolvimento Humano",
    documentLocation: "Bel\xE9m - PA",
    contactEmail: "contato@portoterapia.com.br",
    rhEmail: "rh@portoterapia.com.br",
    cnpj: "12.345.678/0001-90",
    phone: "(91) 98888-7777",
    // Widget de chat "Fale com a Supervisão" (estagiário) + painel espelhado
    // de atendimento na aba RH (supervisor).
    showSupervisionChat: true,
    // Domínio usado quando um estagiário é cadastrado sem e-mail próprio
    // (vira <usuario>@<fallbackInternEmailDomain>).
    fallbackInternEmailDomain: "portoterapia.com",
    // Módulo de Profissionais PJ (prestadores de serviço) — ver ProfessionalKiosk.jsx.
    // Desligado neste site: a Porto Terapia hoje só controla estagiários.
    showProfessionalsModule: false,
    professionalTermsVersion: "1.0",
    professionalLabels: {
      singular: "Prestador(a)",
      plural: "Profissionais PJ",
      presence: "Registro de Presen\xE7a",
      production: "Apura\xE7\xE3o de Produ\xE7\xE3o"
    },
    professionalTermsText: "Este registro de presen\xE7a serve exclusivamente para organiza\xE7\xE3o de agenda, seguran\xE7a do local e confer\xEAncia dos servi\xE7os prestados para fins de faturamento. Ele n\xE3o constitui, e n\xE3o deve ser interpretado como, controle de jornada de trabalho, ponto eletr\xF4nico ou qualquer forma de subordina\xE7\xE3o, sendo seu uso facultativo e autodeclarado pelo(a) pr\xF3prio(a) prestador(a) de servi\xE7os, no \xE2mbito do contrato de presta\xE7\xE3o de servi\xE7os firmado com a empresa.",
    // Autocadastro de Profissionais PJ (ver ProfessionalSelfRegistration.jsx)
    // — desligado neste site junto com o restante do módulo PJ.
    showProfessionalSelfRegistration: false,
    autonomyDeclarationVersion: "1.0",
    autonomyDeclarationText: "",
    // Módulo de Funcionários CLT — ver EmployeeKiosk.jsx. Desligado neste site
    // (a Porto Terapia hoje não usa o hub para empregados CLT).
    showEmployeesModule: false,
    biometricConsentVersion: "1.0",
    // Autocadastro de Funcionários CLT (ver EmployeeSelfRegistration.jsx) —
    // desligado neste site junto com o restante do módulo CLT.
    showEmployeeSelfRegistration: false,
    employeeLgpdConsentVersion: "1.0",
    employeeLabels: {
      singular: "Funcion\xE1rio(a)",
      plural: "Funcion\xE1rios CLT",
      timesheet: "Ponto Eletr\xF4nico"
    },
    // Contas com role 'supervisor' que podem logar nomeadas neste site
    // (resolveAdminKey). Qualquer outro texto digitado cai no "supervisor"
    // genérico. O e-mail de cada uma é o mesmo em auth.users nos dois sites
    // (é a mesma conta Supabase) — só a lista exibida/reconhecível muda.
    // Tela de Usuários do Sistema (Configurações > Usuários do Sistema) —
    // cadastro/edição/reset de senha das contas que logam no painel e nos
    // quiosques. Desligada neste site: as contas da Porto Terapia continuam
    // sendo as fixas de adminUsers/kioskUnits.
    showSystemUsersModule: false,
    // Banco de Talentos (candidatos do módulo gerencial do app Faça Amigos)
    // — desligado neste site, que não tem esse convênio.
    showTalentBankModule: false,
    adminUsers: {
      supervisor: { label: "Supervisor Geral", email: "supervisor@portoterapia.com" },
      guimelly: { label: "Guimelly", email: "guimelly@portoterapia.com" },
      bruno: { label: "Bruno", email: "bruno@portoterapia.com" },
      isabella: { label: "Isabella", email: "isabella@portoterapia.com" },
      ian: { label: "Ian", email: "ian@portoterapia.com" }
    },
    // Unidades mostradas nos botões de login do quiosque (tela pré-login, sem
    // sessão — por isso não dá para consultar a tabela `units` via RLS ainda;
    // ver App.jsx). Precisam bater com os ids/kiosk_email da tabela `units`.
    kioskUnits: [
      {
        id: "antonio-barreto",
        name: "Ant\xF4nio Barreto",
        buttonLabel: "Estagi\xE1rios - Ant\xF4nio Barreto",
        loginLabel: "Estagi\xE1rio - Unidade Ant\xF4nio Barreto",
        kioskEmail: "antoniobarreto@portoterapia.com",
        razaoSocial: "Porto Terapia Cl\xEDnica de Psicologia LTDA",
        cnpj: "12.345.678/0001-90",
        address: "R. Ant\xF4nio Barreto, 2050 - F\xE1tima, Bel\xE9m - PA, 66060-021",
        phone: "(91) 98888-7777",
        accent: "emerald"
      },
      {
        id: "generalissimo",
        name: "General\xEDssimo Deodoro",
        buttonLabel: "Estagi\xE1rios - General\xEDssimo",
        loginLabel: "Estagi\xE1rio - Unidade General\xEDssimo Deodoro",
        kioskEmail: "generalissimo@portoterapia.com",
        razaoSocial: "Porto Terapia Cl\xEDnica de Psicologia LTDA",
        cnpj: "12.345.678/0002-71",
        address: "Av. General\xEDssimo Deodoro, 564 - Nazar\xE9, Bel\xE9m - PA",
        phone: "(91) 98888-7778",
        accent: "indigo"
      }
    ]
  },
  grupoib: {
    id: "grupoib",
    appTitle: "Fa\xE7aAmigos \u2022 Gest\xE3o de Pessoas",
    shortName: "Fa\xE7aAmigos",
    themeColor: "#0f766e",
    // Kit de marca FaçaAmigos (vetorizado) — ver public/brand/README de origem
    // em Projetos/Clinica/brand. Usa o símbolo isolado (sem wordmark) porque
    // as telas do app exibem o logo em caixas pequenas/quadradas (h-10 a h-16
    // com w-auto) — a versão horizontal com texto ficava cortada nesse espaço.
    logoPath: "/brand/facaamigos-simbolo.svg",
    logoAlt: "S\xEDmbolo Fa\xE7a Amigos",
    // Subtítulo mostrado abaixo do nome na tela de login (ver App.jsx).
    subtitle: "Gest\xE3o de Pessoas",
    loginSubtitle: "Gest\xE3o de Pessoas",
    displayName: "Fa\xE7aAmigos",
    // Sobrescreve a paleta "blue" do Tailwind pela paleta "teal" (verde-água)
    // só neste build — todo o app usa classes bg-blue-*/text-blue-*/etc. como
    // cor de marca; isso recolore a UI inteira sem precisar tocar em cada
    // componente. Ver tailwind.config.js.
    tailwindBlueOverride: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
      950: "#042f2e"
    },
    legalEntityName: "Raz\xE3o social do Fa\xE7aAmigos Gest\xE3o de Pessoas (pendente)",
    legalEntityShort: "Fa\xE7aAmigos",
    documentTagline: "Unidades e Servi\xE7os de Sa\xFAde Fa\xE7aAmigos",
    documentLocation: "Bel\xE9m - PA",
    contactEmail: "contato@grupoib.com.br",
    rhEmail: "rh@grupoib.com.br",
    cnpj: "00.000.000/0001-00",
    phone: "(91) 99999-0000",
    showSupervisionChat: false,
    fallbackInternEmailDomain: "grupoib.internal",
    // Módulo de Profissionais PJ (prestadores de serviço) — ver ProfessionalKiosk.jsx.
    // Vocabulário e regras deliberadamente distintos do estágio, para não sugerir
    // vínculo empregatício (ver seção 1 do plano de implementação do módulo).
    showProfessionalsModule: true,
    professionalTermsVersion: "1.0",
    professionalLabels: {
      singular: "Prestador(a)",
      plural: "Profissionais PJ",
      presence: "Registro de Presen\xE7a",
      production: "Apura\xE7\xE3o de Produ\xE7\xE3o"
    },
    professionalTermsText: "Este registro de presen\xE7a serve exclusivamente para organiza\xE7\xE3o de agenda, seguran\xE7a do local e confer\xEAncia dos servi\xE7os prestados para fins de faturamento. Ele n\xE3o constitui, e n\xE3o deve ser interpretado como, controle de jornada de trabalho, ponto eletr\xF4nico ou qualquer forma de subordina\xE7\xE3o, sendo seu uso facultativo e autodeclarado pelo(a) pr\xF3prio(a) prestador(a) de servi\xE7os, no \xE2mbito do contrato de presta\xE7\xE3o de servi\xE7os firmado com a empresa.",
    // Autocadastro de Profissionais PJ (ver ProfessionalSelfRegistration.jsx)
    // — o próprio prestador preenche seu cadastro completo (dados da PJ,
    // habilitação, representante legal e anexos) sem estar logado, nascendo
    // 'pending_validation' até o RH validar. Ver seção 18 de supabase_schema.sql.
    showProfessionalSelfRegistration: true,
    autonomyDeclarationVersion: "1.0",
    // Aceite obrigatório e versionado, separado do consentimento LGPD — é a
    // peça central da blindagem de vínculo trabalhista deste módulo.
    autonomyDeclarationText: "Declaro, para os fins do contrato de presta\xE7\xE3o de servi\xE7os a ser firmado, que atuo com plena autonomia t\xE9cnica e organizacional na execu\xE7\xE3o dos servi\xE7os, sem subordina\xE7\xE3o, pessoalidade ou habitualidade em rela\xE7\xE3o \xE0 contratante; que defino livremente minha agenda e forma de atendimento; que posso me fazer substituir por preposto(a) habilitado(a); que n\xE3o atendo a esta contratante em regime de exclusividade; e que sou respons\xE1vel pelos tributos, encargos previdenci\xE1rios e obriga\xE7\xF5es civis decorrentes da minha atividade como pessoa jur\xEDdica. Este cadastro e o contrato dele decorrente t\xEAm natureza exclusivamente civil, sem qualquer v\xEDnculo empregat\xEDcio com a contratante.",
    // Cláusulas padrão do contrato de prestação de serviços pré-preenchido
    // (ver ./utils/professionalContract.js); cada unidade pode complementar
    // com units.contrato_pj_custom_text.
    contractDefaultClauses: "[MINUTA GERADA AUTOMATICAMENTE \u2014 SUJEITA A REVIS\xC3O JUR\xCDDICA ANTES DA ASSINATURA.]",
    // Módulo de Funcionários CLT (empregados) — ver EmployeeKiosk.jsx. Ligado
    // no Grupo IB: terceiro tipo de vínculo do hub de RH, ao lado de
    // Estagiários e Profissionais PJ. Ao contrário do PJ, este módulo se
    // aproxima deliberadamente de controle de jornada (Portaria MTP 671/2021).
    showEmployeesModule: true,
    biometricConsentVersion: "1.0",
    // Autocadastro de Funcionários CLT (ver EmployeeSelfRegistration.jsx) — o
    // próprio candidato preenche dados pessoais/documentais e a biometria
    // facial (captura ao vivo com liveness, mesmo componente da Autogestão de
    // Biometria do estagiário) sem estar logado, nascendo 'pending_validation'
    // até o RH validar e completar cargo/salário/contrato/admissão. Ver
    // seção 19 de supabase_schema.sql.
    showEmployeeSelfRegistration: true,
    employeeLgpdConsentVersion: "1.0",
    employeeLabels: {
      singular: "Funcion\xE1rio(a)",
      plural: "Funcion\xE1rios CLT",
      timesheet: "Ponto Eletr\xF4nico"
    },
    // Somente o Bruno é admin nomeado neste site (mesma conta Supabase de
    // sempre); Guimelly/Isabella continuam com acesso de dados ao Grupo IB
    // (workspace_scope inclui "all"), mas não aparecem como opção de login
    // aqui — só no site da Porto Terapia.
    // Tela de Usuários do Sistema (ver seção 21 de supabase_schema.sql). Ligada
    // no Grupo IB: o hub tem 3 módulos e várias unidades, então as contas de
    // painel e de quiosque precisam ser geridas pela própria UI, e não por
    // blocos SQL rodados à mão.
    showSystemUsersModule: true,
    // Candidatos captados pelo Banco de Talentos do app Faça Amigos (módulo
    // gerencial, projeto Supabase separado) — ver supabase/functions/fetch-talent-bank.
    showTalentBankModule: true,
    adminUsers: {
      bruno: { label: "Bruno", email: "bruno@portoterapia.com" }
    },
    kioskUnits: [
      {
        id: "faca-amigos-parque-shopping",
        name: "Fa\xE7a Amigos Parque Shopping",
        buttonLabel: "Estagi\xE1rios - Fa\xE7a Amigos Parque Shopping",
        loginLabel: "Estagi\xE1rio - Fa\xE7a Amigos Parque Shopping",
        kioskEmail: "parqueshopping@grupoib.internal",
        professionalButtonLabel: "Profissionais PJ - Fa\xE7a Amigos Parque Shopping",
        professionalKioskEmail: "pj-parqueshopping@grupoib.internal",
        employeeButtonLabel: "Funcion\xE1rios CLT - Fa\xE7a Amigos Parque Shopping",
        employeeKioskEmail: "clt-parqueshopping@grupoib.internal",
        razaoSocial: "Fa\xE7a Amigos Parque Shopping Servi\xE7os M\xE9dicos LTDA",
        cnpj: "00.000.000/0001-01",
        address: "Rod. Augusto Montenegro, 4300 - Parque Shopping, Bel\xE9m - PA",
        phone: "(91) 99111-1001",
        accent: "emerald"
      },
      {
        id: "faca-amigos-grao-para",
        name: "Fa\xE7a Amigos Gr\xE3o Par\xE1",
        buttonLabel: "Estagi\xE1rios - Fa\xE7a Amigos Gr\xE3o Par\xE1",
        loginLabel: "Estagi\xE1rio - Fa\xE7a Amigos Gr\xE3o Par\xE1",
        kioskEmail: "graopara@grupoib.internal",
        professionalButtonLabel: "Profissionais PJ - Fa\xE7a Amigos Gr\xE3o Par\xE1",
        professionalKioskEmail: "pj-graopara@grupoib.internal",
        employeeButtonLabel: "Funcion\xE1rios CLT - Fa\xE7a Amigos Gr\xE3o Par\xE1",
        employeeKioskEmail: "clt-graopara@grupoib.internal",
        razaoSocial: "Fa\xE7a Amigos Gr\xE3o Par\xE1 Servi\xE7os M\xE9dicos LTDA",
        cnpj: "00.000.000/0001-02",
        address: "Av. Centen\xE1rio, 1050 - Shopping Bosque Gr\xE3o Par\xE1, Bel\xE9m - PA",
        phone: "(91) 99111-1002",
        accent: "indigo"
      },
      {
        id: "clinica-a",
        name: "Fa\xE7a Amigos, Centro de Terapia Comportamental",
        buttonLabel: "Estagi\xE1rios - Fa\xE7a Amigos, Centro de Terapia Comportamental",
        loginLabel: "Estagi\xE1rio - Fa\xE7a Amigos, Centro de Terapia Comportamental",
        kioskEmail: "clinicaa@grupoib.internal",
        professionalButtonLabel: "Profissionais PJ - Fa\xE7a Amigos, Centro de Terapia Comportamental",
        professionalKioskEmail: "pj-clinicaa@grupoib.internal",
        employeeButtonLabel: "Funcion\xE1rios CLT - Fa\xE7a Amigos, Centro de Terapia Comportamental",
        employeeKioskEmail: "clt-clinicaa@grupoib.internal",
        razaoSocial: "INSTITUTO FACA AMIGOS LTDA",
        cnpj: "22.161.197/0001-83",
        address: "R. Boaventura da Silva, 1573 - Umarizal, Bel\xE9m - PA, CEP 66.060-147",
        phone: "(91) 8250-1215",
        accent: "amber"
      },
      {
        id: "clinica-b",
        name: "Cl\xEDnica B",
        buttonLabel: "Estagi\xE1rios - Cl\xEDnica B",
        loginLabel: "Estagi\xE1rio - Cl\xEDnica B",
        kioskEmail: "clinicab@grupoib.internal",
        professionalButtonLabel: "Profissionais PJ - Cl\xEDnica B",
        professionalKioskEmail: "pj-clinicab@grupoib.internal",
        employeeButtonLabel: "Funcion\xE1rios CLT - Cl\xEDnica B",
        employeeKioskEmail: "clt-clinicab@grupoib.internal",
        razaoSocial: "Cl\xEDnica B Servi\xE7os de Sa\xFAde LTDA",
        cnpj: "00.000.000/0001-04",
        address: "Av. Conselheiro Furtado, 1500 - Crema\xE7\xE3o, Bel\xE9m - PA",
        phone: "(91) 99111-1004",
        accent: "rose"
      }
    ]
  }
};
var CURRENT_WORKSPACE_ID = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_WORKSPACE_ID || "porto-terapia";
var BRANDING = WORKSPACES[CURRENT_WORKSPACE_ID] || WORKSPACES["porto-terapia"];

// vite.config.js
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const branding = WORKSPACES[env.VITE_WORKSPACE_ID] || WORKSPACES["porto-terapia"];
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true
        },
        // Modelos do face-api.js (public/models) não têm extensão de arquivo reconhecida
        // pelo glob padrão do workbox, então precisam ser incluídos explicitamente.
        includeAssets: ["models/**/*"],
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallbackDenylist: [/^\/assets\//],
          maximumFileSizeToCacheInBytes: 5e6
        },
        manifest: {
          name: branding.appTitle,
          short_name: branding.shortName,
          description: "Sistema de Ponto e Controle para RH",
          theme_color: branding.themeColor,
          background_color: branding.themeColor,
          display: "standalone",
          icons: branding.logoPath ? [
            { src: branding.logoPath, sizes: "192x192", type: "image/jpeg" },
            { src: branding.logoPath, sizes: "512x512", type: "image/jpeg" }
          ] : []
        }
      }),
      // Grava o título/theme-color certos direto no HTML de build (não só
      // via JS em main.jsx), pra nenhum crawler/primeira pintura da tela
      // chegar a mostrar o branding do outro workspace, nem por um instante.
      {
        name: "inject-workspace-branding-html",
        transformIndexHtml(html) {
          return html.replace(/<title>.*<\/title>/, `<title>${branding.appTitle}</title>`).replace(
            /<meta name="theme-color" content="[^"]*"\s*\/>/,
            `<meta name="theme-color" content="${branding.themeColor}" />`
          );
        }
      }
    ],
    server: {
      host: true,
      port: 8080
    },
    build: {
      // Source maps completos só em build de desenvolvimento/preview. Em
      // produção eles expunham o código-fonte inteiro (com comentários sobre
      // RLS, nomes de tabelas e lógica de negócio) em /assets/*.map.
      sourcemap: mode === "production" ? false : true,
      rollupOptions: {
        output: {
          manualChunks: {
            recharts: ["recharts"],
            vendor: ["react", "react-dom", "lucide-react", "cmdk", "sonner"]
          }
        }
      }
    },
    test: {
      environment: "node",
      include: ["src/**/__tests__/**/*.test.js"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL2NvbmZpZy9icmFuZGluZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJydW5vXFxcXERvY3VtZW50c1xcXFxQb3J0byBUZXJhcGlhXFxcXENvbnRyb2xlIGRlIEVzdGFnaWFyaW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJydW5vXFxcXERvY3VtZW50c1xcXFxQb3J0byBUZXJhcGlhXFxcXENvbnRyb2xlIGRlIEVzdGFnaWFyaW9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2JydW5vL0RvY3VtZW50cy9Qb3J0byUyMFRlcmFwaWEvQ29udHJvbGUlMjBkZSUyMEVzdGFnaWFyaW8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XHJcbmltcG9ydCB7IFdPUktTUEFDRVMgfSBmcm9tICcuL3NyYy9jb25maWcvYnJhbmRpbmcuanMnO1xyXG5cclxuLy8gUm9kYSBlbSBOb2RlIChuXHUwMEUzbyBwYXNzYSBwZWxvIGJ1bmRsZXIpLCBwb3IgaXNzbyBsXHUwMEVBIFZJVEVfV09SS1NQQUNFX0lEIHZpYVxyXG4vLyBsb2FkRW52L3Byb2Nlc3MuZW52IGVtIHZleiBkZSBpbXBvcnQubWV0YS5lbnYgXHUyMDE0IHZlciBzcmMvY29uZmlnL2JyYW5kaW5nLmpzLlxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XHJcbiAgY29uc3QgYnJhbmRpbmcgPSBXT1JLU1BBQ0VTW2Vudi5WSVRFX1dPUktTUEFDRV9JRF0gfHwgV09SS1NQQUNFU1sncG9ydG8tdGVyYXBpYSddO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICByZWFjdCgpLFxyXG4gICAgICBWaXRlUFdBKHtcclxuICAgICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgICBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBNb2RlbG9zIGRvIGZhY2UtYXBpLmpzIChwdWJsaWMvbW9kZWxzKSBuXHUwMEUzbyB0XHUwMEVBbSBleHRlbnNcdTAwRTNvIGRlIGFycXVpdm8gcmVjb25oZWNpZGFcclxuICAgICAgICAvLyBwZWxvIGdsb2IgcGFkclx1MDBFM28gZG8gd29ya2JveCwgZW50XHUwMEUzbyBwcmVjaXNhbSBzZXIgaW5jbHVcdTAwRURkb3MgZXhwbGljaXRhbWVudGUuXHJcbiAgICAgICAgaW5jbHVkZUFzc2V0czogWydtb2RlbHMvKiovKiddLFxyXG4gICAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuICAgICAgICAgIG5hdmlnYXRlRmFsbGJhY2tEZW55bGlzdDogWy9eXFwvYXNzZXRzXFwvL10sXHJcbiAgICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNTAwMDAwMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgICBuYW1lOiBicmFuZGluZy5hcHBUaXRsZSxcclxuICAgICAgICAgIHNob3J0X25hbWU6IGJyYW5kaW5nLnNob3J0TmFtZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2lzdGVtYSBkZSBQb250byBlIENvbnRyb2xlIHBhcmEgUkgnLFxyXG4gICAgICAgICAgdGhlbWVfY29sb3I6IGJyYW5kaW5nLnRoZW1lQ29sb3IsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBicmFuZGluZy50aGVtZUNvbG9yLFxyXG4gICAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxyXG4gICAgICAgICAgaWNvbnM6IGJyYW5kaW5nLmxvZ29QYXRoXHJcbiAgICAgICAgICAgID8gW1xyXG4gICAgICAgICAgICAgICAgeyBzcmM6IGJyYW5kaW5nLmxvZ29QYXRoLCBzaXplczogJzE5MngxOTInLCB0eXBlOiAnaW1hZ2UvanBlZycgfSxcclxuICAgICAgICAgICAgICAgIHsgc3JjOiBicmFuZGluZy5sb2dvUGF0aCwgc2l6ZXM6ICc1MTJ4NTEyJywgdHlwZTogJ2ltYWdlL2pwZWcnIH0sXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICA6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICAgLy8gR3JhdmEgbyB0XHUwMEVEdHVsby90aGVtZS1jb2xvciBjZXJ0b3MgZGlyZXRvIG5vIEhUTUwgZGUgYnVpbGQgKG5cdTAwRTNvIHNcdTAwRjNcclxuICAgICAgLy8gdmlhIEpTIGVtIG1haW4uanN4KSwgcHJhIG5lbmh1bSBjcmF3bGVyL3ByaW1laXJhIHBpbnR1cmEgZGEgdGVsYVxyXG4gICAgICAvLyBjaGVnYXIgYSBtb3N0cmFyIG8gYnJhbmRpbmcgZG8gb3V0cm8gd29ya3NwYWNlLCBuZW0gcG9yIHVtIGluc3RhbnRlLlxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ2luamVjdC13b3Jrc3BhY2UtYnJhbmRpbmctaHRtbCcsXHJcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcclxuICAgICAgICAgIHJldHVybiBodG1sXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC88dGl0bGU+Lio8XFwvdGl0bGU+LywgYDx0aXRsZT4ke2JyYW5kaW5nLmFwcFRpdGxlfTwvdGl0bGU+YClcclxuICAgICAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgLzxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCJbXlwiXSpcIlxccypcXC8+LyxcclxuICAgICAgICAgICAgICBgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiR7YnJhbmRpbmcudGhlbWVDb2xvcn1cIiAvPmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgcG9ydDogODA4MCxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvLyBTb3VyY2UgbWFwcyBjb21wbGV0b3Mgc1x1MDBGMyBlbSBidWlsZCBkZSBkZXNlbnZvbHZpbWVudG8vcHJldmlldy4gRW1cclxuICAgICAgLy8gcHJvZHVcdTAwRTdcdTAwRTNvIGVsZXMgZXhwdW5oYW0gbyBjXHUwMEYzZGlnby1mb250ZSBpbnRlaXJvIChjb20gY29tZW50XHUwMEUxcmlvcyBzb2JyZVxyXG4gICAgICAvLyBSTFMsIG5vbWVzIGRlIHRhYmVsYXMgZSBsXHUwMEYzZ2ljYSBkZSBuZWdcdTAwRjNjaW8pIGVtIC9hc3NldHMvKi5tYXAuXHJcbiAgICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgcmVjaGFydHM6IFsncmVjaGFydHMnXSxcclxuICAgICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdsdWNpZGUtcmVhY3QnLCAnY21kaycsICdzb25uZXInXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlc3Q6IHtcclxuICAgICAgZW52aXJvbm1lbnQ6ICdub2RlJyxcclxuICAgICAgaW5jbHVkZTogWydzcmMvKiovX190ZXN0c19fLyoqLyoudGVzdC5qcyddLFxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJydW5vXFxcXERvY3VtZW50c1xcXFxQb3J0byBUZXJhcGlhXFxcXENvbnRyb2xlIGRlIEVzdGFnaWFyaW9cXFxcc3JjXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYnJ1bm9cXFxcRG9jdW1lbnRzXFxcXFBvcnRvIFRlcmFwaWFcXFxcQ29udHJvbGUgZGUgRXN0YWdpYXJpb1xcXFxzcmNcXFxcY29uZmlnXFxcXGJyYW5kaW5nLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9icnVuby9Eb2N1bWVudHMvUG9ydG8lMjBUZXJhcGlhL0NvbnRyb2xlJTIwZGUlMjBFc3RhZ2lhcmlvL3NyYy9jb25maWcvYnJhbmRpbmcuanNcIjsvLyBDb25maWd1cmFcdTAwRTdcdTAwRTNvIGRlIG1hcmNhL2lkZW50aWRhZGUgcG9yIHdvcmtzcGFjZS4gQ2FkYSBkZXBsb3kgKFZlcmNlbCkgbFx1MDBFQVxyXG4vLyBWSVRFX1dPUktTUEFDRV9JRCBubyBidWlsZCBwYXJhIHNhYmVyIHF1YWwgb2JqZXRvIHVzYXIgXHUyMDE0IG8gcmVzdGFudGUgZG9cclxuLy8gY1x1MDBGM2RpZ28gbnVuY2EgZGV2ZSBjaGVjYXIgXCJwb3J0by10ZXJhcGlhXCIvXCJncnVwb2liXCIgZGlyZXRhbWVudGUsIGUgc2ltIGxlclxyXG4vLyBvcyBjYW1wb3MgYWJhaXhvIChpc3NvIFx1MDBFOSBvIHF1ZSBwZXJtaXRlIHJlYXByb3ZlaXRhciBvIG1lc21vIGNcdTAwRjNkaWdvLWZvbnRlXHJcbi8vIHBhcmEgb3MgZG9pcyBzaXRlcyBzZW0gbWlzdHVyYXIgbm9tZS9sb2dvL2NvbnRhcyBlbnRyZSBlbGVzKS5cclxuZXhwb3J0IGNvbnN0IFdPUktTUEFDRVMgPSB7XHJcbiAgJ3BvcnRvLXRlcmFwaWEnOiB7XHJcbiAgICBpZDogJ3BvcnRvLXRlcmFwaWEnLFxyXG4gICAgYXBwVGl0bGU6ICdGYVx1MDBFN2FBbWlnb3MgXHUyMDIyIEdlc3RcdTAwRTNvIGRlIFBlc3NvYXMnLFxyXG4gICAgc2hvcnROYW1lOiAnRmFcdTAwRTdhQW1pZ29zJyxcclxuICAgIHRoZW1lQ29sb3I6ICcjMWExYTJlJyxcclxuICAgIGxvZ29QYXRoOiAnL2xvZ28uanBnJyxcclxuICAgIGxvZ29BbHQ6ICdMb2dvIEZhXHUwMEU3YUFtaWdvcycsXHJcbiAgICAvLyBTdWJ0XHUwMEVEdHVsbyBtb3N0cmFkbyBhYmFpeG8gZG8gbm9tZSBuYSB0ZWxhIGRlIGxvZ2luICh2ZXIgQXBwLmpzeCkuXHJcbiAgICBzdWJ0aXRsZTogJ0dlc3RcdTAwRTNvIGRlIFBlc3NvYXMnLFxyXG4gICAgbG9naW5TdWJ0aXRsZTogJ0dlc3RcdTAwRTNvIGRlIFBlc3NvYXMnLFxyXG4gICAgZGlzcGxheU5hbWU6ICdGYVx1MDBFN2FBbWlnb3MnLFxyXG4gICAgbGVnYWxFbnRpdHlOYW1lOiAnUG9ydG8gVGVyYXBpYSBDbFx1MDBFRG5pY2EgZGUgUHNpY29sb2dpYSBMVERBJyxcclxuICAgIGxlZ2FsRW50aXR5U2hvcnQ6ICdQb3J0byBUZXJhcGlhIENsXHUwMEVEbmljYSBkZSBQc2ljb2xvZ2lhJyxcclxuICAgIGRvY3VtZW50VGFnbGluZTogJ0NsXHUwMEVEbmljYSBkZSBQc2ljb2xvZ2lhIGUgRGVzZW52b2x2aW1lbnRvIEh1bWFubycsXHJcbiAgICBkb2N1bWVudExvY2F0aW9uOiAnQmVsXHUwMEU5bSAtIFBBJyxcclxuICAgIGNvbnRhY3RFbWFpbDogJ2NvbnRhdG9AcG9ydG90ZXJhcGlhLmNvbS5icicsXHJcbiAgICByaEVtYWlsOiAncmhAcG9ydG90ZXJhcGlhLmNvbS5icicsXHJcbiAgICBjbnBqOiAnMTIuMzQ1LjY3OC8wMDAxLTkwJyxcclxuICAgIHBob25lOiAnKDkxKSA5ODg4OC03Nzc3JyxcclxuICAgIC8vIFdpZGdldCBkZSBjaGF0IFwiRmFsZSBjb20gYSBTdXBlcnZpc1x1MDBFM29cIiAoZXN0YWdpXHUwMEUxcmlvKSArIHBhaW5lbCBlc3BlbGhhZG9cclxuICAgIC8vIGRlIGF0ZW5kaW1lbnRvIG5hIGFiYSBSSCAoc3VwZXJ2aXNvcikuXHJcbiAgICBzaG93U3VwZXJ2aXNpb25DaGF0OiB0cnVlLFxyXG4gICAgLy8gRG9tXHUwMEVEbmlvIHVzYWRvIHF1YW5kbyB1bSBlc3RhZ2lcdTAwRTFyaW8gXHUwMEU5IGNhZGFzdHJhZG8gc2VtIGUtbWFpbCBwclx1MDBGM3ByaW9cclxuICAgIC8vICh2aXJhIDx1c3VhcmlvPkA8ZmFsbGJhY2tJbnRlcm5FbWFpbERvbWFpbj4pLlxyXG4gICAgZmFsbGJhY2tJbnRlcm5FbWFpbERvbWFpbjogJ3BvcnRvdGVyYXBpYS5jb20nLFxyXG4gICAgLy8gTVx1MDBGM2R1bG8gZGUgUHJvZmlzc2lvbmFpcyBQSiAocHJlc3RhZG9yZXMgZGUgc2VydmlcdTAwRTdvKSBcdTIwMTQgdmVyIFByb2Zlc3Npb25hbEtpb3NrLmpzeC5cclxuICAgIC8vIERlc2xpZ2FkbyBuZXN0ZSBzaXRlOiBhIFBvcnRvIFRlcmFwaWEgaG9qZSBzXHUwMEYzIGNvbnRyb2xhIGVzdGFnaVx1MDBFMXJpb3MuXHJcbiAgICBzaG93UHJvZmVzc2lvbmFsc01vZHVsZTogZmFsc2UsXHJcbiAgICBwcm9mZXNzaW9uYWxUZXJtc1ZlcnNpb246ICcxLjAnLFxyXG4gICAgcHJvZmVzc2lvbmFsTGFiZWxzOiB7XHJcbiAgICAgIHNpbmd1bGFyOiAnUHJlc3RhZG9yKGEpJyxcclxuICAgICAgcGx1cmFsOiAnUHJvZmlzc2lvbmFpcyBQSicsXHJcbiAgICAgIHByZXNlbmNlOiAnUmVnaXN0cm8gZGUgUHJlc2VuXHUwMEU3YScsXHJcbiAgICAgIHByb2R1Y3Rpb246ICdBcHVyYVx1MDBFN1x1MDBFM28gZGUgUHJvZHVcdTAwRTdcdTAwRTNvJyxcclxuICAgIH0sXHJcbiAgICBwcm9mZXNzaW9uYWxUZXJtc1RleHQ6XHJcbiAgICAgICdFc3RlIHJlZ2lzdHJvIGRlIHByZXNlblx1MDBFN2Egc2VydmUgZXhjbHVzaXZhbWVudGUgcGFyYSBvcmdhbml6YVx1MDBFN1x1MDBFM28gZGUgYWdlbmRhLCAnICtcclxuICAgICAgJ3NlZ3VyYW5cdTAwRTdhIGRvIGxvY2FsIGUgY29uZmVyXHUwMEVBbmNpYSBkb3Mgc2VydmlcdTAwRTdvcyBwcmVzdGFkb3MgcGFyYSBmaW5zIGRlIGZhdHVyYW1lbnRvLiAnICtcclxuICAgICAgJ0VsZSBuXHUwMEUzbyBjb25zdGl0dWksIGUgblx1MDBFM28gZGV2ZSBzZXIgaW50ZXJwcmV0YWRvIGNvbW8sIGNvbnRyb2xlIGRlIGpvcm5hZGEgZGUgdHJhYmFsaG8sICcgK1xyXG4gICAgICAncG9udG8gZWxldHJcdTAwRjRuaWNvIG91IHF1YWxxdWVyIGZvcm1hIGRlIHN1Ym9yZGluYVx1MDBFN1x1MDBFM28sIHNlbmRvIHNldSB1c28gZmFjdWx0YXRpdm8gZSAnICtcclxuICAgICAgJ2F1dG9kZWNsYXJhZG8gcGVsbyhhKSBwclx1MDBGM3ByaW8oYSkgcHJlc3RhZG9yKGEpIGRlIHNlcnZpXHUwMEU3b3MsIG5vIFx1MDBFMm1iaXRvIGRvIGNvbnRyYXRvIGRlICcgK1xyXG4gICAgICAncHJlc3RhXHUwMEU3XHUwMEUzbyBkZSBzZXJ2aVx1MDBFN29zIGZpcm1hZG8gY29tIGEgZW1wcmVzYS4nLFxyXG4gICAgLy8gQXV0b2NhZGFzdHJvIGRlIFByb2Zpc3Npb25haXMgUEogKHZlciBQcm9mZXNzaW9uYWxTZWxmUmVnaXN0cmF0aW9uLmpzeClcclxuICAgIC8vIFx1MjAxNCBkZXNsaWdhZG8gbmVzdGUgc2l0ZSBqdW50byBjb20gbyByZXN0YW50ZSBkbyBtXHUwMEYzZHVsbyBQSi5cclxuICAgIHNob3dQcm9mZXNzaW9uYWxTZWxmUmVnaXN0cmF0aW9uOiBmYWxzZSxcclxuICAgIGF1dG9ub215RGVjbGFyYXRpb25WZXJzaW9uOiAnMS4wJyxcclxuICAgIGF1dG9ub215RGVjbGFyYXRpb25UZXh0OiAnJyxcclxuICAgIC8vIE1cdTAwRjNkdWxvIGRlIEZ1bmNpb25cdTAwRTFyaW9zIENMVCBcdTIwMTQgdmVyIEVtcGxveWVlS2lvc2suanN4LiBEZXNsaWdhZG8gbmVzdGUgc2l0ZVxyXG4gICAgLy8gKGEgUG9ydG8gVGVyYXBpYSBob2plIG5cdTAwRTNvIHVzYSBvIGh1YiBwYXJhIGVtcHJlZ2Fkb3MgQ0xUKS5cclxuICAgIHNob3dFbXBsb3llZXNNb2R1bGU6IGZhbHNlLFxyXG4gICAgYmlvbWV0cmljQ29uc2VudFZlcnNpb246ICcxLjAnLFxyXG4gICAgLy8gQXV0b2NhZGFzdHJvIGRlIEZ1bmNpb25cdTAwRTFyaW9zIENMVCAodmVyIEVtcGxveWVlU2VsZlJlZ2lzdHJhdGlvbi5qc3gpIFx1MjAxNFxyXG4gICAgLy8gZGVzbGlnYWRvIG5lc3RlIHNpdGUganVudG8gY29tIG8gcmVzdGFudGUgZG8gbVx1MDBGM2R1bG8gQ0xULlxyXG4gICAgc2hvd0VtcGxveWVlU2VsZlJlZ2lzdHJhdGlvbjogZmFsc2UsXHJcbiAgICBlbXBsb3llZUxncGRDb25zZW50VmVyc2lvbjogJzEuMCcsXHJcbiAgICBlbXBsb3llZUxhYmVsczoge1xyXG4gICAgICBzaW5ndWxhcjogJ0Z1bmNpb25cdTAwRTFyaW8oYSknLFxyXG4gICAgICBwbHVyYWw6ICdGdW5jaW9uXHUwMEUxcmlvcyBDTFQnLFxyXG4gICAgICB0aW1lc2hlZXQ6ICdQb250byBFbGV0clx1MDBGNG5pY28nLFxyXG4gICAgfSxcclxuICAgIC8vIENvbnRhcyBjb20gcm9sZSAnc3VwZXJ2aXNvcicgcXVlIHBvZGVtIGxvZ2FyIG5vbWVhZGFzIG5lc3RlIHNpdGVcclxuICAgIC8vIChyZXNvbHZlQWRtaW5LZXkpLiBRdWFscXVlciBvdXRybyB0ZXh0byBkaWdpdGFkbyBjYWkgbm8gXCJzdXBlcnZpc29yXCJcclxuICAgIC8vIGdlblx1MDBFOXJpY28uIE8gZS1tYWlsIGRlIGNhZGEgdW1hIFx1MDBFOSBvIG1lc21vIGVtIGF1dGgudXNlcnMgbm9zIGRvaXMgc2l0ZXNcclxuICAgIC8vIChcdTAwRTkgYSBtZXNtYSBjb250YSBTdXBhYmFzZSkgXHUyMDE0IHNcdTAwRjMgYSBsaXN0YSBleGliaWRhL3JlY29uaGVjXHUwMEVEdmVsIG11ZGEuXHJcbiAgICAvLyBUZWxhIGRlIFVzdVx1MDBFMXJpb3MgZG8gU2lzdGVtYSAoQ29uZmlndXJhXHUwMEU3XHUwMEY1ZXMgPiBVc3VcdTAwRTFyaW9zIGRvIFNpc3RlbWEpIFx1MjAxNFxyXG4gICAgLy8gY2FkYXN0cm8vZWRpXHUwMEU3XHUwMEUzby9yZXNldCBkZSBzZW5oYSBkYXMgY29udGFzIHF1ZSBsb2dhbSBubyBwYWluZWwgZSBub3NcclxuICAgIC8vIHF1aW9zcXVlcy4gRGVzbGlnYWRhIG5lc3RlIHNpdGU6IGFzIGNvbnRhcyBkYSBQb3J0byBUZXJhcGlhIGNvbnRpbnVhbVxyXG4gICAgLy8gc2VuZG8gYXMgZml4YXMgZGUgYWRtaW5Vc2Vycy9raW9za1VuaXRzLlxyXG4gICAgc2hvd1N5c3RlbVVzZXJzTW9kdWxlOiBmYWxzZSxcclxuICAgIC8vIEJhbmNvIGRlIFRhbGVudG9zIChjYW5kaWRhdG9zIGRvIG1cdTAwRjNkdWxvIGdlcmVuY2lhbCBkbyBhcHAgRmFcdTAwRTdhIEFtaWdvcylcclxuICAgIC8vIFx1MjAxNCBkZXNsaWdhZG8gbmVzdGUgc2l0ZSwgcXVlIG5cdTAwRTNvIHRlbSBlc3NlIGNvbnZcdTAwRUFuaW8uXHJcbiAgICBzaG93VGFsZW50QmFua01vZHVsZTogZmFsc2UsXHJcbiAgICBhZG1pblVzZXJzOiB7XHJcbiAgICAgIHN1cGVydmlzb3I6IHsgbGFiZWw6ICdTdXBlcnZpc29yIEdlcmFsJywgZW1haWw6ICdzdXBlcnZpc29yQHBvcnRvdGVyYXBpYS5jb20nIH0sXHJcbiAgICAgIGd1aW1lbGx5OiB7IGxhYmVsOiAnR3VpbWVsbHknLCBlbWFpbDogJ2d1aW1lbGx5QHBvcnRvdGVyYXBpYS5jb20nIH0sXHJcbiAgICAgIGJydW5vOiB7IGxhYmVsOiAnQnJ1bm8nLCBlbWFpbDogJ2JydW5vQHBvcnRvdGVyYXBpYS5jb20nIH0sXHJcbiAgICAgIGlzYWJlbGxhOiB7IGxhYmVsOiAnSXNhYmVsbGEnLCBlbWFpbDogJ2lzYWJlbGxhQHBvcnRvdGVyYXBpYS5jb20nIH0sXHJcbiAgICAgIGlhbjogeyBsYWJlbDogJ0lhbicsIGVtYWlsOiAnaWFuQHBvcnRvdGVyYXBpYS5jb20nIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gVW5pZGFkZXMgbW9zdHJhZGFzIG5vcyBib3RcdTAwRjVlcyBkZSBsb2dpbiBkbyBxdWlvc3F1ZSAodGVsYSBwclx1MDBFOS1sb2dpbiwgc2VtXHJcbiAgICAvLyBzZXNzXHUwMEUzbyBcdTIwMTQgcG9yIGlzc28gblx1MDBFM28gZFx1MDBFMSBwYXJhIGNvbnN1bHRhciBhIHRhYmVsYSBgdW5pdHNgIHZpYSBSTFMgYWluZGE7XHJcbiAgICAvLyB2ZXIgQXBwLmpzeCkuIFByZWNpc2FtIGJhdGVyIGNvbSBvcyBpZHMva2lvc2tfZW1haWwgZGEgdGFiZWxhIGB1bml0c2AuXHJcbiAgICBraW9za1VuaXRzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2FudG9uaW8tYmFycmV0bycsXHJcbiAgICAgICAgbmFtZTogJ0FudFx1MDBGNG5pbyBCYXJyZXRvJyxcclxuICAgICAgICBidXR0b25MYWJlbDogJ0VzdGFnaVx1MDBFMXJpb3MgLSBBbnRcdTAwRjRuaW8gQmFycmV0bycsXHJcbiAgICAgICAgbG9naW5MYWJlbDogJ0VzdGFnaVx1MDBFMXJpbyAtIFVuaWRhZGUgQW50XHUwMEY0bmlvIEJhcnJldG8nLFxyXG4gICAgICAgIGtpb3NrRW1haWw6ICdhbnRvbmlvYmFycmV0b0Bwb3J0b3RlcmFwaWEuY29tJyxcclxuICAgICAgICByYXphb1NvY2lhbDogJ1BvcnRvIFRlcmFwaWEgQ2xcdTAwRURuaWNhIGRlIFBzaWNvbG9naWEgTFREQScsXHJcbiAgICAgICAgY25wajogJzEyLjM0NS42NzgvMDAwMS05MCcsXHJcbiAgICAgICAgYWRkcmVzczogJ1IuIEFudFx1MDBGNG5pbyBCYXJyZXRvLCAyMDUwIC0gRlx1MDBFMXRpbWEsIEJlbFx1MDBFOW0gLSBQQSwgNjYwNjAtMDIxJyxcclxuICAgICAgICBwaG9uZTogJyg5MSkgOTg4ODgtNzc3NycsXHJcbiAgICAgICAgYWNjZW50OiAnZW1lcmFsZCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2dlbmVyYWxpc3NpbW8nLFxyXG4gICAgICAgIG5hbWU6ICdHZW5lcmFsXHUwMEVEc3NpbW8gRGVvZG9ybycsXHJcbiAgICAgICAgYnV0dG9uTGFiZWw6ICdFc3RhZ2lcdTAwRTFyaW9zIC0gR2VuZXJhbFx1MDBFRHNzaW1vJyxcclxuICAgICAgICBsb2dpbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvIC0gVW5pZGFkZSBHZW5lcmFsXHUwMEVEc3NpbW8gRGVvZG9ybycsXHJcbiAgICAgICAga2lvc2tFbWFpbDogJ2dlbmVyYWxpc3NpbW9AcG9ydG90ZXJhcGlhLmNvbScsXHJcbiAgICAgICAgcmF6YW9Tb2NpYWw6ICdQb3J0byBUZXJhcGlhIENsXHUwMEVEbmljYSBkZSBQc2ljb2xvZ2lhIExUREEnLFxyXG4gICAgICAgIGNucGo6ICcxMi4zNDUuNjc4LzAwMDItNzEnLFxyXG4gICAgICAgIGFkZHJlc3M6ICdBdi4gR2VuZXJhbFx1MDBFRHNzaW1vIERlb2Rvcm8sIDU2NCAtIE5hemFyXHUwMEU5LCBCZWxcdTAwRTltIC0gUEEnLFxyXG4gICAgICAgIHBob25lOiAnKDkxKSA5ODg4OC03Nzc4JyxcclxuICAgICAgICBhY2NlbnQ6ICdpbmRpZ28nLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIGdydXBvaWI6IHtcclxuICAgIGlkOiAnZ3J1cG9pYicsXHJcbiAgICBhcHBUaXRsZTogJ0ZhXHUwMEU3YUFtaWdvcyBcdTIwMjIgR2VzdFx1MDBFM28gZGUgUGVzc29hcycsXHJcbiAgICBzaG9ydE5hbWU6ICdGYVx1MDBFN2FBbWlnb3MnLFxyXG4gICAgdGhlbWVDb2xvcjogJyMwZjc2NmUnLFxyXG4gICAgLy8gS2l0IGRlIG1hcmNhIEZhXHUwMEU3YUFtaWdvcyAodmV0b3JpemFkbykgXHUyMDE0IHZlciBwdWJsaWMvYnJhbmQvUkVBRE1FIGRlIG9yaWdlbVxyXG4gICAgLy8gZW0gUHJvamV0b3MvQ2xpbmljYS9icmFuZC4gVXNhIG8gc1x1MDBFRG1ib2xvIGlzb2xhZG8gKHNlbSB3b3JkbWFyaykgcG9ycXVlXHJcbiAgICAvLyBhcyB0ZWxhcyBkbyBhcHAgZXhpYmVtIG8gbG9nbyBlbSBjYWl4YXMgcGVxdWVuYXMvcXVhZHJhZGFzIChoLTEwIGEgaC0xNlxyXG4gICAgLy8gY29tIHctYXV0bykgXHUyMDE0IGEgdmVyc1x1MDBFM28gaG9yaXpvbnRhbCBjb20gdGV4dG8gZmljYXZhIGNvcnRhZGEgbmVzc2UgZXNwYVx1MDBFN28uXHJcbiAgICBsb2dvUGF0aDogJy9icmFuZC9mYWNhYW1pZ29zLXNpbWJvbG8uc3ZnJyxcclxuICAgIGxvZ29BbHQ6ICdTXHUwMEVEbWJvbG8gRmFcdTAwRTdhIEFtaWdvcycsXHJcbiAgICAvLyBTdWJ0XHUwMEVEdHVsbyBtb3N0cmFkbyBhYmFpeG8gZG8gbm9tZSBuYSB0ZWxhIGRlIGxvZ2luICh2ZXIgQXBwLmpzeCkuXHJcbiAgICBzdWJ0aXRsZTogJ0dlc3RcdTAwRTNvIGRlIFBlc3NvYXMnLFxyXG4gICAgbG9naW5TdWJ0aXRsZTogJ0dlc3RcdTAwRTNvIGRlIFBlc3NvYXMnLFxyXG4gICAgZGlzcGxheU5hbWU6ICdGYVx1MDBFN2FBbWlnb3MnLFxyXG4gICAgLy8gU29icmVzY3JldmUgYSBwYWxldGEgXCJibHVlXCIgZG8gVGFpbHdpbmQgcGVsYSBwYWxldGEgXCJ0ZWFsXCIgKHZlcmRlLVx1MDBFMWd1YSlcclxuICAgIC8vIHNcdTAwRjMgbmVzdGUgYnVpbGQgXHUyMDE0IHRvZG8gbyBhcHAgdXNhIGNsYXNzZXMgYmctYmx1ZS0qL3RleHQtYmx1ZS0qL2V0Yy4gY29tb1xyXG4gICAgLy8gY29yIGRlIG1hcmNhOyBpc3NvIHJlY29sb3JlIGEgVUkgaW50ZWlyYSBzZW0gcHJlY2lzYXIgdG9jYXIgZW0gY2FkYVxyXG4gICAgLy8gY29tcG9uZW50ZS4gVmVyIHRhaWx3aW5kLmNvbmZpZy5qcy5cclxuICAgIHRhaWx3aW5kQmx1ZU92ZXJyaWRlOiB7XHJcbiAgICAgIDUwOiAnI2YwZmRmYScsIDEwMDogJyNjY2ZiZjEnLCAyMDA6ICcjOTlmNmU0JywgMzAwOiAnIzVlZWFkNCcsIDQwMDogJyMyZGQ0YmYnLFxyXG4gICAgICA1MDA6ICcjMTRiOGE2JywgNjAwOiAnIzBkOTQ4OCcsIDcwMDogJyMwZjc2NmUnLCA4MDA6ICcjMTE1ZTU5JywgOTAwOiAnIzEzNGU0YScsIDk1MDogJyMwNDJmMmUnLFxyXG4gICAgfSxcclxuICAgIGxlZ2FsRW50aXR5TmFtZTogJ1Jhelx1MDBFM28gc29jaWFsIGRvIEZhXHUwMEU3YUFtaWdvcyBHZXN0XHUwMEUzbyBkZSBQZXNzb2FzIChwZW5kZW50ZSknLFxyXG4gICAgbGVnYWxFbnRpdHlTaG9ydDogJ0ZhXHUwMEU3YUFtaWdvcycsXHJcbiAgICBkb2N1bWVudFRhZ2xpbmU6ICdVbmlkYWRlcyBlIFNlcnZpXHUwMEU3b3MgZGUgU2FcdTAwRkFkZSBGYVx1MDBFN2FBbWlnb3MnLFxyXG4gICAgZG9jdW1lbnRMb2NhdGlvbjogJ0JlbFx1MDBFOW0gLSBQQScsXHJcbiAgICBjb250YWN0RW1haWw6ICdjb250YXRvQGdydXBvaWIuY29tLmJyJyxcclxuICAgIHJoRW1haWw6ICdyaEBncnVwb2liLmNvbS5icicsXHJcbiAgICBjbnBqOiAnMDAuMDAwLjAwMC8wMDAxLTAwJyxcclxuICAgIHBob25lOiAnKDkxKSA5OTk5OS0wMDAwJyxcclxuICAgIHNob3dTdXBlcnZpc2lvbkNoYXQ6IGZhbHNlLFxyXG4gICAgZmFsbGJhY2tJbnRlcm5FbWFpbERvbWFpbjogJ2dydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgLy8gTVx1MDBGM2R1bG8gZGUgUHJvZmlzc2lvbmFpcyBQSiAocHJlc3RhZG9yZXMgZGUgc2VydmlcdTAwRTdvKSBcdTIwMTQgdmVyIFByb2Zlc3Npb25hbEtpb3NrLmpzeC5cclxuICAgIC8vIFZvY2FidWxcdTAwRTFyaW8gZSByZWdyYXMgZGVsaWJlcmFkYW1lbnRlIGRpc3RpbnRvcyBkbyBlc3RcdTAwRTFnaW8sIHBhcmEgblx1MDBFM28gc3VnZXJpclxyXG4gICAgLy8gdlx1MDBFRG5jdWxvIGVtcHJlZ2F0XHUwMEVEY2lvICh2ZXIgc2VcdTAwRTdcdTAwRTNvIDEgZG8gcGxhbm8gZGUgaW1wbGVtZW50YVx1MDBFN1x1MDBFM28gZG8gbVx1MDBGM2R1bG8pLlxyXG4gICAgc2hvd1Byb2Zlc3Npb25hbHNNb2R1bGU6IHRydWUsXHJcbiAgICBwcm9mZXNzaW9uYWxUZXJtc1ZlcnNpb246ICcxLjAnLFxyXG4gICAgcHJvZmVzc2lvbmFsTGFiZWxzOiB7XHJcbiAgICAgIHNpbmd1bGFyOiAnUHJlc3RhZG9yKGEpJyxcclxuICAgICAgcGx1cmFsOiAnUHJvZmlzc2lvbmFpcyBQSicsXHJcbiAgICAgIHByZXNlbmNlOiAnUmVnaXN0cm8gZGUgUHJlc2VuXHUwMEU3YScsXHJcbiAgICAgIHByb2R1Y3Rpb246ICdBcHVyYVx1MDBFN1x1MDBFM28gZGUgUHJvZHVcdTAwRTdcdTAwRTNvJyxcclxuICAgIH0sXHJcbiAgICBwcm9mZXNzaW9uYWxUZXJtc1RleHQ6XHJcbiAgICAgICdFc3RlIHJlZ2lzdHJvIGRlIHByZXNlblx1MDBFN2Egc2VydmUgZXhjbHVzaXZhbWVudGUgcGFyYSBvcmdhbml6YVx1MDBFN1x1MDBFM28gZGUgYWdlbmRhLCAnICtcclxuICAgICAgJ3NlZ3VyYW5cdTAwRTdhIGRvIGxvY2FsIGUgY29uZmVyXHUwMEVBbmNpYSBkb3Mgc2VydmlcdTAwRTdvcyBwcmVzdGFkb3MgcGFyYSBmaW5zIGRlIGZhdHVyYW1lbnRvLiAnICtcclxuICAgICAgJ0VsZSBuXHUwMEUzbyBjb25zdGl0dWksIGUgblx1MDBFM28gZGV2ZSBzZXIgaW50ZXJwcmV0YWRvIGNvbW8sIGNvbnRyb2xlIGRlIGpvcm5hZGEgZGUgdHJhYmFsaG8sICcgK1xyXG4gICAgICAncG9udG8gZWxldHJcdTAwRjRuaWNvIG91IHF1YWxxdWVyIGZvcm1hIGRlIHN1Ym9yZGluYVx1MDBFN1x1MDBFM28sIHNlbmRvIHNldSB1c28gZmFjdWx0YXRpdm8gZSAnICtcclxuICAgICAgJ2F1dG9kZWNsYXJhZG8gcGVsbyhhKSBwclx1MDBGM3ByaW8oYSkgcHJlc3RhZG9yKGEpIGRlIHNlcnZpXHUwMEU3b3MsIG5vIFx1MDBFMm1iaXRvIGRvIGNvbnRyYXRvIGRlICcgK1xyXG4gICAgICAncHJlc3RhXHUwMEU3XHUwMEUzbyBkZSBzZXJ2aVx1MDBFN29zIGZpcm1hZG8gY29tIGEgZW1wcmVzYS4nLFxyXG4gICAgLy8gQXV0b2NhZGFzdHJvIGRlIFByb2Zpc3Npb25haXMgUEogKHZlciBQcm9mZXNzaW9uYWxTZWxmUmVnaXN0cmF0aW9uLmpzeClcclxuICAgIC8vIFx1MjAxNCBvIHByXHUwMEYzcHJpbyBwcmVzdGFkb3IgcHJlZW5jaGUgc2V1IGNhZGFzdHJvIGNvbXBsZXRvIChkYWRvcyBkYSBQSixcclxuICAgIC8vIGhhYmlsaXRhXHUwMEU3XHUwMEUzbywgcmVwcmVzZW50YW50ZSBsZWdhbCBlIGFuZXhvcykgc2VtIGVzdGFyIGxvZ2FkbywgbmFzY2VuZG9cclxuICAgIC8vICdwZW5kaW5nX3ZhbGlkYXRpb24nIGF0XHUwMEU5IG8gUkggdmFsaWRhci4gVmVyIHNlXHUwMEU3XHUwMEUzbyAxOCBkZSBzdXBhYmFzZV9zY2hlbWEuc3FsLlxyXG4gICAgc2hvd1Byb2Zlc3Npb25hbFNlbGZSZWdpc3RyYXRpb246IHRydWUsXHJcbiAgICBhdXRvbm9teURlY2xhcmF0aW9uVmVyc2lvbjogJzEuMCcsXHJcbiAgICAvLyBBY2VpdGUgb2JyaWdhdFx1MDBGM3JpbyBlIHZlcnNpb25hZG8sIHNlcGFyYWRvIGRvIGNvbnNlbnRpbWVudG8gTEdQRCBcdTIwMTQgXHUwMEU5IGFcclxuICAgIC8vIHBlXHUwMEU3YSBjZW50cmFsIGRhIGJsaW5kYWdlbSBkZSB2XHUwMEVEbmN1bG8gdHJhYmFsaGlzdGEgZGVzdGUgbVx1MDBGM2R1bG8uXHJcbiAgICBhdXRvbm9teURlY2xhcmF0aW9uVGV4dDpcclxuICAgICAgJ0RlY2xhcm8sIHBhcmEgb3MgZmlucyBkbyBjb250cmF0byBkZSBwcmVzdGFcdTAwRTdcdTAwRTNvIGRlIHNlcnZpXHUwMEU3b3MgYSBzZXIgZmlybWFkbywgcXVlIGF0dW8gY29tICcgK1xyXG4gICAgICAncGxlbmEgYXV0b25vbWlhIHRcdTAwRTljbmljYSBlIG9yZ2FuaXphY2lvbmFsIG5hIGV4ZWN1XHUwMEU3XHUwMEUzbyBkb3Mgc2VydmlcdTAwRTdvcywgc2VtIHN1Ym9yZGluYVx1MDBFN1x1MDBFM28sICcgK1xyXG4gICAgICAncGVzc29hbGlkYWRlIG91IGhhYml0dWFsaWRhZGUgZW0gcmVsYVx1MDBFN1x1MDBFM28gXHUwMEUwIGNvbnRyYXRhbnRlOyBxdWUgZGVmaW5vIGxpdnJlbWVudGUgbWluaGEgYWdlbmRhICcgK1xyXG4gICAgICAnZSBmb3JtYSBkZSBhdGVuZGltZW50bzsgcXVlIHBvc3NvIG1lIGZhemVyIHN1YnN0aXR1aXIgcG9yIHByZXBvc3RvKGEpIGhhYmlsaXRhZG8oYSk7IHF1ZSBuXHUwMEUzbyAnICtcclxuICAgICAgJ2F0ZW5kbyBhIGVzdGEgY29udHJhdGFudGUgZW0gcmVnaW1lIGRlIGV4Y2x1c2l2aWRhZGU7IGUgcXVlIHNvdSByZXNwb25zXHUwMEUxdmVsIHBlbG9zIHRyaWJ1dG9zLCAnICtcclxuICAgICAgJ2VuY2FyZ29zIHByZXZpZGVuY2lcdTAwRTFyaW9zIGUgb2JyaWdhXHUwMEU3XHUwMEY1ZXMgY2l2aXMgZGVjb3JyZW50ZXMgZGEgbWluaGEgYXRpdmlkYWRlIGNvbW8gcGVzc29hICcgK1xyXG4gICAgICAnanVyXHUwMEVEZGljYS4gRXN0ZSBjYWRhc3RybyBlIG8gY29udHJhdG8gZGVsZSBkZWNvcnJlbnRlIHRcdTAwRUFtIG5hdHVyZXphIGV4Y2x1c2l2YW1lbnRlIGNpdmlsLCBzZW0gJyArXHJcbiAgICAgICdxdWFscXVlciB2XHUwMEVEbmN1bG8gZW1wcmVnYXRcdTAwRURjaW8gY29tIGEgY29udHJhdGFudGUuJyxcclxuICAgIC8vIENsXHUwMEUxdXN1bGFzIHBhZHJcdTAwRTNvIGRvIGNvbnRyYXRvIGRlIHByZXN0YVx1MDBFN1x1MDBFM28gZGUgc2VydmlcdTAwRTdvcyBwclx1MDBFOS1wcmVlbmNoaWRvXHJcbiAgICAvLyAodmVyIC4vdXRpbHMvcHJvZmVzc2lvbmFsQ29udHJhY3QuanMpOyBjYWRhIHVuaWRhZGUgcG9kZSBjb21wbGVtZW50YXJcclxuICAgIC8vIGNvbSB1bml0cy5jb250cmF0b19wal9jdXN0b21fdGV4dC5cclxuICAgIGNvbnRyYWN0RGVmYXVsdENsYXVzZXM6XHJcbiAgICAgICdbTUlOVVRBIEdFUkFEQSBBVVRPTUFUSUNBTUVOVEUgXHUyMDE0IFNVSkVJVEEgQSBSRVZJU1x1MDBDM08gSlVSXHUwMENERElDQSBBTlRFUyBEQSBBU1NJTkFUVVJBLl0nLFxyXG4gICAgLy8gTVx1MDBGM2R1bG8gZGUgRnVuY2lvblx1MDBFMXJpb3MgQ0xUIChlbXByZWdhZG9zKSBcdTIwMTQgdmVyIEVtcGxveWVlS2lvc2suanN4LiBMaWdhZG9cclxuICAgIC8vIG5vIEdydXBvIElCOiB0ZXJjZWlybyB0aXBvIGRlIHZcdTAwRURuY3VsbyBkbyBodWIgZGUgUkgsIGFvIGxhZG8gZGVcclxuICAgIC8vIEVzdGFnaVx1MDBFMXJpb3MgZSBQcm9maXNzaW9uYWlzIFBKLiBBbyBjb250clx1MDBFMXJpbyBkbyBQSiwgZXN0ZSBtXHUwMEYzZHVsbyBzZVxyXG4gICAgLy8gYXByb3hpbWEgZGVsaWJlcmFkYW1lbnRlIGRlIGNvbnRyb2xlIGRlIGpvcm5hZGEgKFBvcnRhcmlhIE1UUCA2NzEvMjAyMSkuXHJcbiAgICBzaG93RW1wbG95ZWVzTW9kdWxlOiB0cnVlLFxyXG4gICAgYmlvbWV0cmljQ29uc2VudFZlcnNpb246ICcxLjAnLFxyXG4gICAgLy8gQXV0b2NhZGFzdHJvIGRlIEZ1bmNpb25cdTAwRTFyaW9zIENMVCAodmVyIEVtcGxveWVlU2VsZlJlZ2lzdHJhdGlvbi5qc3gpIFx1MjAxNCBvXHJcbiAgICAvLyBwclx1MDBGM3ByaW8gY2FuZGlkYXRvIHByZWVuY2hlIGRhZG9zIHBlc3NvYWlzL2RvY3VtZW50YWlzIGUgYSBiaW9tZXRyaWFcclxuICAgIC8vIGZhY2lhbCAoY2FwdHVyYSBhbyB2aXZvIGNvbSBsaXZlbmVzcywgbWVzbW8gY29tcG9uZW50ZSBkYSBBdXRvZ2VzdFx1MDBFM28gZGVcclxuICAgIC8vIEJpb21ldHJpYSBkbyBlc3RhZ2lcdTAwRTFyaW8pIHNlbSBlc3RhciBsb2dhZG8sIG5hc2NlbmRvICdwZW5kaW5nX3ZhbGlkYXRpb24nXHJcbiAgICAvLyBhdFx1MDBFOSBvIFJIIHZhbGlkYXIgZSBjb21wbGV0YXIgY2FyZ28vc2FsXHUwMEUxcmlvL2NvbnRyYXRvL2FkbWlzc1x1MDBFM28uIFZlclxyXG4gICAgLy8gc2VcdTAwRTdcdTAwRTNvIDE5IGRlIHN1cGFiYXNlX3NjaGVtYS5zcWwuXHJcbiAgICBzaG93RW1wbG95ZWVTZWxmUmVnaXN0cmF0aW9uOiB0cnVlLFxyXG4gICAgZW1wbG95ZWVMZ3BkQ29uc2VudFZlcnNpb246ICcxLjAnLFxyXG4gICAgZW1wbG95ZWVMYWJlbHM6IHtcclxuICAgICAgc2luZ3VsYXI6ICdGdW5jaW9uXHUwMEUxcmlvKGEpJyxcclxuICAgICAgcGx1cmFsOiAnRnVuY2lvblx1MDBFMXJpb3MgQ0xUJyxcclxuICAgICAgdGltZXNoZWV0OiAnUG9udG8gRWxldHJcdTAwRjRuaWNvJyxcclxuICAgIH0sXHJcbiAgICAvLyBTb21lbnRlIG8gQnJ1bm8gXHUwMEU5IGFkbWluIG5vbWVhZG8gbmVzdGUgc2l0ZSAobWVzbWEgY29udGEgU3VwYWJhc2UgZGVcclxuICAgIC8vIHNlbXByZSk7IEd1aW1lbGx5L0lzYWJlbGxhIGNvbnRpbnVhbSBjb20gYWNlc3NvIGRlIGRhZG9zIGFvIEdydXBvIElCXHJcbiAgICAvLyAod29ya3NwYWNlX3Njb3BlIGluY2x1aSBcImFsbFwiKSwgbWFzIG5cdTAwRTNvIGFwYXJlY2VtIGNvbW8gb3BcdTAwRTdcdTAwRTNvIGRlIGxvZ2luXHJcbiAgICAvLyBhcXVpIFx1MjAxNCBzXHUwMEYzIG5vIHNpdGUgZGEgUG9ydG8gVGVyYXBpYS5cclxuICAgIC8vIFRlbGEgZGUgVXN1XHUwMEUxcmlvcyBkbyBTaXN0ZW1hICh2ZXIgc2VcdTAwRTdcdTAwRTNvIDIxIGRlIHN1cGFiYXNlX3NjaGVtYS5zcWwpLiBMaWdhZGFcclxuICAgIC8vIG5vIEdydXBvIElCOiBvIGh1YiB0ZW0gMyBtXHUwMEYzZHVsb3MgZSB2XHUwMEUxcmlhcyB1bmlkYWRlcywgZW50XHUwMEUzbyBhcyBjb250YXMgZGVcclxuICAgIC8vIHBhaW5lbCBlIGRlIHF1aW9zcXVlIHByZWNpc2FtIHNlciBnZXJpZGFzIHBlbGEgcHJcdTAwRjNwcmlhIFVJLCBlIG5cdTAwRTNvIHBvclxyXG4gICAgLy8gYmxvY29zIFNRTCByb2RhZG9zIFx1MDBFMCBtXHUwMEUzby5cclxuICAgIHNob3dTeXN0ZW1Vc2Vyc01vZHVsZTogdHJ1ZSxcclxuICAgIC8vIENhbmRpZGF0b3MgY2FwdGFkb3MgcGVsbyBCYW5jbyBkZSBUYWxlbnRvcyBkbyBhcHAgRmFcdTAwRTdhIEFtaWdvcyAobVx1MDBGM2R1bG9cclxuICAgIC8vIGdlcmVuY2lhbCwgcHJvamV0byBTdXBhYmFzZSBzZXBhcmFkbykgXHUyMDE0IHZlciBzdXBhYmFzZS9mdW5jdGlvbnMvZmV0Y2gtdGFsZW50LWJhbmsuXHJcbiAgICBzaG93VGFsZW50QmFua01vZHVsZTogdHJ1ZSxcclxuICAgIGFkbWluVXNlcnM6IHtcclxuICAgICAgYnJ1bm86IHsgbGFiZWw6ICdCcnVubycsIGVtYWlsOiAnYnJ1bm9AcG9ydG90ZXJhcGlhLmNvbScgfSxcclxuICAgIH0sXHJcbiAgICBraW9za1VuaXRzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2ZhY2EtYW1pZ29zLXBhcnF1ZS1zaG9wcGluZycsXHJcbiAgICAgICAgbmFtZTogJ0ZhXHUwMEU3YSBBbWlnb3MgUGFycXVlIFNob3BwaW5nJyxcclxuICAgICAgICBidXR0b25MYWJlbDogJ0VzdGFnaVx1MDBFMXJpb3MgLSBGYVx1MDBFN2EgQW1pZ29zIFBhcnF1ZSBTaG9wcGluZycsXHJcbiAgICAgICAgbG9naW5MYWJlbDogJ0VzdGFnaVx1MDBFMXJpbyAtIEZhXHUwMEU3YSBBbWlnb3MgUGFycXVlIFNob3BwaW5nJyxcclxuICAgICAgICBraW9za0VtYWlsOiAncGFycXVlc2hvcHBpbmdAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgcHJvZmVzc2lvbmFsQnV0dG9uTGFiZWw6ICdQcm9maXNzaW9uYWlzIFBKIC0gRmFcdTAwRTdhIEFtaWdvcyBQYXJxdWUgU2hvcHBpbmcnLFxyXG4gICAgICAgIHByb2Zlc3Npb25hbEtpb3NrRW1haWw6ICdwai1wYXJxdWVzaG9wcGluZ0BncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICBlbXBsb3llZUJ1dHRvbkxhYmVsOiAnRnVuY2lvblx1MDBFMXJpb3MgQ0xUIC0gRmFcdTAwRTdhIEFtaWdvcyBQYXJxdWUgU2hvcHBpbmcnLFxyXG4gICAgICAgIGVtcGxveWVlS2lvc2tFbWFpbDogJ2NsdC1wYXJxdWVzaG9wcGluZ0BncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICByYXphb1NvY2lhbDogJ0ZhXHUwMEU3YSBBbWlnb3MgUGFycXVlIFNob3BwaW5nIFNlcnZpXHUwMEU3b3MgTVx1MDBFOWRpY29zIExUREEnLFxyXG4gICAgICAgIGNucGo6ICcwMC4wMDAuMDAwLzAwMDEtMDEnLFxyXG4gICAgICAgIGFkZHJlc3M6ICdSb2QuIEF1Z3VzdG8gTW9udGVuZWdybywgNDMwMCAtIFBhcnF1ZSBTaG9wcGluZywgQmVsXHUwMEU5bSAtIFBBJyxcclxuICAgICAgICBwaG9uZTogJyg5MSkgOTkxMTEtMTAwMScsXHJcbiAgICAgICAgYWNjZW50OiAnZW1lcmFsZCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2ZhY2EtYW1pZ29zLWdyYW8tcGFyYScsXHJcbiAgICAgICAgbmFtZTogJ0ZhXHUwMEU3YSBBbWlnb3MgR3JcdTAwRTNvIFBhclx1MDBFMScsXHJcbiAgICAgICAgYnV0dG9uTGFiZWw6ICdFc3RhZ2lcdTAwRTFyaW9zIC0gRmFcdTAwRTdhIEFtaWdvcyBHclx1MDBFM28gUGFyXHUwMEUxJyxcclxuICAgICAgICBsb2dpbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvIC0gRmFcdTAwRTdhIEFtaWdvcyBHclx1MDBFM28gUGFyXHUwMEUxJyxcclxuICAgICAgICBraW9za0VtYWlsOiAnZ3Jhb3BhcmFAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgcHJvZmVzc2lvbmFsQnV0dG9uTGFiZWw6ICdQcm9maXNzaW9uYWlzIFBKIC0gRmFcdTAwRTdhIEFtaWdvcyBHclx1MDBFM28gUGFyXHUwMEUxJyxcclxuICAgICAgICBwcm9mZXNzaW9uYWxLaW9za0VtYWlsOiAncGotZ3Jhb3BhcmFAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgZW1wbG95ZWVCdXR0b25MYWJlbDogJ0Z1bmNpb25cdTAwRTFyaW9zIENMVCAtIEZhXHUwMEU3YSBBbWlnb3MgR3JcdTAwRTNvIFBhclx1MDBFMScsXHJcbiAgICAgICAgZW1wbG95ZWVLaW9za0VtYWlsOiAnY2x0LWdyYW9wYXJhQGdydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgICAgIHJhemFvU29jaWFsOiAnRmFcdTAwRTdhIEFtaWdvcyBHclx1MDBFM28gUGFyXHUwMEUxIFNlcnZpXHUwMEU3b3MgTVx1MDBFOWRpY29zIExUREEnLFxyXG4gICAgICAgIGNucGo6ICcwMC4wMDAuMDAwLzAwMDEtMDInLFxyXG4gICAgICAgIGFkZHJlc3M6ICdBdi4gQ2VudGVuXHUwMEUxcmlvLCAxMDUwIC0gU2hvcHBpbmcgQm9zcXVlIEdyXHUwMEUzbyBQYXJcdTAwRTEsIEJlbFx1MDBFOW0gLSBQQScsXHJcbiAgICAgICAgcGhvbmU6ICcoOTEpIDk5MTExLTEwMDInLFxyXG4gICAgICAgIGFjY2VudDogJ2luZGlnbycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2NsaW5pY2EtYScsXHJcbiAgICAgICAgbmFtZTogJ0ZhXHUwMEU3YSBBbWlnb3MsIENlbnRybyBkZSBUZXJhcGlhIENvbXBvcnRhbWVudGFsJyxcclxuICAgICAgICBidXR0b25MYWJlbDogJ0VzdGFnaVx1MDBFMXJpb3MgLSBGYVx1MDBFN2EgQW1pZ29zLCBDZW50cm8gZGUgVGVyYXBpYSBDb21wb3J0YW1lbnRhbCcsXHJcbiAgICAgICAgbG9naW5MYWJlbDogJ0VzdGFnaVx1MDBFMXJpbyAtIEZhXHUwMEU3YSBBbWlnb3MsIENlbnRybyBkZSBUZXJhcGlhIENvbXBvcnRhbWVudGFsJyxcclxuICAgICAgICBraW9za0VtYWlsOiAnY2xpbmljYWFAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgcHJvZmVzc2lvbmFsQnV0dG9uTGFiZWw6ICdQcm9maXNzaW9uYWlzIFBKIC0gRmFcdTAwRTdhIEFtaWdvcywgQ2VudHJvIGRlIFRlcmFwaWEgQ29tcG9ydGFtZW50YWwnLFxyXG4gICAgICAgIHByb2Zlc3Npb25hbEtpb3NrRW1haWw6ICdwai1jbGluaWNhYUBncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICBlbXBsb3llZUJ1dHRvbkxhYmVsOiAnRnVuY2lvblx1MDBFMXJpb3MgQ0xUIC0gRmFcdTAwRTdhIEFtaWdvcywgQ2VudHJvIGRlIFRlcmFwaWEgQ29tcG9ydGFtZW50YWwnLFxyXG4gICAgICAgIGVtcGxveWVlS2lvc2tFbWFpbDogJ2NsdC1jbGluaWNhYUBncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICByYXphb1NvY2lhbDogJ0lOU1RJVFVUTyBGQUNBIEFNSUdPUyBMVERBJyxcclxuICAgICAgICBjbnBqOiAnMjIuMTYxLjE5Ny8wMDAxLTgzJyxcclxuICAgICAgICBhZGRyZXNzOiAnUi4gQm9hdmVudHVyYSBkYSBTaWx2YSwgMTU3MyAtIFVtYXJpemFsLCBCZWxcdTAwRTltIC0gUEEsIENFUCA2Ni4wNjAtMTQ3JyxcclxuICAgICAgICBwaG9uZTogJyg5MSkgODI1MC0xMjE1JyxcclxuICAgICAgICBhY2NlbnQ6ICdhbWJlcicsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2NsaW5pY2EtYicsXHJcbiAgICAgICAgbmFtZTogJ0NsXHUwMEVEbmljYSBCJyxcclxuICAgICAgICBidXR0b25MYWJlbDogJ0VzdGFnaVx1MDBFMXJpb3MgLSBDbFx1MDBFRG5pY2EgQicsXHJcbiAgICAgICAgbG9naW5MYWJlbDogJ0VzdGFnaVx1MDBFMXJpbyAtIENsXHUwMEVEbmljYSBCJyxcclxuICAgICAgICBraW9za0VtYWlsOiAnY2xpbmljYWJAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgcHJvZmVzc2lvbmFsQnV0dG9uTGFiZWw6ICdQcm9maXNzaW9uYWlzIFBKIC0gQ2xcdTAwRURuaWNhIEInLFxyXG4gICAgICAgIHByb2Zlc3Npb25hbEtpb3NrRW1haWw6ICdwai1jbGluaWNhYkBncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICBlbXBsb3llZUJ1dHRvbkxhYmVsOiAnRnVuY2lvblx1MDBFMXJpb3MgQ0xUIC0gQ2xcdTAwRURuaWNhIEInLFxyXG4gICAgICAgIGVtcGxveWVlS2lvc2tFbWFpbDogJ2NsdC1jbGluaWNhYkBncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICByYXphb1NvY2lhbDogJ0NsXHUwMEVEbmljYSBCIFNlcnZpXHUwMEU3b3MgZGUgU2FcdTAwRkFkZSBMVERBJyxcclxuICAgICAgICBjbnBqOiAnMDAuMDAwLjAwMC8wMDAxLTA0JyxcclxuICAgICAgICBhZGRyZXNzOiAnQXYuIENvbnNlbGhlaXJvIEZ1cnRhZG8sIDE1MDAgLSBDcmVtYVx1MDBFN1x1MDBFM28sIEJlbFx1MDBFOW0gLSBQQScsXHJcbiAgICAgICAgcGhvbmU6ICcoOTEpIDk5MTExLTEwMDQnLFxyXG4gICAgICAgIGFjY2VudDogJ3Jvc2UnLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENVUlJFTlRfV09SS1NQQUNFX0lEID1cclxuICAodHlwZW9mIGltcG9ydC5tZXRhICE9PSAndW5kZWZpbmVkJyAmJiBpbXBvcnQubWV0YS5lbnYgJiYgaW1wb3J0Lm1ldGEuZW52LlZJVEVfV09SS1NQQUNFX0lEKSB8fFxyXG4gICdwb3J0by10ZXJhcGlhJztcclxuXHJcbmV4cG9ydCBjb25zdCBCUkFORElORyA9IFdPUktTUEFDRVNbQ1VSUkVOVF9XT1JLU1BBQ0VfSURdIHx8IFdPUktTUEFDRVNbJ3BvcnRvLXRlcmFwaWEnXTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyWCxTQUFTLGNBQWMsZUFBZTtBQUNqYSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlOzs7QUNHakIsSUFBTSxhQUFhO0FBQUEsRUFDeEIsaUJBQWlCO0FBQUEsSUFDZixJQUFJO0FBQUEsSUFDSixVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUE7QUFBQSxJQUVULFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxJQUNULE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBO0FBQUEsSUFHUCxxQkFBcUI7QUFBQTtBQUFBO0FBQUEsSUFHckIsMkJBQTJCO0FBQUE7QUFBQTtBQUFB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
