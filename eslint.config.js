import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import cypressPlugin from 'eslint-plugin-cypress';
import typeScriptEsLintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { fileURLToPath } from 'url';
import path from 'path';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import noOnlyTests from 'eslint-plugin-no-only-tests';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  js.configs.recommended,

  {
    ignores: ['**/*.config.*', 'node_modules/', 'dist/', 'build/', 'coverage/', 'eslint.config.js', 'eslint.config.ts', 'next.config.ts'],
  },

  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),

  {
    plugins: {
      '@typescript-eslint': typeScriptEsLintPlugin,
      cypress: cypressPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'chai-friendly': chaiFriendly,
      'no-only-tests': noOnlyTests,
    },

    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-empty-interface': ['error'],

      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

    //   'no-console': ['error', { allow: ['warn', 'error'] }],
      camelcase: ['error', { ignoreDestructuring: true }],

      'no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
      'no-only-tests/no-only-tests': 'error',

      ...cypressPlugin.configs.recommended.rules,
    },
  },

  {
    files: ['cypress/**/*.{js,ts,jsx,tsx}'],
    rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
  },
]);
