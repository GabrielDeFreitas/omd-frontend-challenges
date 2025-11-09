import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist', 'build', 'coverage', 'node_modules'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-sort-props': ['warn', { shorthandFirst: true, noSortAlphabetically: false }],
      'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

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
  ...storybook.configs['flat/recommended'],
]
