# 🧪 Testes Automatizados -- WebDojo (Cypress)

## 📌 Sobre o Projeto

Este projeto contém os testes automatizados End-to-End (E2E) da
aplicação **WebDojo**, utilizando o framework **Cypress**.

A aplicação WebDojo está no mesmo repositório e deve estar em execução
para que os testes sejam executados corretamente.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   Cypress
-   Node.js
-   JavaScript

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

``` bash
web/
 └── cypress/
     ├── e2e/                # Testes end-to-end
     ├── fixtures/           # Massa de dados estática
     │   ├── cep.json
     │   ├── consultancy.json
     │   └── lorem-ipsum.pdf
     ├── screenshots/        # Evidências geradas automaticamente
     └── support/
         ├── actions/        # Arquivos com actions customizadas
         │   └── consultancy.actions.js
         ├── commands.js     # Custom commands do Cypress
         ├── e2e.js          # Configuração global dos testes
         └── utils.js        # Funções utilitárias
```

------------------------------------------------------------------------

## ⚙️ Pré-requisitos

Antes de executar os testes, é necessário:

-   Node.js instalado
-   Dependências instaladas:

``` bash
npm install
```

------------------------------------------------------------------------

## ▶️ Executando a Aplicação WebDojo

A aplicação WebDojo precisa estar rodando para que os testes sejam
executados.

``` bash
npm run dev
```

A aplicação será iniciada na porta:

    http://localhost:3000

------------------------------------------------------------------------

## 🧪 Executando os Testes

### 🔹 Executar todos os testes (modo headless)

``` bash
npm run test
```

Equivalente a:

``` bash
npx cypress run
```

------------------------------------------------------------------------

### 🔹 Executar testes com interface gráfica

``` bash
npm run test:ui
```

Equivalente a:

``` bash
npx cypress open
```

------------------------------------------------------------------------

### 🔹 Executar apenas o teste de login

``` bash
npm run test:login
```

Equivalente a:

``` bash
npx cypress run --spec cypress/e2e/login.cy.js
```

------------------------------------------------------------------------

### 🔹 Executar teste de login simulando dispositivo mobile

``` bash
npm run test:login-mobile
```

Equivalente a:

``` bash
npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth: 414,viewportHeight: 896
```

------------------------------------------------------------------------

## 📊 Estratégia de Testes

O projeto segue as seguintes boas práticas:

-   Separação de responsabilidades (actions, utils, commands)
-   Utilização de fixtures para massa de dados
-   Custom commands para reutilização de código
-   Testes organizados por funcionalidade
-   Execução específica por spec quando necessário

------------------------------------------------------------------------

## 📁 Fixtures

Os arquivos dentro da pasta `fixtures` são utilizados como massa de
dados estática para os testes:

-   `cep.json` → Dados de CEP para testes de endereço
-   `consultancy.json` → Dados de cadastro de consultoria
-   `lorem-ipsum.pdf` → Arquivo utilizado para testes de upload

------------------------------------------------------------------------

## 🔁 Custom Commands

Os comandos customizados estão definidos em:

``` bash
cypress/support/commands.js
```

Eles permitem abstrair ações repetitivas como:

-   Login
-   Preenchimento de formulários
-   Navegação entre páginas
-   Interações comuns

------------------------------------------------------------------------

## 📸 Evidências

Em caso de falha, o Cypress gera automaticamente:

-   Screenshots → `cypress/screenshots/`

------------------------------------------------------------------------

## 🛠 Manutenção dos Testes

Para manter o projeto saudável:

-   Evitar seletores frágeis (preferir `data-testid`)
-   Centralizar regras de negócio nas actions
-   Atualizar fixtures conforme mudanças da aplicação
-   Revisar testes sempre que houver alteração de layout

------------------------------------------------------------------------

## 👨‍💻 Autor

Projeto de automação desenvolvido para a aplicação **WebDojo**
utilizando Cypress.
