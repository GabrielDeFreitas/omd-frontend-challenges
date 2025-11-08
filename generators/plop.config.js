export default function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{kebabCase name}}/index.tsx',
        templateFile: 'templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{kebabCase name}}/types.ts',
        templateFile: 'templates/types.ts.hbs',
      },
      {
        type: 'append',
        path: '../src/components/index.ts',
        template: "export * from './{{kebabCase name}}'",
      },
    ],
  })
}
