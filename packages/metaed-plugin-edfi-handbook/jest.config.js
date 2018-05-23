module.exports = {
  testResultsProcessor: 'jest-teamcity-reporter',
  testEnvironment: 'node',
  transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*metaed-.*).*$'],
  modulePathIgnorePatterns: ['dist*'],
};
