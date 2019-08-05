import { newIntegerColumn } from '../../../src/model/database/Column';
import {
  ColumnTransform,
  ColumnTransformUnchanged,
  ColumnTransformPrimaryKey,
  ColumnTransformNotNull,
  ColumnTransformNull,
} from '../../../src/model/database/ColumnTransform';
import { Column } from '../../../src/model/database/Column';

describe('when using default column transform strategy', (): void => {
  const columns: Column[] = [];

  beforeAll(() => {
    columns.push(
      ...ColumnTransformUnchanged.transform([
        Object.assign(newIntegerColumn(), { name: 'PrimaryKey', isPartOfPrimaryKey: true, isNullable: false }),
        Object.assign(newIntegerColumn(), { name: 'NotNull', isPartOfPrimaryKey: false, isNullable: false }),
        Object.assign(newIntegerColumn(), { name: 'Null', isPartOfPrimaryKey: false, isNullable: true }),
      ]),
    );
  });

  it('should not change primary key column', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(true);
    expect(columns[0].isNullable).toBe(false);
  });

  it('should not change not null column', (): void => {
    expect(columns[1].isPartOfPrimaryKey).toBe(false);
    expect(columns[1].isNullable).toBe(false);
  });

  it('should not change null column', (): void => {
    expect(columns[2].isPartOfPrimaryKey).toBe(false);
    expect(columns[2].isNullable).toBe(true);
  });
});

describe('when using primary key column transform strategy', (): void => {
  const columns: Column[] = [];

  beforeAll(() => {
    columns.push(
      ...ColumnTransformPrimaryKey.transform([
        Object.assign(newIntegerColumn(), { name: 'Null', isPartOfPrimaryKey: false, isNullable: true }),
      ]),
    );
  });

  it('should convert column to primary key', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(true);
    expect(columns[0].isNullable).toBe(false);
  });
});

describe('when using not null column transform strategy', (): void => {
  const columns: Column[] = [];

  beforeAll(() => {
    columns.push(
      ...ColumnTransformNotNull.transform([
        Object.assign(newIntegerColumn(), { name: 'PrimaryKey', isPartOfPrimaryKey: true, isNullable: false }),
        Object.assign(newIntegerColumn(), { name: 'Null', isPartOfPrimaryKey: false, isNullable: true }),
      ]),
    );
  });

  it('should convert primary key column to not null', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(false);
    expect(columns[0].isNullable).toBe(false);
  });

  it('should convert null column to not null', (): void => {
    expect(columns[1].isPartOfPrimaryKey).toBe(false);
    expect(columns[1].isNullable).toBe(false);
  });
});

describe('when using null column transform strategy', (): void => {
  const columns: Column[] = [];

  beforeAll(() => {
    columns.push(
      ...ColumnTransformNull.transform([
        Object.assign(newIntegerColumn(), { name: 'PrimaryKey', isPartOfPrimaryKey: true, isNullable: false }),
      ]),
    );
  });

  it('should convert column to nullable', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(false);
    expect(columns[0].isNullable).toBe(true);
  });
});

describe('when using role name column transform strategy', (): void => {
  const columns: Column[] = [];
  const primaryKeyName = 'PrimaryKeyName';
  const notNullName = 'NotNullName';
  const nullName = 'NullName';
  const contextName = 'ContextName';

  beforeAll(() => {
    columns.push(
      ...ColumnTransform.roleName(contextName).transform([
        Object.assign(newIntegerColumn(), { name: primaryKeyName, isPartOfPrimaryKey: true, isNullable: false }),
        Object.assign(newIntegerColumn(), { name: notNullName, isPartOfPrimaryKey: false, isNullable: false }),
        Object.assign(newIntegerColumn(), { name: nullName, isPartOfPrimaryKey: false, isNullable: true }),
      ]),
    );
  });

  it('should not change primary key column', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(true);
    expect(columns[0].isNullable).toBe(false);
  });

  it('should prefix primary key column name role name', (): void => {
    expect(columns[0].name).toBe(contextName + primaryKeyName);
  });

  it('should not change not null column', (): void => {
    expect(columns[1].isPartOfPrimaryKey).toBe(false);
    expect(columns[1].isNullable).toBe(false);
  });

  it('should prefix not null column name role name', (): void => {
    expect(columns[1].name).toBe(contextName + notNullName);
  });

  it('should not change null column', (): void => {
    expect(columns[2].isPartOfPrimaryKey).toBe(false);
    expect(columns[2].isNullable).toBe(true);
  });

  it('should prefix null column name role name', (): void => {
    expect(columns[2].name).toBe(contextName + nullName);
  });
});

