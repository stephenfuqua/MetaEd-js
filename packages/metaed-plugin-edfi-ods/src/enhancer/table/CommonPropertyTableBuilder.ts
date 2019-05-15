import R from 'ramda';
import { asCommonProperty } from 'metaed-core';
import { EntityProperty, MergeDirective, ReferentialProperty, Namespace } from 'metaed-core';
import { addColumns, addForeignKey, createForeignKey, newTable } from '../../model/database/Table';
import { appendOverlapping } from './TableNaming';
import { collectPrimaryKeys } from './PrimaryKeyCollector';
import { ColumnTransform } from '../../model/database/ColumnTransform';
import { ForeignKeyStrategy } from '../../model/database/ForeignKeyStrategy';
import { TableStrategy } from '../../model/database/TableStrategy';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreatorFactory } from './ColumnCreatorFactory';
import { ForeignKey } from '../../model/database/ForeignKey';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';
import { TableBuilderFactory } from './TableBuilderFactory';

function overlapCollapsingJoinTableName(parentEntityName: string, odsName: string) {
  return appendOverlapping(parentEntityName, odsName);
}

function buildJoinTables(
  property: ReferentialProperty,
  parentTableStrategy: TableStrategy,
  parentPrimaryKeys: Column[],
  primaryKeys: Column[],
  buildStrategy: BuildStrategy,
  joinTableName: string,
  joinTableNameComponents: string[],
  joinTableNamespace: Namespace,
  joinTableSchema: string,
  tables: Table[],
  tableFactory: TableBuilderFactory,
  parentIsRequired: boolean | null,
): void {
  const joinTable: Table = Object.assign(newTable(), {
    namespace: joinTableNamespace,
    schema: joinTableSchema.toLowerCase(),
    name: joinTableName,
    nameComponents: joinTableNameComponents,
    description: property.documentation,
    isRequiredCollectionTable: property.isRequiredCollection && R.defaultTo(true)(parentIsRequired),
    includeCreateDateColumn: true,
    parentEntity: property.parentEntity,
  });
  tables.push(joinTable);

  let strategy: BuildStrategy = buildStrategy.undoLeafColumnsNullable();
  if (strategy != null) {
    if (property.isOptional) {
      strategy = strategy.suppressPrimaryKeyCreationFromPropertiesStrategy();
    } else if (property.data.edfiOds.odsIsCollection) {
      strategy = strategy.undoSuppressPrimaryKeyCreationFromProperties();
    }
  }

  property.referencedEntity.data.edfiOds.odsProperties.forEach((referenceProperty: EntityProperty) => {
    const tableBuilder: TableBuilder = tableFactory.tableBuilderFor(referenceProperty);
    tableBuilder.buildTables(referenceProperty, TableStrategy.default(joinTable), primaryKeys, strategy, tables, null);
  });

  const foreignKey: ForeignKey = createForeignKey(
    property,
    parentPrimaryKeys,
    parentTableStrategy.schema,
    parentTableStrategy.schemaNamespace,
    parentTableStrategy.name,
    ForeignKeyStrategy.foreignColumnCascade(true, property.parentEntity.data.edfiOds.odsCascadePrimaryKeyUpdates),
  );
  addForeignKey(joinTable, foreignKey);
  addColumns(joinTable, parentPrimaryKeys, ColumnTransform.primaryKeyWithNewReferenceContext(parentTableStrategy.name));
}

export function commonPropertyTableBuilder(
  tableFactory: TableBuilderFactory,
  columnFactory: ColumnCreatorFactory,
): TableBuilder {
  return {
    buildTables(
      property: EntityProperty,
      parentTableStrategy: TableStrategy,
      parentPrimaryKeys: Column[],
      buildStrategy: BuildStrategy,
      tables: Table[],
      parentIsRequired: boolean | null,
    ): void {
      const commonProperty = asCommonProperty(property);
      let strategy: BuildStrategy = buildStrategy;

      if (commonProperty.mergeDirectives.length > 0) {
        strategy = strategy.skipPath(
          commonProperty.mergeDirectives.map((x: MergeDirective) => x.sourcePropertyPathStrings.slice(1)),
        );
      }

      const primaryKeys: Column[] = [];
      if (!commonProperty.isOptional) {
        primaryKeys.push(...collectPrimaryKeys(commonProperty.referencedEntity, strategy, columnFactory));
      }
      primaryKeys.push(...parentPrimaryKeys);

      const joinTableName: string = overlapCollapsingJoinTableName(
        parentTableStrategy.name,
        commonProperty.data.edfiOds.odsName,
      );

      const joinTableNameComponents = [...parentTableStrategy.nameComponents, commonProperty.data.edfiOds.odsName];

      buildJoinTables(
        commonProperty,
        parentTableStrategy,
        parentPrimaryKeys,
        primaryKeys,
        buildStrategy,
        joinTableName,
        joinTableNameComponents,
        parentTableStrategy.table.namespace,
        parentTableStrategy.table.schema,
        tables,
        tableFactory,
        parentIsRequired,
      );
    },
  };
}
