// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/bruno/Documents/Projetos/Gest%C3%A3o%20de%20Pessoas/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/bruno/Documents/Projetos/Gest%C3%A3o%20de%20Pessoas/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/bruno/Documents/Projetos/Gest%C3%A3o%20de%20Pessoas/node_modules/vite-plugin-pwa/dist/index.js";

// src/config/branding.js
var WORKSPACES = {
  "porto-terapia": {
    id: "porto-terapia",
    appTitle: "Porto Terapia \u2022 Gest\xE3o de Pessoas",
    shortName: "Porto Terapia",
    themeColor: "#1a1a2e",
    logoPath: "/logo.jpg",
    logoAlt: "Logo Porto Terapia",
    // Subtítulo mostrado abaixo do nome na tela de login (ver App.jsx).
    subtitle: "Gest\xE3o de Pessoas",
    loginSubtitle: "Gest\xE3o de Pessoas",
    displayName: "Porto Terapia",
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
    logoAlt: "S\xEDmbolo Fa\xE7aAmigos",
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
        name: "Fa\xE7aAmigos Parque Shopping",
        buttonLabel: "Estagi\xE1rios - Fa\xE7aAmigos Parque Shopping",
        loginLabel: "Estagi\xE1rio - Fa\xE7aAmigos Parque Shopping",
        kioskEmail: "parqueshopping@grupoib.internal",
        professionalButtonLabel: "Profissionais PJ - Fa\xE7aAmigos Parque Shopping",
        professionalKioskEmail: "pj-parqueshopping@grupoib.internal",
        employeeButtonLabel: "Funcion\xE1rios CLT - Fa\xE7aAmigos Parque Shopping",
        employeeKioskEmail: "clt-parqueshopping@grupoib.internal",
        razaoSocial: "Fa\xE7a Amigos Parque Shopping Servi\xE7os M\xE9dicos LTDA",
        cnpj: "00.000.000/0001-01",
        address: "Rod. Augusto Montenegro, 4300 - Parque Shopping, Bel\xE9m - PA",
        phone: "(91) 99111-1001",
        accent: "emerald"
      },
      {
        id: "faca-amigos-grao-para",
        name: "Fa\xE7aAmigos Gr\xE3o Par\xE1",
        buttonLabel: "Estagi\xE1rios - Fa\xE7aAmigos Gr\xE3o Par\xE1",
        loginLabel: "Estagi\xE1rio - Fa\xE7aAmigos Gr\xE3o Par\xE1",
        kioskEmail: "graopara@grupoib.internal",
        professionalButtonLabel: "Profissionais PJ - Fa\xE7aAmigos Gr\xE3o Par\xE1",
        professionalKioskEmail: "pj-graopara@grupoib.internal",
        employeeButtonLabel: "Funcion\xE1rios CLT - Fa\xE7aAmigos Gr\xE3o Par\xE1",
        employeeKioskEmail: "clt-graopara@grupoib.internal",
        razaoSocial: "Fa\xE7a Amigos Gr\xE3o Par\xE1 Servi\xE7os M\xE9dicos LTDA",
        cnpj: "00.000.000/0001-02",
        address: "Av. Centen\xE1rio, 1050 - Shopping Bosque Gr\xE3o Par\xE1, Bel\xE9m - PA",
        phone: "(91) 99111-1002",
        accent: "indigo"
      },
      {
        id: "clinica-a",
        name: "Fa\xE7aAmigos, Centro de Terapia Comportamental",
        buttonLabel: "Estagi\xE1rios - Fa\xE7aAmigos, Centro de Terapia Comportamental",
        loginLabel: "Estagi\xE1rio - Fa\xE7aAmigos, Centro de Terapia Comportamental",
        kioskEmail: "clinicaa@grupoib.internal",
        professionalButtonLabel: "Profissionais PJ - Fa\xE7aAmigos, Centro de Terapia Comportamental",
        professionalKioskEmail: "pj-clinicaa@grupoib.internal",
        employeeButtonLabel: "Funcion\xE1rios CLT - Fa\xE7aAmigos, Centro de Terapia Comportamental",
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
          skipWaiting: true,
          clientsClaim: true,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL2NvbmZpZy9icmFuZGluZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJydW5vXFxcXERvY3VtZW50c1xcXFxQcm9qZXRvc1xcXFxHZXN0XHUwMEUzbyBkZSBQZXNzb2FzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxicnVub1xcXFxEb2N1bWVudHNcXFxcUHJvamV0b3NcXFxcR2VzdFx1MDBFM28gZGUgUGVzc29hc1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYnJ1bm8vRG9jdW1lbnRzL1Byb2pldG9zL0dlc3QlQzMlQTNvJTIwZGUlMjBQZXNzb2FzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5pbXBvcnQgeyBXT1JLU1BBQ0VTIH0gZnJvbSAnLi9zcmMvY29uZmlnL2JyYW5kaW5nLmpzJztcclxuXHJcbi8vIFJvZGEgZW0gTm9kZSAoblx1MDBFM28gcGFzc2EgcGVsbyBidW5kbGVyKSwgcG9yIGlzc28gbFx1MDBFQSBWSVRFX1dPUktTUEFDRV9JRCB2aWFcclxuLy8gbG9hZEVudi9wcm9jZXNzLmVudiBlbSB2ZXogZGUgaW1wb3J0Lm1ldGEuZW52IFx1MjAxNCB2ZXIgc3JjL2NvbmZpZy9icmFuZGluZy5qcy5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xyXG4gIGNvbnN0IGJyYW5kaW5nID0gV09SS1NQQUNFU1tlbnYuVklURV9XT1JLU1BBQ0VfSURdIHx8IFdPUktTUEFDRVNbJ3BvcnRvLXRlcmFwaWEnXTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgcmVhY3QoKSxcclxuICAgICAgVml0ZVBXQSh7XHJcbiAgICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXHJcbiAgICAgICAgZGV2T3B0aW9uczoge1xyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gTW9kZWxvcyBkbyBmYWNlLWFwaS5qcyAocHVibGljL21vZGVscykgblx1MDBFM28gdFx1MDBFQW0gZXh0ZW5zXHUwMEUzbyBkZSBhcnF1aXZvIHJlY29uaGVjaWRhXHJcbiAgICAgICAgLy8gcGVsbyBnbG9iIHBhZHJcdTAwRTNvIGRvIHdvcmtib3gsIGVudFx1MDBFM28gcHJlY2lzYW0gc2VyIGluY2x1XHUwMEVEZG9zIGV4cGxpY2l0YW1lbnRlLlxyXG4gICAgICAgIGluY2x1ZGVBc3NldHM6IFsnbW9kZWxzLyoqLyonXSxcclxuICAgICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcclxuICAgICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcclxuICAgICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuICAgICAgICAgIG5hdmlnYXRlRmFsbGJhY2tEZW55bGlzdDogWy9eXFwvYXNzZXRzXFwvL10sXHJcbiAgICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNTAwMDAwMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgICBuYW1lOiBicmFuZGluZy5hcHBUaXRsZSxcclxuICAgICAgICAgIHNob3J0X25hbWU6IGJyYW5kaW5nLnNob3J0TmFtZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2lzdGVtYSBkZSBQb250byBlIENvbnRyb2xlIHBhcmEgUkgnLFxyXG4gICAgICAgICAgdGhlbWVfY29sb3I6IGJyYW5kaW5nLnRoZW1lQ29sb3IsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBicmFuZGluZy50aGVtZUNvbG9yLFxyXG4gICAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxyXG4gICAgICAgICAgaWNvbnM6IGJyYW5kaW5nLmxvZ29QYXRoXHJcbiAgICAgICAgICAgID8gW1xyXG4gICAgICAgICAgICAgICAgeyBzcmM6IGJyYW5kaW5nLmxvZ29QYXRoLCBzaXplczogJzE5MngxOTInLCB0eXBlOiAnaW1hZ2UvanBlZycgfSxcclxuICAgICAgICAgICAgICAgIHsgc3JjOiBicmFuZGluZy5sb2dvUGF0aCwgc2l6ZXM6ICc1MTJ4NTEyJywgdHlwZTogJ2ltYWdlL2pwZWcnIH0sXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICA6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICAgLy8gR3JhdmEgbyB0XHUwMEVEdHVsby90aGVtZS1jb2xvciBjZXJ0b3MgZGlyZXRvIG5vIEhUTUwgZGUgYnVpbGQgKG5cdTAwRTNvIHNcdTAwRjNcclxuICAgICAgLy8gdmlhIEpTIGVtIG1haW4uanN4KSwgcHJhIG5lbmh1bSBjcmF3bGVyL3ByaW1laXJhIHBpbnR1cmEgZGEgdGVsYVxyXG4gICAgICAvLyBjaGVnYXIgYSBtb3N0cmFyIG8gYnJhbmRpbmcgZG8gb3V0cm8gd29ya3NwYWNlLCBuZW0gcG9yIHVtIGluc3RhbnRlLlxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ2luamVjdC13b3Jrc3BhY2UtYnJhbmRpbmctaHRtbCcsXHJcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcclxuICAgICAgICAgIHJldHVybiBodG1sXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC88dGl0bGU+Lio8XFwvdGl0bGU+LywgYDx0aXRsZT4ke2JyYW5kaW5nLmFwcFRpdGxlfTwvdGl0bGU+YClcclxuICAgICAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgLzxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCJbXlwiXSpcIlxccypcXC8+LyxcclxuICAgICAgICAgICAgICBgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiR7YnJhbmRpbmcudGhlbWVDb2xvcn1cIiAvPmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgcG9ydDogODA4MCxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvLyBTb3VyY2UgbWFwcyBjb21wbGV0b3Mgc1x1MDBGMyBlbSBidWlsZCBkZSBkZXNlbnZvbHZpbWVudG8vcHJldmlldy4gRW1cclxuICAgICAgLy8gcHJvZHVcdTAwRTdcdTAwRTNvIGVsZXMgZXhwdW5oYW0gbyBjXHUwMEYzZGlnby1mb250ZSBpbnRlaXJvIChjb20gY29tZW50XHUwMEUxcmlvcyBzb2JyZVxyXG4gICAgICAvLyBSTFMsIG5vbWVzIGRlIHRhYmVsYXMgZSBsXHUwMEYzZ2ljYSBkZSBuZWdcdTAwRjNjaW8pIGVtIC9hc3NldHMvKi5tYXAuXHJcbiAgICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgcmVjaGFydHM6IFsncmVjaGFydHMnXSxcclxuICAgICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdsdWNpZGUtcmVhY3QnLCAnY21kaycsICdzb25uZXInXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlc3Q6IHtcclxuICAgICAgZW52aXJvbm1lbnQ6ICdub2RlJyxcclxuICAgICAgaW5jbHVkZTogWydzcmMvKiovX190ZXN0c19fLyoqLyoudGVzdC5qcyddLFxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJydW5vXFxcXERvY3VtZW50c1xcXFxQcm9qZXRvc1xcXFxHZXN0XHUwMEUzbyBkZSBQZXNzb2FzXFxcXHNyY1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJydW5vXFxcXERvY3VtZW50c1xcXFxQcm9qZXRvc1xcXFxHZXN0XHUwMEUzbyBkZSBQZXNzb2FzXFxcXHNyY1xcXFxjb25maWdcXFxcYnJhbmRpbmcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2JydW5vL0RvY3VtZW50cy9Qcm9qZXRvcy9HZXN0JUMzJUEzbyUyMGRlJTIwUGVzc29hcy9zcmMvY29uZmlnL2JyYW5kaW5nLmpzXCI7Ly8gQ29uZmlndXJhXHUwMEU3XHUwMEUzbyBkZSBtYXJjYS9pZGVudGlkYWRlIHBvciB3b3Jrc3BhY2UuIENhZGEgZGVwbG95IChWZXJjZWwpIGxcdTAwRUFcclxuLy8gVklURV9XT1JLU1BBQ0VfSUQgbm8gYnVpbGQgcGFyYSBzYWJlciBxdWFsIG9iamV0byB1c2FyIFx1MjAxNCBvIHJlc3RhbnRlIGRvXHJcbi8vIGNcdTAwRjNkaWdvIG51bmNhIGRldmUgY2hlY2FyIFwicG9ydG8tdGVyYXBpYVwiL1wiZ3J1cG9pYlwiIGRpcmV0YW1lbnRlLCBlIHNpbSBsZXJcclxuLy8gb3MgY2FtcG9zIGFiYWl4byAoaXNzbyBcdTAwRTkgbyBxdWUgcGVybWl0ZSByZWFwcm92ZWl0YXIgbyBtZXNtbyBjXHUwMEYzZGlnby1mb250ZVxyXG4vLyBwYXJhIG9zIGRvaXMgc2l0ZXMgc2VtIG1pc3R1cmFyIG5vbWUvbG9nby9jb250YXMgZW50cmUgZWxlcykuXHJcbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VTID0ge1xyXG4gICdwb3J0by10ZXJhcGlhJzoge1xyXG4gICAgaWQ6ICdwb3J0by10ZXJhcGlhJyxcclxuICAgIGFwcFRpdGxlOiAnUG9ydG8gVGVyYXBpYSBcdTIwMjIgR2VzdFx1MDBFM28gZGUgUGVzc29hcycsXHJcbiAgICBzaG9ydE5hbWU6ICdQb3J0byBUZXJhcGlhJyxcclxuICAgIHRoZW1lQ29sb3I6ICcjMWExYTJlJyxcclxuICAgIGxvZ29QYXRoOiAnL2xvZ28uanBnJyxcclxuICAgIGxvZ29BbHQ6ICdMb2dvIFBvcnRvIFRlcmFwaWEnLFxyXG4gICAgLy8gU3VidFx1MDBFRHR1bG8gbW9zdHJhZG8gYWJhaXhvIGRvIG5vbWUgbmEgdGVsYSBkZSBsb2dpbiAodmVyIEFwcC5qc3gpLlxyXG4gICAgc3VidGl0bGU6ICdHZXN0XHUwMEUzbyBkZSBQZXNzb2FzJyxcclxuICAgIGxvZ2luU3VidGl0bGU6ICdHZXN0XHUwMEUzbyBkZSBQZXNzb2FzJyxcclxuICAgIGRpc3BsYXlOYW1lOiAnUG9ydG8gVGVyYXBpYScsXHJcbiAgICBsZWdhbEVudGl0eU5hbWU6ICdQb3J0byBUZXJhcGlhIENsXHUwMEVEbmljYSBkZSBQc2ljb2xvZ2lhIExUREEnLFxyXG4gICAgbGVnYWxFbnRpdHlTaG9ydDogJ1BvcnRvIFRlcmFwaWEgQ2xcdTAwRURuaWNhIGRlIFBzaWNvbG9naWEnLFxyXG4gICAgZG9jdW1lbnRUYWdsaW5lOiAnQ2xcdTAwRURuaWNhIGRlIFBzaWNvbG9naWEgZSBEZXNlbnZvbHZpbWVudG8gSHVtYW5vJyxcclxuICAgIGRvY3VtZW50TG9jYXRpb246ICdCZWxcdTAwRTltIC0gUEEnLFxyXG4gICAgY29udGFjdEVtYWlsOiAnY29udGF0b0Bwb3J0b3RlcmFwaWEuY29tLmJyJyxcclxuICAgIHJoRW1haWw6ICdyaEBwb3J0b3RlcmFwaWEuY29tLmJyJyxcclxuICAgIGNucGo6ICcxMi4zNDUuNjc4LzAwMDEtOTAnLFxyXG4gICAgcGhvbmU6ICcoOTEpIDk4ODg4LTc3NzcnLFxyXG4gICAgLy8gV2lkZ2V0IGRlIGNoYXQgXCJGYWxlIGNvbSBhIFN1cGVydmlzXHUwMEUzb1wiIChlc3RhZ2lcdTAwRTFyaW8pICsgcGFpbmVsIGVzcGVsaGFkb1xyXG4gICAgLy8gZGUgYXRlbmRpbWVudG8gbmEgYWJhIFJIIChzdXBlcnZpc29yKS5cclxuICAgIHNob3dTdXBlcnZpc2lvbkNoYXQ6IHRydWUsXHJcbiAgICAvLyBEb21cdTAwRURuaW8gdXNhZG8gcXVhbmRvIHVtIGVzdGFnaVx1MDBFMXJpbyBcdTAwRTkgY2FkYXN0cmFkbyBzZW0gZS1tYWlsIHByXHUwMEYzcHJpb1xyXG4gICAgLy8gKHZpcmEgPHVzdWFyaW8+QDxmYWxsYmFja0ludGVybkVtYWlsRG9tYWluPikuXHJcbiAgICBmYWxsYmFja0ludGVybkVtYWlsRG9tYWluOiAncG9ydG90ZXJhcGlhLmNvbScsXHJcbiAgICAvLyBNXHUwMEYzZHVsbyBkZSBQcm9maXNzaW9uYWlzIFBKIChwcmVzdGFkb3JlcyBkZSBzZXJ2aVx1MDBFN28pIFx1MjAxNCB2ZXIgUHJvZmVzc2lvbmFsS2lvc2suanN4LlxyXG4gICAgLy8gRGVzbGlnYWRvIG5lc3RlIHNpdGU6IGEgUG9ydG8gVGVyYXBpYSBob2plIHNcdTAwRjMgY29udHJvbGEgZXN0YWdpXHUwMEUxcmlvcy5cclxuICAgIHNob3dQcm9mZXNzaW9uYWxzTW9kdWxlOiBmYWxzZSxcclxuICAgIHByb2Zlc3Npb25hbFRlcm1zVmVyc2lvbjogJzEuMCcsXHJcbiAgICBwcm9mZXNzaW9uYWxMYWJlbHM6IHtcclxuICAgICAgc2luZ3VsYXI6ICdQcmVzdGFkb3IoYSknLFxyXG4gICAgICBwbHVyYWw6ICdQcm9maXNzaW9uYWlzIFBKJyxcclxuICAgICAgcHJlc2VuY2U6ICdSZWdpc3RybyBkZSBQcmVzZW5cdTAwRTdhJyxcclxuICAgICAgcHJvZHVjdGlvbjogJ0FwdXJhXHUwMEU3XHUwMEUzbyBkZSBQcm9kdVx1MDBFN1x1MDBFM28nLFxyXG4gICAgfSxcclxuICAgIHByb2Zlc3Npb25hbFRlcm1zVGV4dDpcclxuICAgICAgJ0VzdGUgcmVnaXN0cm8gZGUgcHJlc2VuXHUwMEU3YSBzZXJ2ZSBleGNsdXNpdmFtZW50ZSBwYXJhIG9yZ2FuaXphXHUwMEU3XHUwMEUzbyBkZSBhZ2VuZGEsICcgK1xyXG4gICAgICAnc2VndXJhblx1MDBFN2EgZG8gbG9jYWwgZSBjb25mZXJcdTAwRUFuY2lhIGRvcyBzZXJ2aVx1MDBFN29zIHByZXN0YWRvcyBwYXJhIGZpbnMgZGUgZmF0dXJhbWVudG8uICcgK1xyXG4gICAgICAnRWxlIG5cdTAwRTNvIGNvbnN0aXR1aSwgZSBuXHUwMEUzbyBkZXZlIHNlciBpbnRlcnByZXRhZG8gY29tbywgY29udHJvbGUgZGUgam9ybmFkYSBkZSB0cmFiYWxobywgJyArXHJcbiAgICAgICdwb250byBlbGV0clx1MDBGNG5pY28gb3UgcXVhbHF1ZXIgZm9ybWEgZGUgc3Vib3JkaW5hXHUwMEU3XHUwMEUzbywgc2VuZG8gc2V1IHVzbyBmYWN1bHRhdGl2byBlICcgK1xyXG4gICAgICAnYXV0b2RlY2xhcmFkbyBwZWxvKGEpIHByXHUwMEYzcHJpbyhhKSBwcmVzdGFkb3IoYSkgZGUgc2VydmlcdTAwRTdvcywgbm8gXHUwMEUybWJpdG8gZG8gY29udHJhdG8gZGUgJyArXHJcbiAgICAgICdwcmVzdGFcdTAwRTdcdTAwRTNvIGRlIHNlcnZpXHUwMEU3b3MgZmlybWFkbyBjb20gYSBlbXByZXNhLicsXHJcbiAgICAvLyBBdXRvY2FkYXN0cm8gZGUgUHJvZmlzc2lvbmFpcyBQSiAodmVyIFByb2Zlc3Npb25hbFNlbGZSZWdpc3RyYXRpb24uanN4KVxyXG4gICAgLy8gXHUyMDE0IGRlc2xpZ2FkbyBuZXN0ZSBzaXRlIGp1bnRvIGNvbSBvIHJlc3RhbnRlIGRvIG1cdTAwRjNkdWxvIFBKLlxyXG4gICAgc2hvd1Byb2Zlc3Npb25hbFNlbGZSZWdpc3RyYXRpb246IGZhbHNlLFxyXG4gICAgYXV0b25vbXlEZWNsYXJhdGlvblZlcnNpb246ICcxLjAnLFxyXG4gICAgYXV0b25vbXlEZWNsYXJhdGlvblRleHQ6ICcnLFxyXG4gICAgLy8gTVx1MDBGM2R1bG8gZGUgRnVuY2lvblx1MDBFMXJpb3MgQ0xUIFx1MjAxNCB2ZXIgRW1wbG95ZWVLaW9zay5qc3guIERlc2xpZ2FkbyBuZXN0ZSBzaXRlXHJcbiAgICAvLyAoYSBQb3J0byBUZXJhcGlhIGhvamUgblx1MDBFM28gdXNhIG8gaHViIHBhcmEgZW1wcmVnYWRvcyBDTFQpLlxyXG4gICAgc2hvd0VtcGxveWVlc01vZHVsZTogZmFsc2UsXHJcbiAgICBiaW9tZXRyaWNDb25zZW50VmVyc2lvbjogJzEuMCcsXHJcbiAgICAvLyBBdXRvY2FkYXN0cm8gZGUgRnVuY2lvblx1MDBFMXJpb3MgQ0xUICh2ZXIgRW1wbG95ZWVTZWxmUmVnaXN0cmF0aW9uLmpzeCkgXHUyMDE0XHJcbiAgICAvLyBkZXNsaWdhZG8gbmVzdGUgc2l0ZSBqdW50byBjb20gbyByZXN0YW50ZSBkbyBtXHUwMEYzZHVsbyBDTFQuXHJcbiAgICBzaG93RW1wbG95ZWVTZWxmUmVnaXN0cmF0aW9uOiBmYWxzZSxcclxuICAgIGVtcGxveWVlTGdwZENvbnNlbnRWZXJzaW9uOiAnMS4wJyxcclxuICAgIGVtcGxveWVlTGFiZWxzOiB7XHJcbiAgICAgIHNpbmd1bGFyOiAnRnVuY2lvblx1MDBFMXJpbyhhKScsXHJcbiAgICAgIHBsdXJhbDogJ0Z1bmNpb25cdTAwRTFyaW9zIENMVCcsXHJcbiAgICAgIHRpbWVzaGVldDogJ1BvbnRvIEVsZXRyXHUwMEY0bmljbycsXHJcbiAgICB9LFxyXG4gICAgLy8gQ29udGFzIGNvbSByb2xlICdzdXBlcnZpc29yJyBxdWUgcG9kZW0gbG9nYXIgbm9tZWFkYXMgbmVzdGUgc2l0ZVxyXG4gICAgLy8gKHJlc29sdmVBZG1pbktleSkuIFF1YWxxdWVyIG91dHJvIHRleHRvIGRpZ2l0YWRvIGNhaSBubyBcInN1cGVydmlzb3JcIlxyXG4gICAgLy8gZ2VuXHUwMEU5cmljby4gTyBlLW1haWwgZGUgY2FkYSB1bWEgXHUwMEU5IG8gbWVzbW8gZW0gYXV0aC51c2VycyBub3MgZG9pcyBzaXRlc1xyXG4gICAgLy8gKFx1MDBFOSBhIG1lc21hIGNvbnRhIFN1cGFiYXNlKSBcdTIwMTQgc1x1MDBGMyBhIGxpc3RhIGV4aWJpZGEvcmVjb25oZWNcdTAwRUR2ZWwgbXVkYS5cclxuICAgIC8vIFRlbGEgZGUgVXN1XHUwMEUxcmlvcyBkbyBTaXN0ZW1hIChDb25maWd1cmFcdTAwRTdcdTAwRjVlcyA+IFVzdVx1MDBFMXJpb3MgZG8gU2lzdGVtYSkgXHUyMDE0XHJcbiAgICAvLyBjYWRhc3Ryby9lZGlcdTAwRTdcdTAwRTNvL3Jlc2V0IGRlIHNlbmhhIGRhcyBjb250YXMgcXVlIGxvZ2FtIG5vIHBhaW5lbCBlIG5vc1xyXG4gICAgLy8gcXVpb3NxdWVzLiBEZXNsaWdhZGEgbmVzdGUgc2l0ZTogYXMgY29udGFzIGRhIFBvcnRvIFRlcmFwaWEgY29udGludWFtXHJcbiAgICAvLyBzZW5kbyBhcyBmaXhhcyBkZSBhZG1pblVzZXJzL2tpb3NrVW5pdHMuXHJcbiAgICBzaG93U3lzdGVtVXNlcnNNb2R1bGU6IGZhbHNlLFxyXG4gICAgLy8gQmFuY28gZGUgVGFsZW50b3MgKGNhbmRpZGF0b3MgZG8gbVx1MDBGM2R1bG8gZ2VyZW5jaWFsIGRvIGFwcCBGYVx1MDBFN2EgQW1pZ29zKVxyXG4gICAgLy8gXHUyMDE0IGRlc2xpZ2FkbyBuZXN0ZSBzaXRlLCBxdWUgblx1MDBFM28gdGVtIGVzc2UgY29udlx1MDBFQW5pby5cclxuICAgIHNob3dUYWxlbnRCYW5rTW9kdWxlOiBmYWxzZSxcclxuICAgIGFkbWluVXNlcnM6IHtcclxuICAgICAgc3VwZXJ2aXNvcjogeyBsYWJlbDogJ1N1cGVydmlzb3IgR2VyYWwnLCBlbWFpbDogJ3N1cGVydmlzb3JAcG9ydG90ZXJhcGlhLmNvbScgfSxcclxuICAgICAgZ3VpbWVsbHk6IHsgbGFiZWw6ICdHdWltZWxseScsIGVtYWlsOiAnZ3VpbWVsbHlAcG9ydG90ZXJhcGlhLmNvbScgfSxcclxuICAgICAgYnJ1bm86IHsgbGFiZWw6ICdCcnVubycsIGVtYWlsOiAnYnJ1bm9AcG9ydG90ZXJhcGlhLmNvbScgfSxcclxuICAgICAgaXNhYmVsbGE6IHsgbGFiZWw6ICdJc2FiZWxsYScsIGVtYWlsOiAnaXNhYmVsbGFAcG9ydG90ZXJhcGlhLmNvbScgfSxcclxuICAgICAgaWFuOiB7IGxhYmVsOiAnSWFuJywgZW1haWw6ICdpYW5AcG9ydG90ZXJhcGlhLmNvbScgfSxcclxuICAgIH0sXHJcbiAgICAvLyBVbmlkYWRlcyBtb3N0cmFkYXMgbm9zIGJvdFx1MDBGNWVzIGRlIGxvZ2luIGRvIHF1aW9zcXVlICh0ZWxhIHByXHUwMEU5LWxvZ2luLCBzZW1cclxuICAgIC8vIHNlc3NcdTAwRTNvIFx1MjAxNCBwb3IgaXNzbyBuXHUwMEUzbyBkXHUwMEUxIHBhcmEgY29uc3VsdGFyIGEgdGFiZWxhIGB1bml0c2AgdmlhIFJMUyBhaW5kYTtcclxuICAgIC8vIHZlciBBcHAuanN4KS4gUHJlY2lzYW0gYmF0ZXIgY29tIG9zIGlkcy9raW9za19lbWFpbCBkYSB0YWJlbGEgYHVuaXRzYC5cclxuICAgIGtpb3NrVW5pdHM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnYW50b25pby1iYXJyZXRvJyxcclxuICAgICAgICBuYW1lOiAnQW50XHUwMEY0bmlvIEJhcnJldG8nLFxyXG4gICAgICAgIGJ1dHRvbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvcyAtIEFudFx1MDBGNG5pbyBCYXJyZXRvJyxcclxuICAgICAgICBsb2dpbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvIC0gVW5pZGFkZSBBbnRcdTAwRjRuaW8gQmFycmV0bycsXHJcbiAgICAgICAga2lvc2tFbWFpbDogJ2FudG9uaW9iYXJyZXRvQHBvcnRvdGVyYXBpYS5jb20nLFxyXG4gICAgICAgIHJhemFvU29jaWFsOiAnUG9ydG8gVGVyYXBpYSBDbFx1MDBFRG5pY2EgZGUgUHNpY29sb2dpYSBMVERBJyxcclxuICAgICAgICBjbnBqOiAnMTIuMzQ1LjY3OC8wMDAxLTkwJyxcclxuICAgICAgICBhZGRyZXNzOiAnUi4gQW50XHUwMEY0bmlvIEJhcnJldG8sIDIwNTAgLSBGXHUwMEUxdGltYSwgQmVsXHUwMEU5bSAtIFBBLCA2NjA2MC0wMjEnLFxyXG4gICAgICAgIHBob25lOiAnKDkxKSA5ODg4OC03Nzc3JyxcclxuICAgICAgICBhY2NlbnQ6ICdlbWVyYWxkJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnZ2VuZXJhbGlzc2ltbycsXHJcbiAgICAgICAgbmFtZTogJ0dlbmVyYWxcdTAwRURzc2ltbyBEZW9kb3JvJyxcclxuICAgICAgICBidXR0b25MYWJlbDogJ0VzdGFnaVx1MDBFMXJpb3MgLSBHZW5lcmFsXHUwMEVEc3NpbW8nLFxyXG4gICAgICAgIGxvZ2luTGFiZWw6ICdFc3RhZ2lcdTAwRTFyaW8gLSBVbmlkYWRlIEdlbmVyYWxcdTAwRURzc2ltbyBEZW9kb3JvJyxcclxuICAgICAgICBraW9za0VtYWlsOiAnZ2VuZXJhbGlzc2ltb0Bwb3J0b3RlcmFwaWEuY29tJyxcclxuICAgICAgICByYXphb1NvY2lhbDogJ1BvcnRvIFRlcmFwaWEgQ2xcdTAwRURuaWNhIGRlIFBzaWNvbG9naWEgTFREQScsXHJcbiAgICAgICAgY25wajogJzEyLjM0NS42NzgvMDAwMi03MScsXHJcbiAgICAgICAgYWRkcmVzczogJ0F2LiBHZW5lcmFsXHUwMEVEc3NpbW8gRGVvZG9ybywgNTY0IC0gTmF6YXJcdTAwRTksIEJlbFx1MDBFOW0gLSBQQScsXHJcbiAgICAgICAgcGhvbmU6ICcoOTEpIDk4ODg4LTc3NzgnLFxyXG4gICAgICAgIGFjY2VudDogJ2luZGlnbycsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgZ3J1cG9pYjoge1xyXG4gICAgaWQ6ICdncnVwb2liJyxcclxuICAgIGFwcFRpdGxlOiAnRmFcdTAwRTdhQW1pZ29zIFx1MjAyMiBHZXN0XHUwMEUzbyBkZSBQZXNzb2FzJyxcclxuICAgIHNob3J0TmFtZTogJ0ZhXHUwMEU3YUFtaWdvcycsXHJcbiAgICB0aGVtZUNvbG9yOiAnIzBmNzY2ZScsXHJcbiAgICAvLyBLaXQgZGUgbWFyY2EgRmFcdTAwRTdhQW1pZ29zICh2ZXRvcml6YWRvKSBcdTIwMTQgdmVyIHB1YmxpYy9icmFuZC9SRUFETUUgZGUgb3JpZ2VtXHJcbiAgICAvLyBlbSBQcm9qZXRvcy9DbGluaWNhL2JyYW5kLiBVc2EgbyBzXHUwMEVEbWJvbG8gaXNvbGFkbyAoc2VtIHdvcmRtYXJrKSBwb3JxdWVcclxuICAgIC8vIGFzIHRlbGFzIGRvIGFwcCBleGliZW0gbyBsb2dvIGVtIGNhaXhhcyBwZXF1ZW5hcy9xdWFkcmFkYXMgKGgtMTAgYSBoLTE2XHJcbiAgICAvLyBjb20gdy1hdXRvKSBcdTIwMTQgYSB2ZXJzXHUwMEUzbyBob3Jpem9udGFsIGNvbSB0ZXh0byBmaWNhdmEgY29ydGFkYSBuZXNzZSBlc3BhXHUwMEU3by5cclxuICAgIGxvZ29QYXRoOiAnL2JyYW5kL2ZhY2FhbWlnb3Mtc2ltYm9sby5zdmcnLFxyXG4gICAgbG9nb0FsdDogJ1NcdTAwRURtYm9sbyBGYVx1MDBFN2FBbWlnb3MnLFxyXG4gICAgLy8gU3VidFx1MDBFRHR1bG8gbW9zdHJhZG8gYWJhaXhvIGRvIG5vbWUgbmEgdGVsYSBkZSBsb2dpbiAodmVyIEFwcC5qc3gpLlxyXG4gICAgc3VidGl0bGU6ICdHZXN0XHUwMEUzbyBkZSBQZXNzb2FzJyxcclxuICAgIGxvZ2luU3VidGl0bGU6ICdHZXN0XHUwMEUzbyBkZSBQZXNzb2FzJyxcclxuICAgIGRpc3BsYXlOYW1lOiAnRmFcdTAwRTdhQW1pZ29zJyxcclxuICAgIC8vIFNvYnJlc2NyZXZlIGEgcGFsZXRhIFwiYmx1ZVwiIGRvIFRhaWx3aW5kIHBlbGEgcGFsZXRhIFwidGVhbFwiICh2ZXJkZS1cdTAwRTFndWEpXHJcbiAgICAvLyBzXHUwMEYzIG5lc3RlIGJ1aWxkIFx1MjAxNCB0b2RvIG8gYXBwIHVzYSBjbGFzc2VzIGJnLWJsdWUtKi90ZXh0LWJsdWUtKi9ldGMuIGNvbW9cclxuICAgIC8vIGNvciBkZSBtYXJjYTsgaXNzbyByZWNvbG9yZSBhIFVJIGludGVpcmEgc2VtIHByZWNpc2FyIHRvY2FyIGVtIGNhZGFcclxuICAgIC8vIGNvbXBvbmVudGUuIFZlciB0YWlsd2luZC5jb25maWcuanMuXHJcbiAgICB0YWlsd2luZEJsdWVPdmVycmlkZToge1xyXG4gICAgICA1MDogJyNmMGZkZmEnLCAxMDA6ICcjY2NmYmYxJywgMjAwOiAnIzk5ZjZlNCcsIDMwMDogJyM1ZWVhZDQnLCA0MDA6ICcjMmRkNGJmJyxcclxuICAgICAgNTAwOiAnIzE0YjhhNicsIDYwMDogJyMwZDk0ODgnLCA3MDA6ICcjMGY3NjZlJywgODAwOiAnIzExNWU1OScsIDkwMDogJyMxMzRlNGEnLCA5NTA6ICcjMDQyZjJlJyxcclxuICAgIH0sXHJcbiAgICBsZWdhbEVudGl0eU5hbWU6ICdSYXpcdTAwRTNvIHNvY2lhbCBkbyBGYVx1MDBFN2FBbWlnb3MgR2VzdFx1MDBFM28gZGUgUGVzc29hcyAocGVuZGVudGUpJyxcclxuICAgIGxlZ2FsRW50aXR5U2hvcnQ6ICdGYVx1MDBFN2FBbWlnb3MnLFxyXG4gICAgZG9jdW1lbnRUYWdsaW5lOiAnVW5pZGFkZXMgZSBTZXJ2aVx1MDBFN29zIGRlIFNhXHUwMEZBZGUgRmFcdTAwRTdhQW1pZ29zJyxcclxuICAgIGRvY3VtZW50TG9jYXRpb246ICdCZWxcdTAwRTltIC0gUEEnLFxyXG4gICAgY29udGFjdEVtYWlsOiAnY29udGF0b0BncnVwb2liLmNvbS5icicsXHJcbiAgICByaEVtYWlsOiAncmhAZ3J1cG9pYi5jb20uYnInLFxyXG4gICAgY25wajogJzAwLjAwMC4wMDAvMDAwMS0wMCcsXHJcbiAgICBwaG9uZTogJyg5MSkgOTk5OTktMDAwMCcsXHJcbiAgICBzaG93U3VwZXJ2aXNpb25DaGF0OiBmYWxzZSxcclxuICAgIGZhbGxiYWNrSW50ZXJuRW1haWxEb21haW46ICdncnVwb2liLmludGVybmFsJyxcclxuICAgIC8vIE1cdTAwRjNkdWxvIGRlIFByb2Zpc3Npb25haXMgUEogKHByZXN0YWRvcmVzIGRlIHNlcnZpXHUwMEU3bykgXHUyMDE0IHZlciBQcm9mZXNzaW9uYWxLaW9zay5qc3guXHJcbiAgICAvLyBWb2NhYnVsXHUwMEUxcmlvIGUgcmVncmFzIGRlbGliZXJhZGFtZW50ZSBkaXN0aW50b3MgZG8gZXN0XHUwMEUxZ2lvLCBwYXJhIG5cdTAwRTNvIHN1Z2VyaXJcclxuICAgIC8vIHZcdTAwRURuY3VsbyBlbXByZWdhdFx1MDBFRGNpbyAodmVyIHNlXHUwMEU3XHUwMEUzbyAxIGRvIHBsYW5vIGRlIGltcGxlbWVudGFcdTAwRTdcdTAwRTNvIGRvIG1cdTAwRjNkdWxvKS5cclxuICAgIHNob3dQcm9mZXNzaW9uYWxzTW9kdWxlOiB0cnVlLFxyXG4gICAgcHJvZmVzc2lvbmFsVGVybXNWZXJzaW9uOiAnMS4wJyxcclxuICAgIHByb2Zlc3Npb25hbExhYmVsczoge1xyXG4gICAgICBzaW5ndWxhcjogJ1ByZXN0YWRvcihhKScsXHJcbiAgICAgIHBsdXJhbDogJ1Byb2Zpc3Npb25haXMgUEonLFxyXG4gICAgICBwcmVzZW5jZTogJ1JlZ2lzdHJvIGRlIFByZXNlblx1MDBFN2EnLFxyXG4gICAgICBwcm9kdWN0aW9uOiAnQXB1cmFcdTAwRTdcdTAwRTNvIGRlIFByb2R1XHUwMEU3XHUwMEUzbycsXHJcbiAgICB9LFxyXG4gICAgcHJvZmVzc2lvbmFsVGVybXNUZXh0OlxyXG4gICAgICAnRXN0ZSByZWdpc3RybyBkZSBwcmVzZW5cdTAwRTdhIHNlcnZlIGV4Y2x1c2l2YW1lbnRlIHBhcmEgb3JnYW5pemFcdTAwRTdcdTAwRTNvIGRlIGFnZW5kYSwgJyArXHJcbiAgICAgICdzZWd1cmFuXHUwMEU3YSBkbyBsb2NhbCBlIGNvbmZlclx1MDBFQW5jaWEgZG9zIHNlcnZpXHUwMEU3b3MgcHJlc3RhZG9zIHBhcmEgZmlucyBkZSBmYXR1cmFtZW50by4gJyArXHJcbiAgICAgICdFbGUgblx1MDBFM28gY29uc3RpdHVpLCBlIG5cdTAwRTNvIGRldmUgc2VyIGludGVycHJldGFkbyBjb21vLCBjb250cm9sZSBkZSBqb3JuYWRhIGRlIHRyYWJhbGhvLCAnICtcclxuICAgICAgJ3BvbnRvIGVsZXRyXHUwMEY0bmljbyBvdSBxdWFscXVlciBmb3JtYSBkZSBzdWJvcmRpbmFcdTAwRTdcdTAwRTNvLCBzZW5kbyBzZXUgdXNvIGZhY3VsdGF0aXZvIGUgJyArXHJcbiAgICAgICdhdXRvZGVjbGFyYWRvIHBlbG8oYSkgcHJcdTAwRjNwcmlvKGEpIHByZXN0YWRvcihhKSBkZSBzZXJ2aVx1MDBFN29zLCBubyBcdTAwRTJtYml0byBkbyBjb250cmF0byBkZSAnICtcclxuICAgICAgJ3ByZXN0YVx1MDBFN1x1MDBFM28gZGUgc2VydmlcdTAwRTdvcyBmaXJtYWRvIGNvbSBhIGVtcHJlc2EuJyxcclxuICAgIC8vIEF1dG9jYWRhc3RybyBkZSBQcm9maXNzaW9uYWlzIFBKICh2ZXIgUHJvZmVzc2lvbmFsU2VsZlJlZ2lzdHJhdGlvbi5qc3gpXHJcbiAgICAvLyBcdTIwMTQgbyBwclx1MDBGM3ByaW8gcHJlc3RhZG9yIHByZWVuY2hlIHNldSBjYWRhc3RybyBjb21wbGV0byAoZGFkb3MgZGEgUEosXHJcbiAgICAvLyBoYWJpbGl0YVx1MDBFN1x1MDBFM28sIHJlcHJlc2VudGFudGUgbGVnYWwgZSBhbmV4b3MpIHNlbSBlc3RhciBsb2dhZG8sIG5hc2NlbmRvXHJcbiAgICAvLyAncGVuZGluZ192YWxpZGF0aW9uJyBhdFx1MDBFOSBvIFJIIHZhbGlkYXIuIFZlciBzZVx1MDBFN1x1MDBFM28gMTggZGUgc3VwYWJhc2Vfc2NoZW1hLnNxbC5cclxuICAgIHNob3dQcm9mZXNzaW9uYWxTZWxmUmVnaXN0cmF0aW9uOiB0cnVlLFxyXG4gICAgYXV0b25vbXlEZWNsYXJhdGlvblZlcnNpb246ICcxLjAnLFxyXG4gICAgLy8gQWNlaXRlIG9icmlnYXRcdTAwRjNyaW8gZSB2ZXJzaW9uYWRvLCBzZXBhcmFkbyBkbyBjb25zZW50aW1lbnRvIExHUEQgXHUyMDE0IFx1MDBFOSBhXHJcbiAgICAvLyBwZVx1MDBFN2EgY2VudHJhbCBkYSBibGluZGFnZW0gZGUgdlx1MDBFRG5jdWxvIHRyYWJhbGhpc3RhIGRlc3RlIG1cdTAwRjNkdWxvLlxyXG4gICAgYXV0b25vbXlEZWNsYXJhdGlvblRleHQ6XHJcbiAgICAgICdEZWNsYXJvLCBwYXJhIG9zIGZpbnMgZG8gY29udHJhdG8gZGUgcHJlc3RhXHUwMEU3XHUwMEUzbyBkZSBzZXJ2aVx1MDBFN29zIGEgc2VyIGZpcm1hZG8sIHF1ZSBhdHVvIGNvbSAnICtcclxuICAgICAgJ3BsZW5hIGF1dG9ub21pYSB0XHUwMEU5Y25pY2EgZSBvcmdhbml6YWNpb25hbCBuYSBleGVjdVx1MDBFN1x1MDBFM28gZG9zIHNlcnZpXHUwMEU3b3MsIHNlbSBzdWJvcmRpbmFcdTAwRTdcdTAwRTNvLCAnICtcclxuICAgICAgJ3Blc3NvYWxpZGFkZSBvdSBoYWJpdHVhbGlkYWRlIGVtIHJlbGFcdTAwRTdcdTAwRTNvIFx1MDBFMCBjb250cmF0YW50ZTsgcXVlIGRlZmlubyBsaXZyZW1lbnRlIG1pbmhhIGFnZW5kYSAnICtcclxuICAgICAgJ2UgZm9ybWEgZGUgYXRlbmRpbWVudG87IHF1ZSBwb3NzbyBtZSBmYXplciBzdWJzdGl0dWlyIHBvciBwcmVwb3N0byhhKSBoYWJpbGl0YWRvKGEpOyBxdWUgblx1MDBFM28gJyArXHJcbiAgICAgICdhdGVuZG8gYSBlc3RhIGNvbnRyYXRhbnRlIGVtIHJlZ2ltZSBkZSBleGNsdXNpdmlkYWRlOyBlIHF1ZSBzb3UgcmVzcG9uc1x1MDBFMXZlbCBwZWxvcyB0cmlidXRvcywgJyArXHJcbiAgICAgICdlbmNhcmdvcyBwcmV2aWRlbmNpXHUwMEUxcmlvcyBlIG9icmlnYVx1MDBFN1x1MDBGNWVzIGNpdmlzIGRlY29ycmVudGVzIGRhIG1pbmhhIGF0aXZpZGFkZSBjb21vIHBlc3NvYSAnICtcclxuICAgICAgJ2p1clx1MDBFRGRpY2EuIEVzdGUgY2FkYXN0cm8gZSBvIGNvbnRyYXRvIGRlbGUgZGVjb3JyZW50ZSB0XHUwMEVBbSBuYXR1cmV6YSBleGNsdXNpdmFtZW50ZSBjaXZpbCwgc2VtICcgK1xyXG4gICAgICAncXVhbHF1ZXIgdlx1MDBFRG5jdWxvIGVtcHJlZ2F0XHUwMEVEY2lvIGNvbSBhIGNvbnRyYXRhbnRlLicsXHJcbiAgICAvLyBDbFx1MDBFMXVzdWxhcyBwYWRyXHUwMEUzbyBkbyBjb250cmF0byBkZSBwcmVzdGFcdTAwRTdcdTAwRTNvIGRlIHNlcnZpXHUwMEU3b3MgcHJcdTAwRTktcHJlZW5jaGlkb1xyXG4gICAgLy8gKHZlciAuL3V0aWxzL3Byb2Zlc3Npb25hbENvbnRyYWN0LmpzKTsgY2FkYSB1bmlkYWRlIHBvZGUgY29tcGxlbWVudGFyXHJcbiAgICAvLyBjb20gdW5pdHMuY29udHJhdG9fcGpfY3VzdG9tX3RleHQuXHJcbiAgICBjb250cmFjdERlZmF1bHRDbGF1c2VzOlxyXG4gICAgICAnW01JTlVUQSBHRVJBREEgQVVUT01BVElDQU1FTlRFIFx1MjAxNCBTVUpFSVRBIEEgUkVWSVNcdTAwQzNPIEpVUlx1MDBDRERJQ0EgQU5URVMgREEgQVNTSU5BVFVSQS5dJyxcclxuICAgIC8vIE1cdTAwRjNkdWxvIGRlIEZ1bmNpb25cdTAwRTFyaW9zIENMVCAoZW1wcmVnYWRvcykgXHUyMDE0IHZlciBFbXBsb3llZUtpb3NrLmpzeC4gTGlnYWRvXHJcbiAgICAvLyBubyBHcnVwbyBJQjogdGVyY2Vpcm8gdGlwbyBkZSB2XHUwMEVEbmN1bG8gZG8gaHViIGRlIFJILCBhbyBsYWRvIGRlXHJcbiAgICAvLyBFc3RhZ2lcdTAwRTFyaW9zIGUgUHJvZmlzc2lvbmFpcyBQSi4gQW8gY29udHJcdTAwRTFyaW8gZG8gUEosIGVzdGUgbVx1MDBGM2R1bG8gc2VcclxuICAgIC8vIGFwcm94aW1hIGRlbGliZXJhZGFtZW50ZSBkZSBjb250cm9sZSBkZSBqb3JuYWRhIChQb3J0YXJpYSBNVFAgNjcxLzIwMjEpLlxyXG4gICAgc2hvd0VtcGxveWVlc01vZHVsZTogdHJ1ZSxcclxuICAgIGJpb21ldHJpY0NvbnNlbnRWZXJzaW9uOiAnMS4wJyxcclxuICAgIC8vIEF1dG9jYWRhc3RybyBkZSBGdW5jaW9uXHUwMEUxcmlvcyBDTFQgKHZlciBFbXBsb3llZVNlbGZSZWdpc3RyYXRpb24uanN4KSBcdTIwMTQgb1xyXG4gICAgLy8gcHJcdTAwRjNwcmlvIGNhbmRpZGF0byBwcmVlbmNoZSBkYWRvcyBwZXNzb2Fpcy9kb2N1bWVudGFpcyBlIGEgYmlvbWV0cmlhXHJcbiAgICAvLyBmYWNpYWwgKGNhcHR1cmEgYW8gdml2byBjb20gbGl2ZW5lc3MsIG1lc21vIGNvbXBvbmVudGUgZGEgQXV0b2dlc3RcdTAwRTNvIGRlXHJcbiAgICAvLyBCaW9tZXRyaWEgZG8gZXN0YWdpXHUwMEUxcmlvKSBzZW0gZXN0YXIgbG9nYWRvLCBuYXNjZW5kbyAncGVuZGluZ192YWxpZGF0aW9uJ1xyXG4gICAgLy8gYXRcdTAwRTkgbyBSSCB2YWxpZGFyIGUgY29tcGxldGFyIGNhcmdvL3NhbFx1MDBFMXJpby9jb250cmF0by9hZG1pc3NcdTAwRTNvLiBWZXJcclxuICAgIC8vIHNlXHUwMEU3XHUwMEUzbyAxOSBkZSBzdXBhYmFzZV9zY2hlbWEuc3FsLlxyXG4gICAgc2hvd0VtcGxveWVlU2VsZlJlZ2lzdHJhdGlvbjogdHJ1ZSxcclxuICAgIGVtcGxveWVlTGdwZENvbnNlbnRWZXJzaW9uOiAnMS4wJyxcclxuICAgIGVtcGxveWVlTGFiZWxzOiB7XHJcbiAgICAgIHNpbmd1bGFyOiAnRnVuY2lvblx1MDBFMXJpbyhhKScsXHJcbiAgICAgIHBsdXJhbDogJ0Z1bmNpb25cdTAwRTFyaW9zIENMVCcsXHJcbiAgICAgIHRpbWVzaGVldDogJ1BvbnRvIEVsZXRyXHUwMEY0bmljbycsXHJcbiAgICB9LFxyXG4gICAgLy8gU29tZW50ZSBvIEJydW5vIFx1MDBFOSBhZG1pbiBub21lYWRvIG5lc3RlIHNpdGUgKG1lc21hIGNvbnRhIFN1cGFiYXNlIGRlXHJcbiAgICAvLyBzZW1wcmUpOyBHdWltZWxseS9Jc2FiZWxsYSBjb250aW51YW0gY29tIGFjZXNzbyBkZSBkYWRvcyBhbyBHcnVwbyBJQlxyXG4gICAgLy8gKHdvcmtzcGFjZV9zY29wZSBpbmNsdWkgXCJhbGxcIiksIG1hcyBuXHUwMEUzbyBhcGFyZWNlbSBjb21vIG9wXHUwMEU3XHUwMEUzbyBkZSBsb2dpblxyXG4gICAgLy8gYXF1aSBcdTIwMTQgc1x1MDBGMyBubyBzaXRlIGRhIFBvcnRvIFRlcmFwaWEuXHJcbiAgICAvLyBUZWxhIGRlIFVzdVx1MDBFMXJpb3MgZG8gU2lzdGVtYSAodmVyIHNlXHUwMEU3XHUwMEUzbyAyMSBkZSBzdXBhYmFzZV9zY2hlbWEuc3FsKS4gTGlnYWRhXHJcbiAgICAvLyBubyBHcnVwbyBJQjogbyBodWIgdGVtIDMgbVx1MDBGM2R1bG9zIGUgdlx1MDBFMXJpYXMgdW5pZGFkZXMsIGVudFx1MDBFM28gYXMgY29udGFzIGRlXHJcbiAgICAvLyBwYWluZWwgZSBkZSBxdWlvc3F1ZSBwcmVjaXNhbSBzZXIgZ2VyaWRhcyBwZWxhIHByXHUwMEYzcHJpYSBVSSwgZSBuXHUwMEUzbyBwb3JcclxuICAgIC8vIGJsb2NvcyBTUUwgcm9kYWRvcyBcdTAwRTAgbVx1MDBFM28uXHJcbiAgICBzaG93U3lzdGVtVXNlcnNNb2R1bGU6IHRydWUsXHJcbiAgICAvLyBDYW5kaWRhdG9zIGNhcHRhZG9zIHBlbG8gQmFuY28gZGUgVGFsZW50b3MgZG8gYXBwIEZhXHUwMEU3YSBBbWlnb3MgKG1cdTAwRjNkdWxvXHJcbiAgICAvLyBnZXJlbmNpYWwsIHByb2pldG8gU3VwYWJhc2Ugc2VwYXJhZG8pIFx1MjAxNCB2ZXIgc3VwYWJhc2UvZnVuY3Rpb25zL2ZldGNoLXRhbGVudC1iYW5rLlxyXG4gICAgc2hvd1RhbGVudEJhbmtNb2R1bGU6IHRydWUsXHJcbiAgICBhZG1pblVzZXJzOiB7XHJcbiAgICAgIGJydW5vOiB7IGxhYmVsOiAnQnJ1bm8nLCBlbWFpbDogJ2JydW5vQHBvcnRvdGVyYXBpYS5jb20nIH0sXHJcbiAgICB9LFxyXG4gICAga2lvc2tVbml0czogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdmYWNhLWFtaWdvcy1wYXJxdWUtc2hvcHBpbmcnLFxyXG4gICAgICAgIG5hbWU6ICdGYVx1MDBFN2FBbWlnb3MgUGFycXVlIFNob3BwaW5nJyxcclxuICAgICAgICBidXR0b25MYWJlbDogJ0VzdGFnaVx1MDBFMXJpb3MgLSBGYVx1MDBFN2FBbWlnb3MgUGFycXVlIFNob3BwaW5nJyxcclxuICAgICAgICBsb2dpbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvIC0gRmFcdTAwRTdhQW1pZ29zIFBhcnF1ZSBTaG9wcGluZycsXHJcbiAgICAgICAga2lvc2tFbWFpbDogJ3BhcnF1ZXNob3BwaW5nQGdydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgICAgIHByb2Zlc3Npb25hbEJ1dHRvbkxhYmVsOiAnUHJvZmlzc2lvbmFpcyBQSiAtIEZhXHUwMEU3YUFtaWdvcyBQYXJxdWUgU2hvcHBpbmcnLFxyXG4gICAgICAgIHByb2Zlc3Npb25hbEtpb3NrRW1haWw6ICdwai1wYXJxdWVzaG9wcGluZ0BncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICBlbXBsb3llZUJ1dHRvbkxhYmVsOiAnRnVuY2lvblx1MDBFMXJpb3MgQ0xUIC0gRmFcdTAwRTdhQW1pZ29zIFBhcnF1ZSBTaG9wcGluZycsXHJcbiAgICAgICAgZW1wbG95ZWVLaW9za0VtYWlsOiAnY2x0LXBhcnF1ZXNob3BwaW5nQGdydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgICAgIHJhemFvU29jaWFsOiAnRmFcdTAwRTdhIEFtaWdvcyBQYXJxdWUgU2hvcHBpbmcgU2VydmlcdTAwRTdvcyBNXHUwMEU5ZGljb3MgTFREQScsXHJcbiAgICAgICAgY25wajogJzAwLjAwMC4wMDAvMDAwMS0wMScsXHJcbiAgICAgICAgYWRkcmVzczogJ1JvZC4gQXVndXN0byBNb250ZW5lZ3JvLCA0MzAwIC0gUGFycXVlIFNob3BwaW5nLCBCZWxcdTAwRTltIC0gUEEnLFxyXG4gICAgICAgIHBob25lOiAnKDkxKSA5OTExMS0xMDAxJyxcclxuICAgICAgICBhY2NlbnQ6ICdlbWVyYWxkJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnZmFjYS1hbWlnb3MtZ3Jhby1wYXJhJyxcclxuICAgICAgICBuYW1lOiAnRmFcdTAwRTdhQW1pZ29zIEdyXHUwMEUzbyBQYXJcdTAwRTEnLFxyXG4gICAgICAgIGJ1dHRvbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvcyAtIEZhXHUwMEU3YUFtaWdvcyBHclx1MDBFM28gUGFyXHUwMEUxJyxcclxuICAgICAgICBsb2dpbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvIC0gRmFcdTAwRTdhQW1pZ29zIEdyXHUwMEUzbyBQYXJcdTAwRTEnLFxyXG4gICAgICAgIGtpb3NrRW1haWw6ICdncmFvcGFyYUBncnVwb2liLmludGVybmFsJyxcclxuICAgICAgICBwcm9mZXNzaW9uYWxCdXR0b25MYWJlbDogJ1Byb2Zpc3Npb25haXMgUEogLSBGYVx1MDBFN2FBbWlnb3MgR3JcdTAwRTNvIFBhclx1MDBFMScsXHJcbiAgICAgICAgcHJvZmVzc2lvbmFsS2lvc2tFbWFpbDogJ3BqLWdyYW9wYXJhQGdydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgICAgIGVtcGxveWVlQnV0dG9uTGFiZWw6ICdGdW5jaW9uXHUwMEUxcmlvcyBDTFQgLSBGYVx1MDBFN2FBbWlnb3MgR3JcdTAwRTNvIFBhclx1MDBFMScsXHJcbiAgICAgICAgZW1wbG95ZWVLaW9za0VtYWlsOiAnY2x0LWdyYW9wYXJhQGdydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgICAgIHJhemFvU29jaWFsOiAnRmFcdTAwRTdhIEFtaWdvcyBHclx1MDBFM28gUGFyXHUwMEUxIFNlcnZpXHUwMEU3b3MgTVx1MDBFOWRpY29zIExUREEnLFxyXG4gICAgICAgIGNucGo6ICcwMC4wMDAuMDAwLzAwMDEtMDInLFxyXG4gICAgICAgIGFkZHJlc3M6ICdBdi4gQ2VudGVuXHUwMEUxcmlvLCAxMDUwIC0gU2hvcHBpbmcgQm9zcXVlIEdyXHUwMEUzbyBQYXJcdTAwRTEsIEJlbFx1MDBFOW0gLSBQQScsXHJcbiAgICAgICAgcGhvbmU6ICcoOTEpIDk5MTExLTEwMDInLFxyXG4gICAgICAgIGFjY2VudDogJ2luZGlnbycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2NsaW5pY2EtYScsXHJcbiAgICAgICAgbmFtZTogJ0ZhXHUwMEU3YUFtaWdvcywgQ2VudHJvIGRlIFRlcmFwaWEgQ29tcG9ydGFtZW50YWwnLFxyXG4gICAgICAgIGJ1dHRvbkxhYmVsOiAnRXN0YWdpXHUwMEUxcmlvcyAtIEZhXHUwMEU3YUFtaWdvcywgQ2VudHJvIGRlIFRlcmFwaWEgQ29tcG9ydGFtZW50YWwnLFxyXG4gICAgICAgIGxvZ2luTGFiZWw6ICdFc3RhZ2lcdTAwRTFyaW8gLSBGYVx1MDBFN2FBbWlnb3MsIENlbnRybyBkZSBUZXJhcGlhIENvbXBvcnRhbWVudGFsJyxcclxuICAgICAgICBraW9za0VtYWlsOiAnY2xpbmljYWFAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgcHJvZmVzc2lvbmFsQnV0dG9uTGFiZWw6ICdQcm9maXNzaW9uYWlzIFBKIC0gRmFcdTAwRTdhQW1pZ29zLCBDZW50cm8gZGUgVGVyYXBpYSBDb21wb3J0YW1lbnRhbCcsXHJcbiAgICAgICAgcHJvZmVzc2lvbmFsS2lvc2tFbWFpbDogJ3BqLWNsaW5pY2FhQGdydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgICAgIGVtcGxveWVlQnV0dG9uTGFiZWw6ICdGdW5jaW9uXHUwMEUxcmlvcyBDTFQgLSBGYVx1MDBFN2FBbWlnb3MsIENlbnRybyBkZSBUZXJhcGlhIENvbXBvcnRhbWVudGFsJyxcclxuICAgICAgICBlbXBsb3llZUtpb3NrRW1haWw6ICdjbHQtY2xpbmljYWFAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgcmF6YW9Tb2NpYWw6ICdJTlNUSVRVVE8gRkFDQSBBTUlHT1MgTFREQScsXHJcbiAgICAgICAgY25wajogJzIyLjE2MS4xOTcvMDAwMS04MycsXHJcbiAgICAgICAgYWRkcmVzczogJ1IuIEJvYXZlbnR1cmEgZGEgU2lsdmEsIDE1NzMgLSBVbWFyaXphbCwgQmVsXHUwMEU5bSAtIFBBLCBDRVAgNjYuMDYwLTE0NycsXHJcbiAgICAgICAgcGhvbmU6ICcoOTEpIDgyNTAtMTIxNScsXHJcbiAgICAgICAgYWNjZW50OiAnYW1iZXInLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdjbGluaWNhLWInLFxyXG4gICAgICAgIG5hbWU6ICdDbFx1MDBFRG5pY2EgQicsXHJcbiAgICAgICAgYnV0dG9uTGFiZWw6ICdFc3RhZ2lcdTAwRTFyaW9zIC0gQ2xcdTAwRURuaWNhIEInLFxyXG4gICAgICAgIGxvZ2luTGFiZWw6ICdFc3RhZ2lcdTAwRTFyaW8gLSBDbFx1MDBFRG5pY2EgQicsXHJcbiAgICAgICAga2lvc2tFbWFpbDogJ2NsaW5pY2FiQGdydXBvaWIuaW50ZXJuYWwnLFxyXG4gICAgICAgIHByb2Zlc3Npb25hbEJ1dHRvbkxhYmVsOiAnUHJvZmlzc2lvbmFpcyBQSiAtIENsXHUwMEVEbmljYSBCJyxcclxuICAgICAgICBwcm9mZXNzaW9uYWxLaW9za0VtYWlsOiAncGotY2xpbmljYWJAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgZW1wbG95ZWVCdXR0b25MYWJlbDogJ0Z1bmNpb25cdTAwRTFyaW9zIENMVCAtIENsXHUwMEVEbmljYSBCJyxcclxuICAgICAgICBlbXBsb3llZUtpb3NrRW1haWw6ICdjbHQtY2xpbmljYWJAZ3J1cG9pYi5pbnRlcm5hbCcsXHJcbiAgICAgICAgcmF6YW9Tb2NpYWw6ICdDbFx1MDBFRG5pY2EgQiBTZXJ2aVx1MDBFN29zIGRlIFNhXHUwMEZBZGUgTFREQScsXHJcbiAgICAgICAgY25wajogJzAwLjAwMC4wMDAvMDAwMS0wNCcsXHJcbiAgICAgICAgYWRkcmVzczogJ0F2LiBDb25zZWxoZWlybyBGdXJ0YWRvLCAxNTAwIC0gQ3JlbWFcdTAwRTdcdTAwRTNvLCBCZWxcdTAwRTltIC0gUEEnLFxyXG4gICAgICAgIHBob25lOiAnKDkxKSA5OTExMS0xMDA0JyxcclxuICAgICAgICBhY2NlbnQ6ICdyb3NlJyxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDVVJSRU5UX1dPUktTUEFDRV9JRCA9XHJcbiAgKHR5cGVvZiBpbXBvcnQubWV0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1wb3J0Lm1ldGEuZW52ICYmIGltcG9ydC5tZXRhLmVudi5WSVRFX1dPUktTUEFDRV9JRCkgfHxcclxuICAncG9ydG8tdGVyYXBpYSc7XHJcblxyXG5leHBvcnQgY29uc3QgQlJBTkRJTkcgPSBXT1JLU1BBQ0VTW0NVUlJFTlRfV09SS1NQQUNFX0lEXSB8fCBXT1JLU1BBQ0VTWydwb3J0by10ZXJhcGlhJ107XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1csU0FBUyxjQUFjLGVBQWU7QUFDdFksT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTs7O0FDR2pCLElBQU0sYUFBYTtBQUFBLEVBQ3hCLGlCQUFpQjtBQUFBLElBQ2YsSUFBSTtBQUFBLElBQ0osVUFBVTtBQUFBLElBQ1YsV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLElBQ1osVUFBVTtBQUFBLElBQ1YsU0FBUztBQUFBO0FBQUEsSUFFVCxVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQTtBQUFBLElBR1AscUJBQXFCO0FBQUE7QUFBQTtBQUFBLElBR3JCLDJCQUEyQjtBQUFBO0FBQUE7QUFBQSxJQUczQix5QkFBeUI7QUFBQSxJQUN6QiwwQkFBMEI7QUFBQSxJQUMxQixvQkFBb0I7QUFBQSxNQUNsQixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0EsdUJBQ0U7QUFBQTtBQUFBO0FBQUEsSUFRRixrQ0FBa0M7QUFBQSxJQUNsQyw0QkFBNEI7QUFBQSxJQUM1Qix5QkFBeUI7QUFBQTtBQUFBO0FBQUEsSUFHekIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUE7QUFBQTtBQUFBLElBR3pCLDhCQUE4QjtBQUFBLElBQzlCLDRCQUE0QjtBQUFBLElBQzVCLGdCQUFnQjtBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFTQSx1QkFBdUI7QUFBQTtBQUFBO0FBQUEsSUFHdkIsc0JBQXNCO0FBQUEsSUFDdEIsWUFBWTtBQUFBLE1BQ1YsWUFBWSxFQUFFLE9BQU8sb0JBQW9CLE9BQU8sOEJBQThCO0FBQUEsTUFDOUUsVUFBVSxFQUFFLE9BQU8sWUFBWSxPQUFPLDRCQUE0QjtBQUFBLE1BQ2xFLE9BQU8sRUFBRSxPQUFPLFNBQVMsT0FBTyx5QkFBeUI7QUFBQSxNQUN6RCxVQUFVLEVBQUUsT0FBTyxZQUFZLE9BQU8sNEJBQTRCO0FBQUEsTUFDbEUsS0FBSyxFQUFFLE9BQU8sT0FBTyxPQUFPLHVCQUF1QjtBQUFBLElBQ3JEO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJQSxZQUFZO0FBQUEsTUFDVjtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtaLFVBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQTtBQUFBLElBRVQsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLYixzQkFBc0I7QUFBQSxNQUNwQixJQUFJO0FBQUEsTUFBVyxLQUFLO0FBQUEsTUFBVyxLQUFLO0FBQUEsTUFBVyxLQUFLO0FBQUEsTUFBVyxLQUFLO0FBQUEsTUFDcEUsS0FBSztBQUFBLE1BQVcsS0FBSztBQUFBLE1BQVcsS0FBSztBQUFBLE1BQVcsS0FBSztBQUFBLE1BQVcsS0FBSztBQUFBLE1BQVcsS0FBSztBQUFBLElBQ3ZGO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxxQkFBcUI7QUFBQSxJQUNyQiwyQkFBMkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUkzQix5QkFBeUI7QUFBQSxJQUN6QiwwQkFBMEI7QUFBQSxJQUMxQixvQkFBb0I7QUFBQSxNQUNsQixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0EsdUJBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBVUYsa0NBQWtDO0FBQUEsSUFDbEMsNEJBQTRCO0FBQUE7QUFBQTtBQUFBLElBRzVCLHlCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFXRix3QkFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLRixxQkFBcUI7QUFBQSxJQUNyQix5QkFBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU96Qiw4QkFBOEI7QUFBQSxJQUM5Qiw0QkFBNEI7QUFBQSxJQUM1QixnQkFBZ0I7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU0EsdUJBQXVCO0FBQUE7QUFBQTtBQUFBLElBR3ZCLHNCQUFzQjtBQUFBLElBQ3RCLFlBQVk7QUFBQSxNQUNWLE9BQU8sRUFBRSxPQUFPLFNBQVMsT0FBTyx5QkFBeUI7QUFBQSxJQUMzRDtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1Y7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLHlCQUF5QjtBQUFBLFFBQ3pCLHdCQUF3QjtBQUFBLFFBQ3hCLHFCQUFxQjtBQUFBLFFBQ3JCLG9CQUFvQjtBQUFBLFFBQ3BCLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1oseUJBQXlCO0FBQUEsUUFDekIsd0JBQXdCO0FBQUEsUUFDeEIscUJBQXFCO0FBQUEsUUFDckIsb0JBQW9CO0FBQUEsUUFDcEIsYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWix5QkFBeUI7QUFBQSxRQUN6Qix3QkFBd0I7QUFBQSxRQUN4QixxQkFBcUI7QUFBQSxRQUNyQixvQkFBb0I7QUFBQSxRQUNwQixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLHlCQUF5QjtBQUFBLFFBQ3pCLHdCQUF3QjtBQUFBLFFBQ3hCLHFCQUFxQjtBQUFBLFFBQ3JCLG9CQUFvQjtBQUFBLFFBQ3BCLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVPLElBQU0sdUJBQ1YsT0FBTyxnQkFBZ0IsZUFBZSxZQUFZLE9BQU8sWUFBWSxJQUFJLHFCQUMxRTtBQUVLLElBQU0sV0FBVyxXQUFXLG9CQUFvQixLQUFLLFdBQVcsZUFBZTs7O0FEaFN0RixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxXQUFXLFdBQVcsSUFBSSxpQkFBaUIsS0FBSyxXQUFXLGVBQWU7QUFFaEYsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFFBQ2QsWUFBWTtBQUFBLFVBQ1YsU0FBUztBQUFBLFFBQ1g7QUFBQTtBQUFBO0FBQUEsUUFHQSxlQUFlLENBQUMsYUFBYTtBQUFBLFFBQzdCLFNBQVM7QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLGNBQWM7QUFBQSxVQUNkLHVCQUF1QjtBQUFBLFVBQ3ZCLDBCQUEwQixDQUFDLGFBQWE7QUFBQSxVQUN4QywrQkFBK0I7QUFBQSxRQUNqQztBQUFBLFFBQ0EsVUFBVTtBQUFBLFVBQ1IsTUFBTSxTQUFTO0FBQUEsVUFDZixZQUFZLFNBQVM7QUFBQSxVQUNyQixhQUFhO0FBQUEsVUFDYixhQUFhLFNBQVM7QUFBQSxVQUN0QixrQkFBa0IsU0FBUztBQUFBLFVBQzNCLFNBQVM7QUFBQSxVQUNULE9BQU8sU0FBUyxXQUNaO0FBQUEsWUFDRSxFQUFFLEtBQUssU0FBUyxVQUFVLE9BQU8sV0FBVyxNQUFNLGFBQWE7QUFBQSxZQUMvRCxFQUFFLEtBQUssU0FBUyxVQUFVLE9BQU8sV0FBVyxNQUFNLGFBQWE7QUFBQSxVQUNqRSxJQUNBLENBQUM7QUFBQSxRQUNQO0FBQUEsTUFDRixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sbUJBQW1CLE1BQU07QUFDdkIsaUJBQU8sS0FDSixRQUFRLHNCQUFzQixVQUFVLFNBQVMsUUFBUSxVQUFVLEVBQ25FO0FBQUEsWUFDQztBQUFBLFlBQ0EscUNBQXFDLFNBQVMsVUFBVTtBQUFBLFVBQzFEO0FBQUEsUUFDSjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSUwsV0FBVyxTQUFTLGVBQWUsUUFBUTtBQUFBLE1BQzNDLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGNBQWM7QUFBQSxZQUNaLFVBQVUsQ0FBQyxVQUFVO0FBQUEsWUFDckIsUUFBUSxDQUFDLFNBQVMsYUFBYSxnQkFBZ0IsUUFBUSxRQUFRO0FBQUEsVUFDakU7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLGFBQWE7QUFBQSxNQUNiLFNBQVMsQ0FBQywrQkFBK0I7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
