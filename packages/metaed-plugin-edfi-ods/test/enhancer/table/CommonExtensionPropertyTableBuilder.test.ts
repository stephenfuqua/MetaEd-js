import {
  newCommon,
  newCommonExtension,
  newCommonProperty,
  newDomainEntityExtension,
  newIntegerProperty,
  newNamespace,
  addEntityForNamespace,
} from 'metaed-core';
import { Common, CommonExtension, CommonProperty, DomainEntityExtension, IntegerProperty, Namespace } from 'metaed-core';
import { BuildStrategyDefault } from '../../../src/enhancer/table/BuildStrategy';
import { columnCreatorFactory } from '../../../src/enhancer/table/ColumnCreatorFactory';
import { newTable } from '../../../src/model/database/Table';
import { tableBuilderFactory } from '../../../src/enhancer/table/TableBuilderFactory';
import { TableStrategy } from '../../../src/model/database/TableStrategy';
import { Column } from '../../../src/model/database/Column';
import { ColumnCreator } from '../../../src/enhancer/table/ColumnCreator';
import { Table } from '../../../src/model/database/Table';
import { TableBuilder } from '../../../src/enhancer/table/TableBuilder';

describe('when building common property extension table', () => {
  const tableName = 'TableName';
  const tableSchema = 'TableSchema';
  const entityPkName = 'EntityPkName';
  const commonName = 'CommonName';
  const commonPkName = 'CommonPkName';
  const commonExtensionPropertyName = 'CommonExtensionPropertyName';
  const extensionNamespaceName = 'Extension';
  const tables: Array<Table> = [];
  const coreNamespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: extensionNamespaceName };
  extensionNamespace.dependencies.push(coreNamespace);

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      metaEdName: commonName,
      namespace: coreNamespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);

    const commonExtension: CommonExtension = Object.assign(newCommonExtension(), {
      metaEdName: commonName,
      baseEntityName: common.metaEdName,
      baseEntityNamespaceName: coreNamespace.namespaceName,
      baseEntity: common,
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    addEntityForNamespace(commonExtension);
    const commonExtensionProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonExtensionPropertyName,
      parentEntity: commonExtension,
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });
    commonExtension.data.edfiOds.odsProperties.push(commonExtensionProperty);

    const entity: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          odsCascadePrimaryKeyUpdates: false,
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
          odsIsCollection: false,
        },
      },
    });
    const commonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      metaEdName: commonName,
      namespace: extensionNamespace,
      referencedNamespaceName: extensionNamespace.namespaceName,
      parentEntity: entity,
      referencedEntity: common,
      isExtensionOverride: true,
      data: {
        edfiOds: {
          odsName: commonName,
        },
      },
    });

    entity.data.edfiOds.odsProperties.push(entityPkProperty, commonProperty);
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty);

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
    expect(tables[0].name).toBe(`${tableName}${commonName}Extension`);
    expect(tables[0].schema).toBe(extensionNamespaceName.toLowerCase());
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
