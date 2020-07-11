module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'pages/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'context/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!pages/**/__tests__/*.{js,jsx,ts,tsx}',
    '!components/**/__tests__/*.{js,jsx,ts,tsx}',
    '!hooks/**/__tests__/*.{js,jsx,ts,tsx}',
    '!context/**/__tests__/*.{js,jsx,ts,tsx}',
    '!utils/**/__tests__/*.{js,jsx,ts,tsx}',
  ],
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json',
      babelConfig: true,
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testMatch: ['**/*.(test|spec).(js|jsx|ts|tsx)'],
};
