import R from 'ramda';
import { asReferentialProperty } from 'metaed-core';
import { EntityProperty, MergedProperty, ReferentialProperty } from 'metaed-core';
import { addColumns, addForeignKey, createForeignKey, newTable } from '../../model/database/Table';
import { addSourceEntityProperty, addMergedReferenceContext } from '../../model/database/Column';
import { collectPrimaryKeys } from './PrimaryKeyCollector';
import { ColumnTransform } from '../../model/database/ColumnTransform';
import { ForeignKeyStrategy } from '../../model/database/ForeignKeyStrategy';
import { joinTableNamer } from './JoinTableNamer';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreatorFactory } from './ColumnCreatorFactory';
import { ForeignKey } from '../../model/database/ForeignKey';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';
import { TableStrategy } from '../../model/database/TableStrategy';

const referenceColumnBuilder = (
  referenceProperty: ReferentialProperty,
  parentTableStrategy: TableStrategy,
  buildStrategy: BuildStrategy,
  factory: ColumnCreatorFactory,
) => (columnStrategy: ColumnTransform): void => {
  const primaryKeys: Array<Column> = collectPrimaryKeys(referenceProperty.referencedEntity, buildStrategy, factory);

  primaryKeys.forEach((pk: Column) => {
    pk.referenceContext = referenceProperty.data.edfiOds.odsName + pk.referenceContext;
    addMergedReferenceContext(pk, pk.referenceContext);
    addSourceEntityProperty(pk, referenceProperty);
  });
  addColumns(parentTableStrategy.table, primaryKeys, columnStrategy);
};

export function referencePropertyTableBuilder(factory: ColumnCreatorFactory): TableBuilder {
  return {
    buildTables(
      property: EntityProperty,
      parentTableStrategy: TableStrategy,
      parentPrimaryKeys: Array<Column>,
      buildStrategy: BuildStrategy,
      tables: Array<Table>,
      parentIsRequired: boolean | null,
    ): void {
      const referenceProperty: ReferentialProperty = asReferentialProperty(property);
      let strategy: BuildStrategy = buildStrategy;

      if (!R.isEmpty(referenceProperty.mergedProperties)) {
        strategy = strategy.skipPath(
          referenceProperty.mergedProperties.map((x: MergedProperty) => x.mergePropertyPath.slice(1)),
        );
      }

      const buildColumns = referenceColumnBuilder(referenceProperty, parentTableStrategy, strategy, factory);
      if (referenceProperty.isPartOfIdentity) {
        buildColumns(ColumnTransform.primaryKeyWithContextCollapsible(referenceProperty.data.edfiOds.odsContextPrefix));
      }
      if (referenceProperty.isRequired) {
        buildColumns(
          strategy.leafColumns(ColumnTransform.notNullWithContext(referenceProperty.data.edfiOds.odsContextPrefix)),
        );
      }
      if (referenceProperty.isOptional) {
        buildColumns(strategy.leafColumns(ColumnTransform.nullWithContext(referenceProperty.data.edfiOds.odsContextPrefix)));
      }

      if (!referenceProperty.data.edfiOds.odsIsCollection) return;
      const joinTable: Table = Object.assign(newTable(), {
        schema: parentTableStrategy.table.schema,
        name: joinTableNamer(referenceProperty, parentTableStrategy.name, strategy.parentContext()),
        description: referenceProperty.documentation,
        isRequiredCollectionTable: referenceProperty.isRequiredCollection && R.defaultTo(true)(parentIsRequired),
        includeCreateDateColumn: true,
        parentEntity: referenceProperty.parentEntity,
      });
      tables.push(joinTable);

      const foreignKey: ForeignKey = createForeignKey(
        referenceProperty,
        parentPrimaryKeys,
        parentTableStrategy.schema,
        parentTableStrategy.name,
        ForeignKeyStrategy.foreignColumnCascade(
          true,
          referenceProperty.parentEntity.data.edfiOds.odsCascadePrimaryKeyUpdates,
        ),
      );
      addForeignKey(joinTable, foreignKey);
      addColumns(joinTable, parentPrimaryKeys, ColumnTransform.primaryKeyWithNewReferenceContext(parentTableStrategy.name));

      const primaryKeys: Array<Column> = collectPrimaryKeys(referenceProperty.referencedEntity, strategy, factory);
      primaryKeys.forEach((pk: Column) => addSourceEntityProperty(pk, property));
      addColumns(
        joinTable,
        primaryKeys,
        ColumnTransform.primaryKeyWithContext(referenceProperty.data.edfiOds.odsContextPrefix),
      );
    },
  };
}
