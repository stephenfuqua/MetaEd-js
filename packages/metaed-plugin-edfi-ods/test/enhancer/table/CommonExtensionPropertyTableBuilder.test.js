// @flow
import {
  newCommon,
  newCommonExtension,
  newCommonProperty,
  newDomainEntityExtension,
  newIntegerProperty,
  newNamespace,
  addEntityForNamespace,
} from 'metaed-core';
import type {
  Common,
  CommonExtension,
  CommonProperty,
  DomainEntityExtension,
  IntegerProperty,
  Namespace,
} from 'metaed-core';
import { BuildStrategyDefault } from '../../../src/enhancer/table/BuildStrategy';
import { columnCreatorFactory } from '../../../src/enhancer/table/ColumnCreatorFactory';
import { newTable } from '../../../src/model/database/Table';
import { tableBuilderFactory } from '../../../src/enhancer/table/TableBuilderFactory';
import { TableStrategy } from '../../../src/model/database/TableStrategy';
import type { Column } from '../../../src/model/database/Column';
import type { ColumnCreator } from '../../../src/enhancer/table/ColumnCreator';
import type { Table } from '../../../src/model/database/Table';
import type { TableBuilder } from '../../../src/enhancer/table/TableBuilder';

describe('when building common property extension table', () => {
  const tableName: string = 'TableName';
  const tableSchema: string = 'TableSchema';
  const entityPkName: string = 'EntityPkName';
  const commonName: string = 'CommonName';
  const commonPkName: string = 'CommonPkName';
  const commonExtensionPropertyName: string = 'CommonExtensionPropertyName';
  const extensionNamespaceName: string = 'extension';
  const tables: Array<Table> = [];
  const coreNamespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: extensionNamespaceName };

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      metaEdName: commonName,
      namespace: coreNamespace,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkName,
      namespace: coreNamespace,
      parentEntity: common,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          ods_Name: '',
          ods_ContextPrefix: '',
          ods_IsIdentityDatabaseType: false,
          ods_IsUniqueIndex: false,
        },
      },
    });
    common.data.edfiOds.ods_Properties.push(commonPkProperty);
    common.data.edfiOds.ods_IdentityProperties.push(commonPkProperty);

    const commonExtension: CommonExtension = Object.assign(newCommonExtension(), {
      metaEdName: commonName,
      baseEntityName: common.metaEdName,
      baseEntity: common,
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    addEntityForNamespace(commonExtension);
    const commonExtensionProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonExtensionPropertyName,
      parentEntity: common,
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          ods_Name: '',
          ods_ContextPrefix: '',
          ods_IsIdentityDatabaseType: false,
          ods_IsUniqueIndex: false,
        },
      },
    });
    commonExtension.data.edfiOds.ods_Properties.push(commonExtensionProperty);

    const entity: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          ods_CascadePrimaryKeyUpdates: false,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkName,
      namespace: extensionNamespace,
      parentEntity: entity,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          ods_Name: '',
          ods_ContextPrefix: '',
          ods_IsIdentityDatabaseType: false,
          ods_IsUniqueIndex: false,
          ods_IsCollection: false,
        },
      },
    });
    const commonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      metaEdName: commonName,
      namespace: extensionNamespace,
      parentEntity: entity,
      referencedEntity: common,
      isExtensionOverride: true,
      data: {
        edfiOds: {
          ods_Name: commonName,
        },
      },
    });

    entity.data.edfiOds.ods_Properties.push(entityPkProperty, commonProperty);
    entity.data.edfiOds.ods_IdentityProperties.push(entityPkProperty);

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const mainTable: Table = Object.assign(newTable(), { schema: tableSchema, name: tableName });
    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(commonProperty);
    tableBuilder.buildTables(commonProperty, TableStrategy.default(mainTable), primaryKeys, BuildStrategyDefault, tables);
  });

  it('should return join table', () => {
    expect(tables).toHaveLength(1);
    expect(tables[0].name).toBe(`${tableName}${commonName}Extension`);
    expect(tables[0].schema).toBe(extensionNamespaceName);
  });

  it('should have three columns with two primary keys', () => {
    expect(tables[0].columns).toHaveLength(3);
    expect(tables[0].columns[0].name).toBe(commonPkName);
    expect(tables[0].columns[0].isPartOfPrimaryKey).toBe(true);
    expect(tables[0].columns[1].name).toBe(entityPkName);
    expect(tables[0].columns[1].isPartOfPrimaryKey).toBe(true);
    expect(tables[0].columns[2].name).toBe(commonExtensionPropertyName);
    expect(tables[0].columns[2].isPartOfPrimaryKey).toBe(false);
  });

  it('should have one foreign key', () => {
    expect(tables[0].foreignKeys).toHaveLength(1);
  });

  it('should have correct foreign key relationship', () => {
    expect(tables[0].foreignKeys[0].columnNames).toHaveLength(2);
    expect(tables[0].foreignKeys[0].parentTableName).toBe(`${tableName + commonName}Extension`);
    expect(tables[0].foreignKeys[0].columnNames[0].parentTableColumnName).toBe(commonPkName);
    expect(tables[0].foreignKeys[0].columnNames[1].parentTableColumnName).toBe(entityPkName);

    expect(tables[0].foreignKeys[0].foreignTableName).toBe(tableName + commonName);
    expect(tables[0].foreignKeys[0].columnNames[0].foreignTableColumnName).toBe(commonPkName);
    expect(tables[0].foreignKeys[0].columnNames[1].foreignTableColumnName).toBe(entityPkName);
  });
});
