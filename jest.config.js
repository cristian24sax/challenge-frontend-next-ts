const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Indica la raíz del proyecto
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Archivo de configuración adicional
  moduleNameMapper: {
    // Mapear alias utilizados en `tsconfig.json` o `next.config.js`
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

module.exports = createJestConfig(customJestConfig);
