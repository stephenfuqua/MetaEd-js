import { newCommon, newCommonProperty, newDomainEntity, newIntegerProperty } from 'metaed-core';
import { Common, CommonProperty, DomainEntity, IntegerProperty } from 'metaed-core';
import { BuildStrategyDefault } from '../../../src/enhancer/table/BuildStrategy';
import { columnCreatorFactory } from '../../../src/enhancer/table/ColumnCreatorFactory';
import { newTable } from '../../../src/model/database/Table';
import { tableBuilderFactory } from '../../../src/enhancer/table/TableBuilderFactory';
import { TableStrategy } from '../../../src/model/database/TableStrategy';
import { Column } from '../../../src/model/database/Column';
import { ColumnCreator } from '../../../src/enhancer/table/ColumnCreator';
import { Table } from '../../../src/model/database/Table';
import { TableBuilder } from '../../../src/enhancer/table/TableBuilder';

describe('when building common property table', () => {
  const tableName = 'TableName';
  const tableSchema = 'tableschema';
  const entityPkName = 'EntityPkName';
  const commonPropertyName = 'CommonPropertyName';
  const commonPkName = 'CommonPkName';
  const tables: Array<Table> = [];

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkName,
      parentEntity: common,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);

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
    const commonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      parentEntity: entity,
      referencedEntity: common,
      data: {
        edfiOds: {
          odsName: commonPropertyName,
        },
      },
    });
    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const mainTable: Table = Object.assign(newTable(), {
      schema: tableSchema,
      name: tableName,
      nameComponents: [tableName],
    });
    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(commonProperty);
    tableBuilder.buildTables(
      commonProperty,
      TableStrategy.default(mainTable),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return join table', () => {
    expect(tables).toHaveLength(1);
    expect(tables[0].name).toBe(tableName + commonPropertyName);
    expect(tables[0].schema).toBe(tableSchema);
  });

  it('should have two primary key columns', () => {
    expect(tables[0].columns).toHaveLength(2);
    expect(tables[0].columns[0].name).toBe(commonPkName);
    expect(tables[0].columns[0].isPartOfPrimaryKey).toBe(true);
    expect(tables[0].columns[1].name).toBe(entityPkName);
    expect(tables[0].columns[1].isPartOfPrimaryKey).toBe(true);
  });

  it('should have one foreign key', () => {
    expect(tables[0].foreignKeys).toHaveLength(1);
  });

  it('should have correct foreign key relationship', () => {
    expect(tables[0].foreignKeys[0].columnNames).toHaveLength(1);
    expect(tables[0].foreignKeys[0].parentTableName).toBe(tableName + commonPropertyName);
    expect(tables[0].foreignKeys[0].columnNames[0].parentTableColumnName).toBe(entityPkName);

    expect(tables[0].foreignKeys[0].foreignTableName).toBe(tableName);
    expect(tables[0].foreignKeys[0].columnNames[0].foreignTableColumnName).toBe(entityPkName);
  });
});

describe('when building optional common property table', () => {
  const tableName = 'TableName';
  const tableSchema = 'tableschema';
  const entityPkName = 'EntityPkName';
  const commonName = 'CommonName';
  const commonPkName = 'CommonPkName';
  const tables: Array<Table> = [];

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      metaEdName: commonName,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkName,
      parentEntity: common,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);

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
    const commonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      parentEntity: entity,
      referencedEntity: common,
      isOptional: true,
      data: {
        edfiOds: {
          odsName: commonName,
        },
      },
    });
    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const mainTable: Table = Object.assign(newTable(), {
      schema: tableSchema,
      name: tableName,
      nameComponents: [tableName],
    });
    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(commonProperty);
    tableBuilder.buildTables(
      commonProperty,
      TableStrategy.default(mainTable),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return join table table', () => {
    expect(tables).toHaveLength(1);
    expect(tables[0].name).toBe(tableName + commonName);
    expect(tables[0].schema).toBe(tableSchema);
  });

  it('should have two columns with one primary key', () => {
    expect(tables[0].columns).toHaveLength(2);
    expect(tables[0].columns[0].name).toBe(commonPkName);
    expect(tables[0].columns[0].isPartOfPrimaryKey).toBe(false);
    expect(tables[0].columns[1].name).toBe(entityPkName);
    expect(tables[0].columns[1].isPartOfPrimaryKey).toBe(true);
  });

  it('should have one foreign key', () => {
    expect(tables[0].foreignKeys).toHaveLength(1);
  });

  it('should have correct foreign key relationship', () => {
    expect(tables[0].foreignKeys[0].columnNames).toHaveLength(1);
    expect(tables[0].foreignKeys[0].parentTableName).toBe(tableName + commonName);
    expect(tables[0].foreignKeys[0].columnNames[0].parentTableColumnName).toBe(entityPkName);

    expect(tables[0].foreignKeys[0].foreignTableName).toBe(tableName);
    expect(tables[0].foreignKeys[0].columnNames[0].foreignTableColumnName).toBe(entityPkName);
  });
});

