import { DomainEntity, Enumeration, EnumerationProperty, IntegerProperty } from 'metaed-core';
import { newDomainEntity, newEnumeration, newEnumerationProperty, newIntegerProperty } from 'metaed-core';
import { BuildStrategyDefault } from '../../../src/enhancer/table/BuildStrategy';
import { columnCreatorFactory } from '../../../src/enhancer/table/ColumnCreatorFactory';
import { newTable } from '../../../src/model/database/Table';
import { tableBuilderFactory } from '../../../src/enhancer/table/TableBuilderFactory';
import { TableStrategy } from '../../../src/model/database/TableStrategy';
import { Column } from '../../../src/model/database/Column';
import { ColumnCreator } from '../../../src/enhancer/table/ColumnCreator';
import { Table } from '../../../src/model/database/Table';
import { TableBuilder } from '../../../src/enhancer/table/TableBuilder';

describe('when building enumeration property table', (): void => {
  const enumerationName = 'EnumerationName';
  const enumerationPropertyName = 'EnumerationPropertyName';
  const tableName = 'TableName';
  const tables: Table[] = [];
  let table: Table;

  beforeAll(() => {
    table = Object.assign(newTable(), {
      schema: 'TableSchema',
      name: tableName,
      nameComponents: [tableName],
    });

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'EntityPkName',
      parentEntity: entity,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
          odsIsCollection: false,
        },
      },
    });
    const entityEnumerationProperty: EnumerationProperty = Object.assign(newEnumerationProperty(), {
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsTypeifiedBaseName: enumerationPropertyName,
          odsIsCollection: false,
        },
      },
    });

    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      data: {
        edfiOds: {
          odsTableName: enumerationName,
          ods_EnumerationName: enumerationName,
          odsProperties: [],
        },
      },
    });
    const enumerationEntityProperty1: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'EnumerationPropertyName1',
      isPartOfIdentity: false,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    enumeration.data.edfiOds.odsProperties.push(enumerationEntityProperty1);
    entityEnumerationProperty.referencedEntity = enumeration;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Column[] = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityEnumerationProperty);
    tableBuilder.buildTables(
      entityEnumerationProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return no join table', (): void => {
    expect(tables).toHaveLength(0);
  });

  it('should create one column', (): void => {
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(`${enumerationPropertyName}Id`);
  });

  it('should create one foreign key', (): void => {
    expect(table.foreignKeys).toHaveLength(1);
  });

  it('should have correct foreign key relationship', (): void => {
    expect(table.foreignKeys[0].columnNames).toHaveLength(1);
    expect(table.foreignKeys[0].parentTableName).toBe(tableName);
    expect(table.foreignKeys[0].columnNames[0].parentTableColumnName).toBe(`${enumerationPropertyName}Id`);

    expect(table.foreignKeys[0].foreignTableName).toBe(enumerationName);
    expect(table.foreignKeys[0].columnNames[0].foreignTableColumnName).toBe(`${enumerationPropertyName}Id`);
  });
});

describe('when building collection enumeration property table', (): void => {
  const enumerationName = 'EnumerationName';
  const enumerationEntityPropertyName1 = 'EnumerationEntityPropertyName1';
  const entityPkName = 'EntityPkName';
  const tableSchema = 'tableschema';
  const tableName = 'TableName';
  const tables: Table[] = [];
  let table: Table;

  beforeAll(() => {
    table = Object.assign(newTable(), {
      schema: tableSchema,
      name: tableName,
      nameComponents: [tableName],
    });

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkName,
      parentEntity: entity,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
          odsIsCollection: false,
        },
      },
    });
    const entityEnumerationProperty: EnumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: enumerationName,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsTypeifiedBaseName: enumerationName,
          odsIsCollection: true,
        },
      },
    });

    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      data: {
        edfiOds: {
          odsTableName: enumerationName,
          ods_EnumerationName: enumerationName,
          odsProperties: [],
        },
      },
    });
    const enumerationEntityProperty1: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: enumerationEntityPropertyName1,
      isPartOfIdentity: false,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    enumeration.data.edfiOds.odsProperties.push(enumerationEntityProperty1);
    entityEnumerationProperty.referencedEntity = enumeration;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Column[] = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityEnumerationProperty);
    tableBuilder.buildTables(
      entityEnumerationProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return join table', (): void => {
    expect(tables).toHaveLength(1);
    expect(tables[0].name).toBe(tableName + enumerationName);
    expect(tables[0].schema).toBe(tableSchema);
  });

  it('should create two primary key columns', (): void => {
    expect(tables[0].columns).toHaveLength(2);
    expect(tables[0].columns[0].name).toBe(entityPkName);
    expect(tables[0].columns[0].isPartOfPrimaryKey).toBe(true);
    expect(tables[0].columns[1].name).toBe(`${enumerationName}Id`);
    expect(tables[0].columns[1].isPartOfPrimaryKey).toBe(true);
  });

  it('should create one foreign key', (): void => {
    expect(tables[0].foreignKeys).toHaveLength(2);
  });

  it('should have correct foreign key relationship', (): void => {
    expect(tables[0].foreignKeys[0].columnNames).toHaveLength(1);
    expect(tables[0].foreignKeys[0].parentTableName).toBe(tableName + enumerationName);
    expect(tables[0].foreignKeys[0].columnNames[0].parentTableColumnName).toBe(entityPkName);

    expect(tables[0].foreignKeys[0].foreignTableName).toBe(tableName);
    expect(tables[0].foreignKeys[0].columnNames[0].foreignTableColumnName).toBe(entityPkName);

    expect(tables[0].foreignKeys[1].columnNames).toHaveLength(1);
    expect(tables[0].foreignKeys[1].parentTableName).toBe(tableName + enumerationName);
    expect(tables[0].foreignKeys[1].columnNames[0].parentTableColumnName).toBe(`${enumerationName}Id`);

    expect(tables[0].foreignKeys[1].foreignTableName).toBe(enumerationName);
    expect(tables[0].foreignKeys[1].columnNames[0].foreignTableColumnName).toBe(`${enumerationName}Id`);
  });
});
