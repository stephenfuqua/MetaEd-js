import R from 'ramda';
import { asTopLevelEntity, getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { EnhancerResult, EntityProperty, MetaEdEnvironment, ModelBase, TopLevelEntity } from 'metaed-core';
import { addForeignKey } from '../../model/database/Table';
import { addTables, buildMainTable, buildTablesFromProperties } from './TableCreatingEntityEnhancerBase';
import { BuildStrategyDefault } from './BuildStrategy';
import { columnCreatorFactory } from './ColumnCreatorFactory';
import { newColumnNamePair } from '../../model/database/ColumnNamePair';
import { newForeignKey, addColumnNamePairs, newForeignKeySourceReference } from '../../model/database/ForeignKey';
import { Column } from '../../model/database/Column';
import { ColumnNamePair } from '../../model/database/ColumnNamePair';
import { ForeignKey } from '../../model/database/ForeignKey';
import { Table } from '../../model/database/Table';

const enhancerName = 'DomainEntitySubclassTableEnhancer';

function addForeignKeyToPrimaryKeyRename(table: Table, entity: TopLevelEntity): void {
  if (entity.baseEntity == null) return;

  entity.data.edfiOds.odsProperties.forEach((keyRenameProperty: EntityProperty) => {
    if (!keyRenameProperty.isIdentityRename) return;

    const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
      withDeleteCascade: true,
      sourceReference: {
        ...newForeignKeySourceReference(),
        isPartOfIdentity: true,
        isSubclassRelationship: true,
      },
    });

    // null check for Flow
    if (entity.baseEntity != null) {
      foreignKey.foreignTableSchema = entity.baseEntity.namespace.namespaceName;
      foreignKey.foreignTableName = entity.baseEntity.data.edfiOds.odsTableName;
    }

    const localColumnNames: Array<string> = columnCreatorFactory
      .columnCreatorFor(keyRenameProperty)
      .createColumns(keyRenameProperty, BuildStrategyDefault)
      .map((x: Column) => x.name);

    const baseColumnProperty: EntityProperty = R.head(
      // @ts-ignore - baseEntity can't be null/undefined due to setting above
      entity.baseEntity.data.edfiOds.odsProperties.filter(
        (property: EntityProperty) => property.data.edfiOds.odsName === keyRenameProperty.baseKeyName,
      ),
    );

    const baseColumnNames: Array<string> = columnCreatorFactory
      .columnCreatorFor(baseColumnProperty)
      .createColumns(baseColumnProperty, BuildStrategyDefault)
      .map((x: Column) => x.name);

    const columnNamePairs: Array<ColumnNamePair> = R.zipWith((localColumnName, baseColumnName) =>
      Object.assign(newColumnNamePair(), {
        parentTableColumnName: localColumnName,
        foreignTableColumnName: baseColumnName,
      }),
    )(localColumnNames, baseColumnNames);

    addColumnNamePairs(foreignKey, columnNamePairs);
    addForeignKey(table, foreignKey);
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'domainEntitySubclass')
    .map((x: ModelBase) => asTopLevelEntity(x))
    .forEach((entity: TopLevelEntity) => {
      const tables: Array<Table> = [];
      const mainTable: Table = buildMainTable(metaEd, entity, false);
      tables.push(mainTable);
      addForeignKeyToPrimaryKeyRename(mainTable, entity);
      buildTablesFromProperties(entity, mainTable, tables);
      entity.data.edfiOds.odsTables = tables;
      addTables(metaEd, tables);
    });

  return {
    enhancerName,
    success: true,
  };
}
