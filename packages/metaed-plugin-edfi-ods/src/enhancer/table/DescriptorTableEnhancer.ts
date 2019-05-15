import R from 'ramda';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { Descriptor, EnhancerResult, EntityProperty, MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import {
  addColumns,
  addForeignKey,
  createForeignKeyUsingSourceReference,
  getPrimaryKeys,
  newTable,
} from '../../model/database/Table';
import { addTables } from './TableCreatingEntityEnhancerBase';
import { BuildStrategyDefault } from './BuildStrategy';
import { collectPrimaryKeys } from './PrimaryKeyCollector';
import { columnCreatorFactory } from './ColumnCreatorFactory';
import { ColumnTransformUnchanged } from '../../model/database/ColumnTransform';
import { enumerationTableCreator } from './EnumerationTableCreator';
import { ForeignKeyStrategyDefault } from '../../model/database/ForeignKeyStrategy';
import { newColumnNamePair } from '../../model/database/ColumnNamePair';
import { newForeignKey, addColumnNamePair, newForeignKeySourceReference } from '../../model/database/ForeignKey';
import { newIntegerColumn } from '../../model/database/Column';
import { tableBuilderFactory } from './TableBuilderFactory';
import { TableStrategy } from '../../model/database/TableStrategy';
import { Column } from '../../model/database/Column';
import { ForeignKey } from '../../model/database/ForeignKey';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';

const enhancerName = 'DescriptorTableEnhancer';

const PRIMARY_KEY_DESCRIPTOR =
  'A unique identifier used as Primary Key, not derived from business logic, when acting as Foreign Key, references the parent table.';

function createTables(metaEd: MetaEdEnvironment, descriptor: Descriptor): Table[] {
  const tables: Table[] = [];

  const mainTable: Table = Object.assign(newTable(), {
    namespace: descriptor.namespace,
    schema: descriptor.namespace.namespaceName.toLowerCase(),
    name: descriptor.data.edfiOds.odsTableName,
    nameComponents: [descriptor.data.edfiOds.odsTableName],
    description: descriptor.documentation,
    parentEntity: descriptor,
  });
  descriptor.data.edfiOds.odsEntityTable = mainTable;

  tables.push(mainTable);

  const primaryKey: Column = Object.assign(newIntegerColumn(), {
    name: `${descriptor.metaEdName}DescriptorId`,
    isPartOfPrimaryKey: true,
    isNullable: false,
    description: PRIMARY_KEY_DESCRIPTOR,
  });
  addColumns(mainTable, [primaryKey], ColumnTransformUnchanged);

  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  // Bail out if core namespace isn't defined
  if (coreNamespace == null) return tables;

  const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
    foreignTableSchema: coreNamespace.namespaceName.toLowerCase(),
    foreignTableName: 'Descriptor',
    foreignTableNamespace: coreNamespace,
    withDeleteCascade: true,
    sourceReference: {
      ...newForeignKeySourceReference(),
      isPartOfIdentity: true,
      isSubclassRelationship: true,
    },
  });
  addColumnNamePair(
    foreignKey,
    Object.assign(newColumnNamePair(), {
      parentTableColumnName: `${mainTable.name}Id`,
      foreignTableColumnName: 'DescriptorId',
    }),
  );
  addForeignKey(mainTable, foreignKey);

  if (descriptor.data.edfiOds.odsIsMapType) {
    const mapTypeTable: Table = enumerationTableCreator.build(
      metaEd,
      descriptor.metaEdName,
      descriptor.namespace,
      descriptor.mapTypeEnumeration.documentation,
    );
    tables.push(mapTypeTable);

    addColumns(
      mainTable,
      [
        Object.assign(newIntegerColumn(), {
          name: R.head(getPrimaryKeys(mapTypeTable)).name,
          isPartOfPrimaryKey: false,
          isNullable: descriptor.isMapTypeOptional,
          description: PRIMARY_KEY_DESCRIPTOR,
        }),
      ],
      ColumnTransformUnchanged,
    );

    const mapTypeForeignKey: ForeignKey = createForeignKeyUsingSourceReference(
      {
        ...newForeignKeySourceReference(),
        isSyntheticRelationship: true,
      },
      getPrimaryKeys(mapTypeTable),
      mapTypeTable.schema,
      mapTypeTable.namespace,
      mapTypeTable.name,
      ForeignKeyStrategyDefault,
    );
    addForeignKey(mainTable, mapTypeForeignKey);
  }

  const primaryKeys: Column[] = collectPrimaryKeys(descriptor, BuildStrategyDefault, columnCreatorFactory);
  primaryKeys.push(primaryKey);
  descriptor.data.edfiOds.odsProperties.forEach((property: EntityProperty) => {
    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(property);
    tableBuilder.buildTables(property, TableStrategy.default(mainTable), primaryKeys, BuildStrategyDefault, tables, null);
  });

  return tables;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'descriptor').forEach((entity: ModelBase) => {
    const tables: Table[] = createTables(metaEd, entity as Descriptor);
    entity.data.edfiOds.odsTables = tables;
    addTables(metaEd, tables);
  });

  return {
    enhancerName,
    success: true,
  };
}