describe('when building required collection common property table', () => {
  const tableName = 'TableName';
  const tableSchema = 'tableschema';
  const entityPkName = 'EntityPkName';
  const commonPropertyName = 'CommonPropertyName';
  const commonPkName = 'CommonPkName';
  const tables: Array<Table> = [];

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkName,
      parentEntity: common,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);

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
    const commonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      parentEntity: entity,
      referencedEntity: common,
      isRequiredCollection: true,
      data: {
        edfiOds: {
          odsName: commonPropertyName,
          odsIsCollection: true,
        },
      },
    });
    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const mainTable: Table = Object.assign(newTable(), {
      schema: tableSchema,
      name: tableName,
      nameComponents: [tableName],
    });
    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(commonProperty);
    tableBuilder.buildTables(
      commonProperty,
      TableStrategy.default(mainTable),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return required collection table', () => {
    expect(tables).toHaveLength(1);
    expect(tables[0].name).toBe(tableName + commonPropertyName);
    expect(tables[0].schema).toBe(tableSchema);
    expect(tables[0].isRequiredCollectionTable).toBe(true);
  });

  it('should have two primary keys', () => {
    expect(tables[0].columns).toHaveLength(2);
    expect(tables[0].columns[0].name).toBe(commonPkName);
    expect(tables[0].columns[0].isPartOfPrimaryKey).toBe(true);
    expect(tables[0].columns[1].name).toBe(entityPkName);
    expect(tables[0].columns[1].isPartOfPrimaryKey).toBe(true);
  });
});

describe('when building required collection common property table with make leaf column nullable strategy', () => {
  const tableName = 'TableName';
  const tableSchema = 'tableschema';
  const entityPkName = 'EntityPkName';
  const commonPropertyName = 'CommonPropertyName';
  const commonPkName = 'CommonPkName';
  const tables: Array<Table> = [];

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkName,
      parentEntity: common,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);

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
    const commonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      parentEntity: entity,
      referencedEntity: common,
      isRequiredCollection: true,
      data: {
        edfiOds: {
          odsName: commonPropertyName,
          odsIsCollection: true,
        },
      },
    });
    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const mainTable: Table = Object.assign(newTable(), {
      schema: tableSchema,
      name: tableName,
      nameComponents: [tableName],
    });
    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(commonProperty);
    tableBuilder.buildTables(
      commonProperty,
      TableStrategy.default(mainTable),
      primaryKeys,
      BuildStrategyDefault.makeLeafColumnsNullable(),
      tables,
      null,
    );
  });

  it('should return required collection table', () => {
    expect(tables).toHaveLength(1);
    expect(tables[0].name).toBe(tableName + commonPropertyName);
    expect(tables[0].schema).toBe(tableSchema);
    expect(tables[0].isRequiredCollectionTable).toBe(true);
  });

  it('should have two primary keys', () => {
    expect(tables[0].columns).toHaveLength(2);
    expect(tables[0].columns[0].name).toBe(commonPkName);
    expect(tables[0].columns[0].isPartOfPrimaryKey).toBe(true);
    expect(tables[0].columns[1].name).toBe(entityPkName);
    expect(tables[0].columns[1].isPartOfPrimaryKey).toBe(true);
  });
});
