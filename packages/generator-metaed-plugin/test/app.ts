const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-metaed-plugin:app', (): void => {
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app')).withPrompts({ someAnswer: true }));

  it('creates files', (): void => {
    assert.file(['dummyfile.txt']);
  });
});
