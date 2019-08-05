import { newIntegerProperty } from 'metaed-core';
import { ColumnTransformUnchanged, ColumnTransformMakeNull } from '../../../src/model/database/ColumnTransform';
import { BuildStrategy, BuildStrategyDefault } from '../../../src/enhancer/table/BuildStrategy';

describe('when using default build strategy', (): void => {
  let strategy: BuildStrategy;

  beforeAll(() => {
    strategy = BuildStrategyDefault;
  });

  it('should return empty string when calling parent context', (): void => {
    expect(strategy.parentContext()).toBe('');
  });

  it('should return same column transform strategy when calling leaf columns', (): void => {
    expect(strategy.leafColumns(ColumnTransformUnchanged)).toBe(ColumnTransformUnchanged);
  });

  it('should use default column namer strategy', (): void => {
    const inlineContext = 'InlineContext';
    const roleName = 'roleName';
    const baseName = 'BaseName';
    expect(strategy.columnNamer(inlineContext, roleName, baseName)()).toBe(inlineContext + roleName + baseName);
  });

  it('should return true when calling build columns', (): void => {
    expect(strategy.buildColumns(newIntegerProperty())).toBe(true);
  });

  it('should return false when calling suppress primary key creation', (): void => {
    expect(strategy.suppressPrimaryKeyCreation()).toBe(false);
  });
});

describe('when composing default, append parent context, append inline context, column namer ignores role name, make leaf columns nullable, suppress primary key creation from properties build strategies', (): void => {
  const parentContext = 'ParentContext';
  const inlineContext = 'InlineContext';
  let strategy: BuildStrategy;

  beforeAll(() => {
    strategy = BuildStrategyDefault.appendParentContext(parentContext)
      .appendInlineContext(inlineContext)
      .columnNamerIgnoresroleName()
      .makeLeafColumnsNullable()
      .suppressPrimaryKeyCreationFromPropertiesStrategy();
  });

  it('should return parent context with inline context when calling parent context', (): void => {
    expect(strategy.parentContext()).toBe(parentContext + inlineContext);
  });

  it('should return make null column transform strategy when calling leaf columns', (): void => {
    expect(strategy.leafColumns(ColumnTransformUnchanged)).toBeInstanceOf(ColumnTransformMakeNull);
  });

  it('should use ignore role name column namer strategy', (): void => {
    const baseName = 'BaseName';
    expect(strategy.columnNamer(inlineContext, 'roleName', baseName)()).toBe(inlineContext + baseName);
  });

  it('should return true when calling build columns', (): void => {
    expect(strategy.buildColumns(newIntegerProperty())).toBe(true);
  });

  it('should return true when calling suppress primary key creation', (): void => {
    expect(strategy.suppressPrimaryKeyCreation()).toBe(true);
  });
});

describe('when using skip path build strategy with no eligible property paths', (): void => {
  let strategy: BuildStrategy;

  beforeAll(() => {
    strategy = BuildStrategyDefault.skipPath([]);
  });

  it('should return empty string when calling parent context', (): void => {
    expect(strategy.parentContext()).toBe('');
  });

  it('should return same column transform strategy when calling leaf columns', (): void => {
    expect(strategy.leafColumns(ColumnTransformUnchanged)).toBe(ColumnTransformUnchanged);
  });

  it('should use default column namer strategy', (): void => {
    const inlineContext = 'InlineContext';
    const roleName = 'roleName';
    const baseName = 'BaseName';
    expect(strategy.columnNamer(inlineContext, roleName, baseName)()).toBe(inlineContext + roleName + baseName);
  });

  it('should return true when calling build columns', (): void => {
    expect(strategy.buildColumns(newIntegerProperty())).toBe(true);
  });

  it('should return false when calling suppress primary key creation', (): void => {
    expect(strategy.suppressPrimaryKeyCreation()).toBe(false);
  });
});

