import R from 'ramda';
import { EntityProperty, ReferentialProperty } from 'metaed-core';
import { asReferentialProperty } from 'metaed-core';
import { addColumns, addForeignKey, createForeignKey, newTable } from '../../model/database/Table';
import { baseNameCollapsingJoinTableNamer } from './TableNaming';
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

export function descriptorPropertyTableBuilder(factory: ColumnCreatorFactory): TableBuilder {
  return {
    buildTables(
      property: EntityProperty,
      parentTableStrategy: TableStrategy,
      parentPrimaryKeys: Array<Column>,
      buildStrategy: BuildStrategy,
      tables: Array<Table>,
      parentIsRequired: boolean | null,
    ): void {
      const descriptor: ReferentialProperty = asReferentialProperty(property);
      const columnCreator: ColumnCreator = factory.columnCreatorFor(descriptor);

      if (!descriptor.data.edfiOds.odsIsCollection) {
        const descriptorColumn: Column = R.head(columnCreator.createColumns(descriptor, buildStrategy));
        addColumns(parentTableStrategy.table, [descriptorColumn], buildStrategy.leafColumns(ColumnTransformUnchanged));

        const foreignKey: ForeignKey = createForeignKey(
          property,
          [descriptorColumn],
          descriptor.referencedEntity.namespace.namespaceName.toLowerCase(),
          descriptor.referencedEntity.namespace,
          descriptor.referencedEntity.data.edfiOds.odsDescriptorName,
          ForeignKeyStrategy.foreignColumnRename(`${descriptor.data.edfiOds.odsDescriptorifiedBaseName}Id`),
        );
        addForeignKey(parentTableStrategy.table, foreignKey);
      } else {
        const { name, nameComponents } = baseNameCollapsingJoinTableNamer(
          descriptor,
          parentTableStrategy.name,
          parentTableStrategy.nameComponents,
          buildStrategy.parentContext(),
        );
        const joinTable: Table = Object.assign(newTable(), {
          // Are the next two lines correct?  EnumerationPropertyTableBuilder uses strategy properties directly rather than get from table, seems more correct
          namespace: parentTableStrategy.table.namespace,
          schema: parentTableStrategy.table.schema.toLowerCase(),
          name,
          nameComponents,
          description: descriptor.documentation,
          isRequiredCollectionTable: descriptor.isRequiredCollection && R.defaultTo(true)(parentIsRequired),
          includeCreateDateColumn: true,
          parentEntity: descriptor.parentEntity,
        });
        tables.push(joinTable);

        const parentForeignKey: ForeignKey = createForeignKey(
          property,
          parentPrimaryKeys,
          parentTableStrategy.schema,
          parentTableStrategy.schemaNamespace,
          parentTableStrategy.name,
          ForeignKeyStrategy.foreignColumnCascade(true, descriptor.parentEntity.data.edfiOds.odsCascadePrimaryKeyUpdates),
        );
        addForeignKey(joinTable, parentForeignKey);
        addColumns(
          joinTable,
          parentPrimaryKeys,
          ColumnTransform.primaryKeyWithNewReferenceContext(parentTableStrategy.name),
        );

        const columns: Array<Column> = columnCreator.createColumns(descriptor, buildStrategy.columnNamerIgnoresroleName());
        const foreignKey: ForeignKey = createForeignKey(
          property,
          columns,
          descriptor.referencedEntity.namespace.namespaceName.toLowerCase(),
          descriptor.referencedEntity.namespace,
          descriptor.referencedEntity.data.edfiOds.odsDescriptorName,
          ForeignKeyStrategy.foreignColumnRename(`${descriptor.data.edfiOds.odsDescriptorifiedBaseName}Id`),
        );
        addForeignKey(joinTable, foreignKey);
        addColumns(joinTable, columns, ColumnTransformPrimaryKey);
      }
    },
  };
}
