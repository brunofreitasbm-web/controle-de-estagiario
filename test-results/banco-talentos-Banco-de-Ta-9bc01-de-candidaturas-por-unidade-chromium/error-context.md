# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: banco-talentos.spec.js >> Banco de Talentos - Separação por Unidade >> deve renderizar filtros e visão de candidaturas por unidade
- Location: e2e\banco-talentos.spec.js:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('th').filter({ hasText: 'Unidade Pretendida' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('th').filter({ hasText: 'Unidade Pretendida' }) with timeout 5000ms
  - waiting for locator('th').filter({ hasText: 'Unidade Pretendida' })

```

```yaml
- img "Símbolo FaçaAmigos"
- heading "FaçaAmigos" [level=1]
- paragraph: Gestão de Pessoas v1.1.0
- img
- text: 10:15
- paragraph: quinta-feira, 29 de outubro
- heading "Quem está acessando?" [level=3]
- button "Registrar ponto para Estagiários. Requer Biometria e GPS":
  - img
  - heading "Estagiários" [level=4]
  - paragraph: Registro de ponto (Biometria + GPS)
- button "Registrar presença para Profissionais PJ. Requer PIN de 6 dígitos":
  - img
  - heading "Profissionais PJ" [level=4]
  - paragraph: Registro de presença por PIN de 6 dígitos
- button "Registrar ponto para Funcionários CLT. Requer Biometria, GPS e NSR":
  - img
  - heading "Funcionários CLT" [level=4]
  - paragraph: Registro de ponto (Biometria + GPS + NSR)
- button "Acessar Central de Freelancers (Cadastro Obrigatório e Gestão de OS)":
  - img
  - heading "Freelancer (Trabalhos Pontuais)" [level=4]
  - text: Sem Login
  - paragraph: Cadastro Obrigatório & Controle Presencial de OS por Escopo
- button "Upload de Folha de Pagamento para o Contador sem login":
  - img
  - heading "Upload de Folha de Pagamento" [level=4]
  - text: Sem Login
  - paragraph: Envio mensal de documentos para FaçaAmigos (PDF, Excel, CSV)
- button "Acesso Administrativo ao Painel, Cadastros e Relatórios. Requer Senha":
  - img
  - heading "Acesso Administrativo" [level=4]
  - paragraph: Painel administrativo, cadastros e relatórios (Exige Senha)
- paragraph: FaçaAmigos • Controle de Frequência
- paragraph: Como alternativa para sua conveniência, é opcional e autorizado o uso de seu aparelho celular pessoal, sem qualquer obrigatoriedade
- region "Notifications alt+T"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Banco de Talentos - Separação por Unidade', () => {
  4  |   test('deve renderizar filtros e visão de candidaturas por unidade', async ({ page }) => {
  5  |     // Mock das chamadas de autenticação e dados do banco de talentos
  6  |     await page.route('**/functions/v1/fetch-talent-bank*', async (route) => {
  7  |       await route.fulfill({
  8  |         status: 200,
  9  |         contentType: 'application/json',
  10 |         body: JSON.stringify({
  11 |           total: 2,
  12 |           candidates: [
  13 |             {
  14 |               id: 'cand-1',
  15 |               full_name: 'Mariana Silva',
  16 |               email: 'mariana.silva@exemplo.com',
  17 |               phone: '91988881111',
  18 |               course: 'Psicologia',
  19 |               desired_area: 'Psicologia / Aplicador(a) ABA',
  20 |               opportunity_type: 'ESTAGIO',
  21 |               preferred_unit: 'PARQUE_SHOPPING',
  22 |               status: 'NOVO',
  23 |               created_at_ms: Date.now() - 3600000,
  24 |             },
  25 |             {
  26 |               id: 'cand-2',
  27 |               full_name: 'Carlos Oliveira',
  28 |               email: 'carlos.oliveira@exemplo.com',
  29 |               phone: '91988882222',
  30 |               course: 'Terapia Ocupacional',
  31 |               desired_area: 'Terapia Ocupacional',
  32 |               opportunity_type: 'PJ',
  33 |               preferred_unit: 'BOSQUE_GRAO_PARA',
  34 |               status: 'LIDO',
  35 |               created_at_ms: Date.now() - 7200000,
  36 |             }
  37 |           ]
  38 |         }),
  39 |       });
  40 |     });
  41 | 
  42 |     await page.route('**/rest/v1/talent_candidates_meta*', async (route) => {
  43 |       await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  44 |     });
  45 |     await page.route('**/rest/v1/talent_disc_tokens*', async (route) => {
  46 |       await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  47 |     });
  48 |     await page.route('**/rest/v1/talent_disc_assessments*', async (route) => {
  49 |       await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  50 |     });
  51 |     await page.route('**/rest/v1/talent_basket_assignments*', async (route) => {
  52 |       await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  53 |     });
  54 |     await page.route('**/rest/v1/freelancers*', async (route) => {
  55 |       await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  56 |     });
  57 | 
  58 |     // Injeta sessão de supervisor no localStorage
  59 |     await page.addInitScript(() => {
  60 |       localStorage.setItem('adminKey', 'bruno');
  61 |       localStorage.setItem('adminLoggedIn', 'true');
  62 |       localStorage.setItem('activeAdminTab', 'banco_talentos');
  63 |     });
  64 | 
  65 |     await page.goto('/');
  66 | 
  67 |     // Se estiver na tela de login, entra como bruno
  68 |     const loginInput = page.locator('input[placeholder*="nome ou e-mail"]');
  69 |     if (await loginInput.isVisible()) {
  70 |       await loginInput.fill('bruno');
  71 |       await page.keyboard.press('Enter');
  72 |     }
  73 | 
  74 |     // Navega para a aba Banco de Talentos caso não esteja ativa
  75 |     const talentTabBtn = page.getByRole('button', { name: /Banco de Talentos/i }).first();
  76 |     if (await talentTabBtn.isVisible()) {
  77 |       await talentTabBtn.click();
  78 |     }
  79 | 
  80 |     // 1. Verifica coluna 'Unidade Pretendida' no cabeçalho da tabela
> 81 |     await expect(page.locator('th', { hasText: 'Unidade Pretendida' })).toBeVisible();
     |                                                                         ^ Error: expect(locator).toBeVisible() failed
  82 | 
  83 |     // 2. Verifica a barra de filtro de unidade com botão 'Parque Shopping'
  84 |     const parqueBtn = page.locator('button', { hasText: 'Parque Shopping' }).first();
  85 |     await expect(parqueBtn).toBeVisible();
  86 | 
  87 |     // 3. Testa a sub-aba 'Candidaturas por Unidade'
  88 |     const unitSubTabBtn = page.getByRole('button', { name: /Candidaturas por Unidade/i });
  89 |     await expect(unitSubTabBtn).toBeVisible();
  90 |     await unitSubTabBtn.click();
  91 | 
  92 |     // 4. Verifica a distribuição por unidade
  93 |     await expect(page.getByText('Distribuição de Candidaturas por Unidade')).toBeVisible();
  94 |     await expect(page.getByText('FaçaAmigos Parque Shopping').first()).toBeVisible();
  95 |     await expect(page.getByText('FaçaAmigos Bosque Grão-Pará').first()).toBeVisible();
  96 |   });
  97 | });
  98 | 
```