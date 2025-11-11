# OMD Frontend Challenges

Este projeto foi desenvolvido como parte de um desafio de frontend, utilizando tecnologias modernas para criar uma aplicação responsiva e eficiente:

- **Vite**: Ferramenta de build rápida e moderna.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Tailwind CSS**: Framework de CSS utilitário para criação de layouts responsivos.
- **Husky (pre-commit)**: Automatiza verificações antes de cada commit (como lint e testes) para manter a integridade do código.
- **React Query**: Gerenciamento de estado assíncrono e cache de dados.
- **Lucide React**: Ícones modernos e personalizáveis para React.
- **React Router v7**: Gerenciamento de rotas e navegação entre páginas.
- **Axios**: Cliente HTTP para consumo de APIs REST.
- **Shadcn.UI**: Biblioteca de componentes reutilizáveis construída com Tailwind CSS e Radix UI, garantindo acessibilidade e design consistente.
- **Storybook**: Ambiente isolado para desenvolvimento, documentação e visualização de componentes de
- **Cypress**: Framework de testes automatizados voltado para validação de componentes e interações da interface.
- **Eslint e Prettier**: Ferramenta rápida de linting e formatação de código.
- **Plop.js**: Gerador de código automatizado para componentes, páginas e hooks.

## Arquitetura do Projeto

Cada página principal da aplicação está organizada no padrão Model–View:

```
src/pages/
 └── customer-list/
      ├── controller/     # Model: lógica de negócios, hooks, chamadas à API e gerenciamento de estado
      ├── view/           # View: componentes de interface e layout específicos da página
      └── types/          # Tipagens TypeScript da página
```

- Model (Controller) → Contém toda a lógica e comunicação com serviços, APIs e hooks.
- View → Responsável pela renderização da interface e apresentação dos dados.
- Types → Mantém tipagens específicas da página, garantindo segurança e consistência.

Essa separação garante que a lógica de negócio fique isolada da camada de apresentação, facilitando refatorações

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

## Visualizar o Projeto

Você pode visualizar o projeto em produção no seguinte link:

[Visualizar Projeto](https://omd-frontend-challenges.vercel.app/)
