export default function (plop) {
  plop.setGenerator('app-generator', {
    description: 'Generate a component or a page',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What do you want to generate?',
        choices: ['component', 'page'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name:',
      },
    ],
    actions: function (data) {
      const actions = []

      if (data.type === 'component') {
        actions.push(
          {
            type: 'add',
            path: '../src/components/{{kebabCase name}}/index.tsx',
            templateFile: 'templates/components/index.tsx.hbs',
          },
          {
            type: 'add',
            path: '../src/components/{{kebabCase name}}/types.ts',
            templateFile: 'templates/components/types.ts.hbs',
          },
          {
            type: 'append',
            path: '../src/components/index.ts',
            template: "export * from './{{kebabCase name}}'",
          }
        )
      }

      if (data.type === 'page') {
        actions.push(
          {
            type: 'add',
            path: '../src/pages/{{kebabCase name}}/controller/{{kebabCase name}}.controller.tsx',
            templateFile: 'templates/pages/controller.tsx.hbs',
          },
          {
            type: 'add',
            path: '../src/pages/{{kebabCase name}}/view/{{kebabCase name}}.view.tsx',
            templateFile: 'templates/pages/view.tsx.hbs',
          },
          {
            type: 'add',
            path: '../src/pages/{{kebabCase name}}/types.ts',
            templateFile: 'templates/pages/types.ts.hbs',
          },
          {
            type: 'add',
            path: '../src/pages/{{kebabCase name}}/index.page.ts',
            templateFile: 'templates/pages/index.ts.hbs',
          }
        )
      }

      return actions
    },
  })
}
