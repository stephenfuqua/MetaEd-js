module.exports = {
  testEnvironment: 'node',
  transformIgnorePatterns: [
    '<rootDir>.*(node_modules)(?!.*metaed-.*).*$',
  ],
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  modulePathIgnorePatterns: [
    'dist*',
  ],
};
