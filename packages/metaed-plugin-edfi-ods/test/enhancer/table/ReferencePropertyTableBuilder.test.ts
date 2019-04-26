import { DomainEntity, DomainEntityProperty, IntegerProperty } from 'metaed-core';
import { newDomainEntity, newDomainEntityProperty, newIntegerProperty } from 'metaed-core';
import { BuildStrategyDefault } from '../../../src/enhancer/table/BuildStrategy';
import { columnCreatorFactory } from '../../../src/enhancer/table/ColumnCreatorFactory';
import { newTable } from '../../../src/model/database/Table';
import { tableBuilderFactory } from '../../../src/enhancer/table/TableBuilderFactory';
import { TableStrategy } from '../../../src/model/database/TableStrategy';
import { Column } from '../../../src/model/database/Column';
import { ColumnCreator } from '../../../src/enhancer/table/ColumnCreator';
import { Table } from '../../../src/model/database/Table';
import { TableBuilder } from '../../../src/enhancer/table/TableBuilder';

describe('when building domain entity property table that is not an identity, required, optional, or a collection', () => {
  const tables: Array<Table> = [];
  let table: Table;

  beforeAll(() => {
    table = Object.assign(newTable(), {
      schema: 'TableSchema',
      name: 'TableName',
      nameComponents: ['TableName'],
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
    const entityDomainEntityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      parentEntity: entity,
      data: {
        edfiOds: {
          odsIsCollection: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          odsProperties: [],
        },
      },
    });
    const domainEntityEntityProperty1: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'DomainEntityPropertyName1',
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityEntityProperty1);
    entityDomainEntityProperty.referencedEntity = domainEntity;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityDomainEntityProperty);
    tableBuilder.buildTables(
      entityDomainEntityProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return no join table', () => {
    expect(tables).toHaveLength(0);
  });

  it('should create no columns', () => {
    expect(table.columns).toHaveLength(0);
  });
});

describe('when building identity domain entity property table', () => {
  const domainEntityPkName = 'DomainEntityPkName';
  const tables: Array<Table> = [];
  let table: Table;

  beforeAll(() => {
    table = Object.assign(newTable(), {
      schema: 'TableSchema',
      name: 'TableName',
      nameComponents: ['TableName'],
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
    const entityDomainEntityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      parentEntity: entity,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          ods_name: 'EntityDomainEntityProperty',
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          ods_DomainEntityName: 'DomainEntityName',
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPk: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkName,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    domainEntity.data.edfiOds.odsIdentityProperties.push(domainEntityPk);
    entityDomainEntityProperty.referencedEntity = domainEntity;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityDomainEntityProperty);
    tableBuilder.buildTables(
      entityDomainEntityProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return no join table', () => {
    expect(tables).toHaveLength(0);
  });

  it('should create one column', () => {
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntityPkName);
  });

  it('should create no foreign keys', () => {
    expect(table.foreignKeys).toHaveLength(0);
  });
});

describe('when building required domain entity property table', () => {
  const domainEntityPkName = 'DomainEntityPkName';
  const tables: Array<Table> = [];
  let table: Table;

  beforeAll(() => {
    table = Object.assign(newTable(), {
      schema: 'TableSchema',
      name: 'TableName',
      nameComponents: ['TableName'],
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
    const entityDomainEntityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      parentEntity: entity,
      isRequired: true,
      data: {
        edfiOds: {
          ods_name: 'EntityDomainEntityProperty',
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          ods_DomainEntityName: 'DomainEntityName',
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPk: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkName,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    domainEntity.data.edfiOds.odsIdentityProperties.push(domainEntityPk);
    entityDomainEntityProperty.referencedEntity = domainEntity;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityDomainEntityProperty);
    tableBuilder.buildTables(
      entityDomainEntityProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return no join table', () => {
    expect(tables).toHaveLength(0);
  });

  it('should create one column', () => {
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntityPkName);
  });

  it('should create no foreign keys', () => {
    expect(table.foreignKeys).toHaveLength(0);
  });
});

describe('when building optional domain entity property table', () => {
  const domainEntityPkName = 'DomainEntityPkName';
  const tables: Array<Table> = [];
  let table: Table;

  beforeAll(() => {
    table = Object.assign(newTable(), {
      schema: 'TableSchema',
      name: 'TableName',
      nameComponents: ['TableName'],
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
    const entityDomainEntityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      parentEntity: entity,
      isOptional: true,
      data: {
        edfiOds: {
          ods_name: 'EntityDomainEntityProperty',
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          ods_DomainEntityName: 'DomainEntityName',
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPk: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkName,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    domainEntity.data.edfiOds.odsIdentityProperties.push(domainEntityPk);
    entityDomainEntityProperty.referencedEntity = domainEntity;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityDomainEntityProperty);
    tableBuilder.buildTables(
      entityDomainEntityProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return no join table', () => {
    expect(tables).toHaveLength(0);
  });

  it('should create one column', () => {
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntityPkName);
  });

  it('should create no foreign keys', () => {
    expect(table.foreignKeys).toHaveLength(0);
  });
});

describe('when building collection domain entity property table', () => {
  const domainEntityName = 'DomainEntityName';
  const domainEntityPkName = 'domainEntityPkName';
  const entityPkName = 'EntityPkName';
  const tableSchema = 'tableschema';
  const tableName = 'TableName';
  const tables: Array<Table> = [];
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
    const entityDomainEntityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          ods_DomainEntityName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityEntityProperty1: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkName,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityEntityProperty1);
    domainEntity.data.edfiOds.odsIdentityProperties.push(domainEntityEntityProperty1);
    entityDomainEntityProperty.referencedEntity = domainEntity;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityDomainEntityProperty);
    tableBuilder.buildTables(
      entityDomainEntityProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return join table', () => {
    expect(tables).toHaveLength(1);
    expect(tables[0].name).toBe(tableName + domainEntityName);
    expect(tables[0].schema).toBe(tableSchema);
  });

  it('should create two primary key columns', () => {
    expect(tables[0].columns).toHaveLength(2);
    expect(tables[0].columns[0].name).toBe(entityPkName);
    expect(tables[0].columns[0].isPartOfPrimaryKey).toBe(true);
    expect(tables[0].columns[1].name).toBe(domainEntityPkName);
    expect(tables[0].columns[1].isPartOfPrimaryKey).toBe(true);
  });

  it('should create one foreign key', () => {
    expect(tables[0].foreignKeys).toHaveLength(1);
  });

  it('should have correct foreign key relationship', () => {
    expect(tables[0].foreignKeys[0].columnNames).toHaveLength(1);
    expect(tables[0].foreignKeys[0].parentTableName).toBe(tableName + domainEntityName);
    expect(tables[0].foreignKeys[0].columnNames[0].parentTableColumnName).toBe(entityPkName);

    expect(tables[0].foreignKeys[0].foreignTableName).toBe(tableName);
    expect(tables[0].foreignKeys[0].columnNames[0].foreignTableColumnName).toBe(entityPkName);
  });
});
