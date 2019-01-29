import R from 'ramda';
import { EntityProperty, ReferentialProperty, asReferentialProperty } from 'metaed-core';
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

const foreignKeyStrategyFor = (property: EntityProperty): ForeignKeyStrategy => {
  if (property.type === 'enumeration')
    return ForeignKeyStrategy.foreignColumnRename(`${property.data.edfiOds.odsTypeifiedBaseName}Id`);
  if (property.type === 'schoolYearEnumeration') return ForeignKeyStrategy.foreignColumnRename('SchoolYear');
  throw new Error('EnumerationPropertyTableBuilder received non-enumeration property');
};

export function enumerationPropertyTableBuilder(factory: ColumnCreatorFactory): TableBuilder {
  return {
    buildTables(
      property: EntityProperty,
      parentTableStrategy: TableStrategy,
      parentPrimaryKeys: Array<Column>,
      buildStrategy: BuildStrategy,
      tables: Array<Table>,
      parentIsRequired: boolean | null,
    ): void {
      const enumeration: ReferentialProperty = asReferentialProperty(property);
      const columnCreator: ColumnCreator = factory.columnCreatorFor(enumeration);

      if (!enumeration.data.edfiOds.odsIsCollection) {
        const enumerationColumn: Column = R.head(columnCreator.createColumns(enumeration, buildStrategy));
        const foreignKey: ForeignKey = createForeignKey(
          property,
          [enumerationColumn],
          enumeration.referencedEntity.namespace.namespaceName.toLowerCase(),
          enumeration.referencedEntity.namespace,
          enumeration.referencedEntity.data.edfiOds.odsTableName,
          foreignKeyStrategyFor(enumeration),
        );
        addForeignKey(parentTableStrategy.table, foreignKey);
        addColumns(parentTableStrategy.table, [enumerationColumn], buildStrategy.leafColumns(ColumnTransformUnchanged));
      } else {
        const joinTable: Table = Object.assign(newTable(), {
          namespace: parentTableStrategy.schemaNamespace,
          schema: parentTableStrategy.schema,
          name: baseNameCollapsingJoinTableNamer(enumeration, parentTableStrategy.name, buildStrategy.parentContext()),
          description: enumeration.documentation,
          isRequiredCollectionTable: enumeration.isRequiredCollection && R.defaultTo(true)(parentIsRequired),
          includeCreateDateColumn: true,
          parentEntity: enumeration.parentEntity,
        });
        tables.push(joinTable);

        const parentForeignKey: ForeignKey = createForeignKey(
          property,
          parentPrimaryKeys,
          parentTableStrategy.schema,
          parentTableStrategy.schemaNamespace,
          parentTableStrategy.name,
          ForeignKeyStrategy.foreignColumnCascade(true, enumeration.parentEntity.data.edfiOds.odsCascadePrimaryKeyUpdates),
        );
        addForeignKey(joinTable, parentForeignKey);
        addColumns(
          joinTable,
          parentPrimaryKeys,
          ColumnTransform.primaryKeyWithNewReferenceContext(parentTableStrategy.name),
        );

        const columns: Array<Column> = columnCreator.createColumns(
          enumeration,
          buildStrategy.columnNamerIgnoresWithContext(),
        );
        const foreignKey: ForeignKey = createForeignKey(
          property,
          columns,
          enumeration.referencedEntity.namespace.namespaceName.toLowerCase(),
          enumeration.referencedEntity.namespace,
          enumeration.referencedEntity.data.edfiOds.odsTableName,
          foreignKeyStrategyFor(enumeration),
        );
        addForeignKey(joinTable, foreignKey);
        addColumns(joinTable, columns, ColumnTransformPrimaryKey);
      }
    },
  };
}