describe('when using primary key role name column transform strategy', (): void => {
  const columns: Column[] = [];
  const nullName = 'NullName';
  const contextName = 'ContextName';

  beforeAll(() => {
    columns.push(
      ...ColumnTransform.primaryKeyroleName(contextName).transform([
        Object.assign(newIntegerColumn(), { name: nullName, isPartOfPrimaryKey: false, isNullable: true }),
      ]),
    );
  });

  it('should convert column to primary key', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(true);
    expect(columns[0].isNullable).toBe(false);
  });

  it('should prefix column name role name', (): void => {
    expect(columns[0].name).toBe(contextName + nullName);
  });
});

describe('when using not null role name column transform strategy', (): void => {
  const columns: Column[] = [];
  const primaryKeyName = 'PrimaryKeyName';
  const nullName = 'NullName';
  const contextName = 'ContextName';

  beforeAll(() => {
    columns.push(
      ...ColumnTransform.notNullroleName(contextName).transform([
        Object.assign(newIntegerColumn(), { name: primaryKeyName, isPartOfPrimaryKey: true, isNullable: false }),
        Object.assign(newIntegerColumn(), { name: nullName, isPartOfPrimaryKey: false, isNullable: true }),
      ]),
    );
  });

  it('should convert primary key column to not nullable', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(false);
    expect(columns[0].isNullable).toBe(false);
  });

  it('should prefix primary key column name role name', (): void => {
    expect(columns[0].name).toBe(contextName + primaryKeyName);
  });

  it('should convert null column to not nullable', (): void => {
    expect(columns[1].isPartOfPrimaryKey).toBe(false);
    expect(columns[1].isNullable).toBe(false);
  });

  it('should prefix null column name role name', (): void => {
    expect(columns[1].name).toBe(contextName + nullName);
  });
});

describe('when using null role name column transform strategy', (): void => {
  const columns: Column[] = [];
  const primaryKeyName = 'PrimaryKeyName';
  const contextName = 'ContextName';

  beforeAll(() => {
    columns.push(
      ...ColumnTransform.nullroleName(contextName).transform([
        Object.assign(newIntegerColumn(), { name: primaryKeyName, isPartOfPrimaryKey: true, isNullable: false }),
      ]),
    );
  });

  it('should convert primary key column to nullable', (): void => {
    expect(columns[0].isPartOfPrimaryKey).toBe(false);
    expect(columns[0].isNullable).toBe(true);
  });

  it('should prefix primary key column name role name', (): void => {
    expect(columns[0].name).toBe(contextName + primaryKeyName);
  });
});

describe('when using primary key role name collapsible column transform strategy', (): void => {
  const columns: Column[] = [];
  const primaryKeyName = 'PrimaryKeyName';
  const contextName = 'ContextName';

  beforeAll(() => {
    columns.push(
      ...ColumnTransform.primaryKeyroleNameCollapsible(contextName).transform([
        Object.assign(newIntegerColumn(), { name: primaryKeyName, isPartOfPrimaryKey: true, isNullable: false }),
      ]),
    );
  });

  it('should prefix primary key column name role name', (): void => {
    expect(columns[0].name).toBe(contextName + primaryKeyName);
  });
});
