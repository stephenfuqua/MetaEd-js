import {
  ForeignKeyStrategy,
  ForeignKeyStrategyDefault,
  ForeignKeyStrategyDeleteCascade,
  ForeignKeyStrategyUpdateCascade,
  ForeignKeyStrategyUpdateDeleteCascade,
} from '../../../src/model/database/ForeignKeyStrategy';
import { newIntegerColumn } from '../../../src/model/database/Column';
import { Column } from '../../../src/model/database/Column';

describe('when using default foreign kay strategy', (): void => {
  const integerColumnName = 'IntegerColumnName';
  let strategy: ForeignKeyStrategy;
  let column: Column;

  beforeAll(() => {
    strategy = ForeignKeyStrategyDefault;
    column = Object.assign(newIntegerColumn(), { name: integerColumnName });
  });

  it('should not have delete cascade', (): void => {
    expect(strategy.hasDeleteCascade()).toBe(false);
  });

  it('should not have delete cascade', (): void => {
    expect(strategy.hasUpdateCascade()).toBe(false);
  });

  it('should have parent column name', (): void => {
    expect(strategy.parentColumnName(column)).toBe(integerColumnName);
  });

  it('should have foreign column name', (): void => {
    expect(strategy.foreignColumnName(column)).toBe(integerColumnName);
  });
});

describe('when using delete cascade foreign key strategy', (): void => {
  const integerColumnName = 'IntegerColumnName';
  let strategy: ForeignKeyStrategy;
  let column: Column;

  beforeAll(() => {
    strategy = ForeignKeyStrategyDeleteCascade;
    column = Object.assign(newIntegerColumn(), { name: integerColumnName });
  });

  it('should have delete cascade', (): void => {
    expect(strategy.hasDeleteCascade()).toBe(true);
  });

  it('should not have delete cascade', (): void => {
    expect(strategy.hasUpdateCascade()).toBe(false);
  });

  it('should have parent column name', (): void => {
    expect(strategy.parentColumnName(column)).toBe(integerColumnName);
  });

  it('should have foreign column name', (): void => {
    expect(strategy.foreignColumnName(column)).toBe(integerColumnName);
  });
});

describe('when using update cascade foreign key strategy', (): void => {
  const integerColumnName = 'IntegerColumnName';
  let strategy: ForeignKeyStrategy;
  let column: Column;

  beforeAll(() => {
    strategy = ForeignKeyStrategyUpdateCascade;
    column = Object.assign(newIntegerColumn(), { name: integerColumnName });
  });

  it('should have delete cascade', (): void => {
    expect(strategy.hasDeleteCascade()).toBe(false);
  });

  it('should not have delete cascade', (): void => {
    expect(strategy.hasUpdateCascade()).toBe(true);
  });

  it('should have parent column name', (): void => {
    expect(strategy.parentColumnName(column)).toBe(integerColumnName);
  });

  it('should have foreign column name', (): void => {
    expect(strategy.foreignColumnName(column)).toBe(integerColumnName);
  });
});

describe('when using update delete cascade foreign key strategy', (): void => {
  const integerColumnName = 'IntegerColumnName';
  let strategy: ForeignKeyStrategy;
  let column: Column;

  beforeAll(() => {
    strategy = ForeignKeyStrategyUpdateDeleteCascade;
    column = Object.assign(newIntegerColumn(), { name: integerColumnName });
  });

  it('should have delete cascade', (): void => {
    expect(strategy.hasDeleteCascade()).toBe(true);
  });

  it('should not have delete cascade', (): void => {
    expect(strategy.hasUpdateCascade()).toBe(true);
  });

  it('should have parent column name', (): void => {
    expect(strategy.parentColumnName(column)).toBe(integerColumnName);
  });

  it('should have foreign column name', (): void => {
    expect(strategy.foreignColumnName(column)).toBe(integerColumnName);
  });
});

describe('when using foreign column rename foreign key strategy', (): void => {
  const integerColumnName = 'IntegerColumnName';
  const foreignColumnRename = 'ForeignColumnRename';
  let strategy: ForeignKeyStrategy;
  let column: Column;

  beforeAll(() => {
    strategy = ForeignKeyStrategy.foreignColumnRename(foreignColumnRename);
    column = Object.assign(newIntegerColumn(), { name: integerColumnName });
  });

  it('should have delete cascade', (): void => {
    expect(strategy.hasDeleteCascade()).toBe(false);
  });

  it('should not have delete cascade', (): void => {
    expect(strategy.hasUpdateCascade()).toBe(false);
  });

  it('should have parent column name', (): void => {
    expect(strategy.parentColumnName(column)).toBe(integerColumnName);
  });

  it('should have foreign column name', (): void => {
    expect(strategy.foreignColumnName(column)).toBe(foreignColumnRename);
  });
});

describe('when using foreign column cascade', (): void => {
  const strategy: (deleteCascade: boolean, updateCascade: boolean) => ForeignKeyStrategy =
    ForeignKeyStrategy.foreignColumnCascade;

  it('should return default strategy', (): void => {
    expect(strategy(false, false)).toBe(ForeignKeyStrategyDefault);
  });

  it('should return delete cascade strategy', (): void => {
    expect(strategy(true, false)).toBe(ForeignKeyStrategyDeleteCascade);
  });

  it('should return update cascade strategy', (): void => {
    expect(strategy(false, true)).toBe(ForeignKeyStrategyUpdateCascade);
  });

  it('should return update delete cascade strategy', (): void => {
    expect(strategy(true, true)).toBe(ForeignKeyStrategyUpdateDeleteCascade);
  });

  it('should return default strategy', (): void => {
    // @ts-ignore: type is incompatible with the expected param type of boolean
    expect(strategy(null, null)).toBe(ForeignKeyStrategyDefault);
  });
});
