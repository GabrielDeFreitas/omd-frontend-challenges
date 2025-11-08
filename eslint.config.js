import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default [
  // Ignores globais
  {
    ignores: ['dist', 'build', 'coverage', 'node_modules'],
  },

  // Configuração base do JavaScript
  js.configs.recommended,

  // Configurações do TypeScript
  ...tseslint.configs.recommended,

  // Configuração principal
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      prettier,
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
    },
    rules: {
      // ⚙️ Base
      'no-unused-vars': 'off', // Desativa regra JS base
      '@typescript-eslint/no-unused-vars': 'warn', // Usa a do TS
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // ⚛️ React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-sort-props': ['warn', { shorthandFirst: true, noSortAlphabetically: false }],
      'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],

      // 🪝 Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 🔄 React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // 💅 Prettier
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 100,
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: 'avoid',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
