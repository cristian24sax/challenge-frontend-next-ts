import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import configNext from 'eslint-config-next';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Aplica configuración a los archivos de tu proyecto
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      // Configura el parser de TypeScript
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
    },
    rules: {
      // Reglas específicas de TypeScript
      ...tseslint.configs.recommended.rules,

      // Reglas específicas de React
      ...pluginReact.configs.recommended.rules,

      // Reglas adicionales para el proyecto
      'react/react-in-jsx-scope': 'off', // No necesitas importar React en JSX
      'no-unused-vars': 'warn', // Advertencia para variables no usadas
      'no-console': 'warn', // Advertencia para `console.log`
    },
  },
  // Configuración específica para Next.js
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...configNext({ appDir: true }),
  },
];