describe('when composing skip path with no eligible property paths, append parent context, append inline context, column namer ignores role name, make leaf columns nullable, suppress primary key creation from properties build strategies', (): void => {
  const parentContext = 'ParentContext';
  const inlineContext = 'InlineContext';
  let strategy: BuildStrategy;

  beforeAll(() => {
    strategy = BuildStrategyDefault.skipPath([])
      .appendParentContext(parentContext)
      .appendInlineContext(inlineContext)
      .columnNamerIgnoresroleName()
      .makeLeafColumnsNullable()
      .suppressPrimaryKeyCreationFromPropertiesStrategy();
  });

  it('should return parent context with inline context when calling parent context', (): void => {
    expect(strategy.parentContext()).toBe(parentContext + inlineContext);
  });

  it('should return make null column transform strategy when calling leaf columns', (): void => {
    expect(strategy.leafColumns(ColumnTransformUnchanged)).toBeInstanceOf(ColumnTransformMakeNull);
  });

  it('should use ignore role name column namer strategy', (): void => {
    const baseName = 'BaseName';
    expect(strategy.columnNamer(inlineContext, 'roleName', baseName)()).toBe(inlineContext + baseName);
  });

  it('should return true when calling build columns', (): void => {
    expect(strategy.buildColumns(newIntegerProperty())).toBe(true);
  });

  it('should return true when calling suppress primary key creation', (): void => {
    expect(strategy.suppressPrimaryKeyCreation()).toBe(true);
  });
});

describe('when composing skip path with eligible property paths, append parent context, append inline context, column namer ignores role name, make leaf columns nullable, suppress primary key creation from properties build strategies', (): void => {
  const integerPropertyPathName = 'IntegerPropertyPathName';
  const parentContext = 'ParentContext';
  const inlineContext = 'InlineContext';
  let strategy: BuildStrategy;

  beforeAll(() => {
    strategy = BuildStrategyDefault.skipPath([[integerPropertyPathName]])
      .appendParentContext(parentContext)
      .appendInlineContext(inlineContext)
      .columnNamerIgnoresroleName()
      .makeLeafColumnsNullable()
      .suppressPrimaryKeyCreationFromPropertiesStrategy();
  });

  it('should return parent context with inline context when calling parent context', (): void => {
    expect(strategy.parentContext()).toBe(parentContext + inlineContext);
  });

  it('should return make null column transform strategy when calling leaf columns', (): void => {
    expect(strategy.leafColumns(ColumnTransformUnchanged)).toBeInstanceOf(ColumnTransformMakeNull);
  });

  it('should use ignore role name column namer strategy', (): void => {
    const baseName = 'BaseName';
    expect(strategy.columnNamer(inlineContext, 'roleName', baseName)()).toBe(inlineContext + baseName);
  });

  it('should return true when calling build columns', (): void => {
    // NOTE: This would be false if the skip path decorator wasn't removing itself from the decorator chain. see SkipPathStrategy class in BuildStrategy
    const integerProperty = Object.assign(newIntegerProperty(), { fullPropertyName: integerPropertyPathName });
    expect(strategy.buildColumns(integerProperty)).toBe(true);
  });

  it('should return true when calling suppress primary key creation', (): void => {
    expect(strategy.suppressPrimaryKeyCreation()).toBe(true);
  });
});

describe('when composing skip path with eligible property paths, append parent context, append inline context, column namer ignores role name, make leaf columns nullable, suppress primary key creation from properties build strategies', (): void => {
  const integerPropertyPathName = 'IntegerPropertyPathName';
  const parentContext = 'ParentContext';
  const inlineContext = 'InlineContext';
  let strategy: BuildStrategy;

  beforeAll(() => {
    strategy = BuildStrategyDefault.skipPath([[integerPropertyPathName, 'PropertyName']])
      .appendParentContext(parentContext)
      .appendInlineContext(inlineContext)
      .columnNamerIgnoresroleName()
      .makeLeafColumnsNullable()
      .suppressPrimaryKeyCreationFromPropertiesStrategy();
  });

  it('should return parent context with inline context when calling parent context', (): void => {
    expect(strategy.parentContext()).toBe(parentContext + inlineContext);
  });

  it('should return make null column transform strategy when calling leaf columns', (): void => {
    expect(strategy.leafColumns(ColumnTransformUnchanged)).toBeInstanceOf(ColumnTransformMakeNull);
  });

  it('should use ignore role name column namer strategy', (): void => {
    const baseName = 'BaseName';
    expect(strategy.columnNamer(inlineContext, 'roleName', baseName)()).toBe(inlineContext + baseName);
  });

  it('should return true when calling build columns', (): void => {
    const integerProperty = Object.assign(newIntegerProperty(), { fullPropertyName: integerPropertyPathName });
    expect(strategy.buildColumns(integerProperty)).toBe(true);
  });

  it('should return true when calling suppress primary key creation', (): void => {
    expect(strategy.suppressPrimaryKeyCreation()).toBe(true);
  });
});
