import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.tsx',
    supportFile: false,
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: false,
  },
})
