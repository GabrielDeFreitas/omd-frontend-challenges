# OMD Frontend Challenges

## Instalação e Execução

Substitua `pnpm` pelo gerenciador de pacotes de sua preferência (`npm` ou `yarn`).

| Command        | Action                                                        |
| :------------- | :------------------------------------------------------------ |
| `pnpm install` | Instala todas as dependências do projeto.                     |
| `pnpm dev`     | Inicia o servidor de desenvolvimento em `localhost:3000`      |
| `pnpm build`   | Gera a versão de produção na pasta `./dist/`                  |
| `pnpm preview` | Pré-visualiza localmente a build de produção antes do deploy. |

## Lint e Formatação

| Command         | Action                                                                |
| :-------------- | :-------------------------------------------------------------------- |
| `pnpm lint`     | Executa o ESLint para verificar a qualidade e o padrão do código.     |
| `pnpm lint:fix` | Executa o ESLint e corrige automaticamente problemas quando possível. |

## Testes

| Command        | Action                                                        |
| :------------- | :------------------------------------------------------------ |
| `pnpm cy:open` | Abre o Cypress em modo interativo para testes de componentes. |
| `pnpm cy:run`  | Executa testes de componentes no Cypress em modo headless.    |

## Storybook

| Command                | Action                                                                       |
| :--------------------- | :--------------------------------------------------------------------------- |
| `pnpm storybook`       | Inicia o servidor de desenvolvimento do Storybook na porta `localhost:6006`. |
| `pnpm build-storybook` | Gera os arquivos estáticos do Storybook para deploy.`localhost:3000`         |

## Automação com Plop.js

| Command         | Action                                               |
| :-------------- | :--------------------------------------------------- |
| `pnpm generate` | Executa o Plop.js para gerar componentes ou páginas. |
