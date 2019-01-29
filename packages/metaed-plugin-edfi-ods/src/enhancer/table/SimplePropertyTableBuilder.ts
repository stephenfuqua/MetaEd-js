import R from 'ramda';
import { EntityProperty, MergedProperty } from 'metaed-core';
import { isSharedProperty, asReferentialProperty } from 'metaed-core';
import { addColumns, addForeignKey, createForeignKey, newTable } from '../../model/database/Table';
import { baseNameCollapsingJoinTableNamer } from './JoinTableNamer';
import { ColumnTransform, ColumnTransformPrimaryKey, ColumnTransformUnchanged } from '../../model/database/ColumnTransform';
import { ForeignKeyStrategy } from '../../model/database/ForeignKeyStrategy';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreator } from './ColumnCreator';
import { ColumnCreatorFactory } from './ColumnCreatorFactory';
import { ForeignKey } from '../../model/database/ForeignKey';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';
import { TableStrategy } from '../../model/database/TableStrategy';

export function simplePropertyTableBuilder(factory: ColumnCreatorFactory): TableBuilder {
  return {
    buildTables(
      property: EntityProperty,
      parentTableStrategy: TableStrategy,
      parentPrimaryKeys: Array<Column>,
      buildStrategy: BuildStrategy,
      tables: Array<Table>,
      parentIsRequired: boolean | null,
    ): void {
      const columnCreator: ColumnCreator = factory.columnCreatorFor(property);

      let strategy: BuildStrategy = buildStrategy;

      // TODO: As of METAED-881, the property here could be a shared simple property, which
      // is not currently an extension of ReferentialProperty but has an equivalent mergedProperties field
      if (isSharedProperty(property) && asReferentialProperty(property).mergedProperties.length > 0) {
        strategy = strategy.skipPath(
          asReferentialProperty(property).mergedProperties.map((x: MergedProperty) => x.mergePropertyPath.slice(1)),
        );
      }

      if (property.data.edfiOds.odsIsCollection) {
        const joinTable: Table = Object.assign(newTable(), {
          // Are the next two lines correct?  EnumerationPropertyTableBuilder uses strategy properties directly rather than get from table, seems more correct
          namespace: parentTableStrategy.table.namespace,
          schema: parentTableStrategy.table.schema.toLowerCase(),
          name: baseNameCollapsingJoinTableNamer(property, parentTableStrategy.name, strategy.parentContext()),
          description: property.documentation,
          isRequiredCollectionTable: property.isRequiredCollection && R.defaultTo(true)(parentIsRequired),
          includeCreateDateColumn: true,
          parentEntity: property.parentEntity,
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

        addColumns(
          joinTable,
          parentPrimaryKeys,
          ColumnTransform.primaryKeyWithNewReferenceContext(parentTableStrategy.name),
        );
        addColumns(
          joinTable,
          columnCreator.createColumns(property, strategy.columnNamerIgnoresWithContext()),
          ColumnTransformPrimaryKey,
        );

        tables.push(joinTable);
      } else {
        addColumns(
          parentTableStrategy.table,
          columnCreator.createColumns(property, strategy),
          strategy.leafColumns(ColumnTransformUnchanged),
        );
      }
    },
  };
}
