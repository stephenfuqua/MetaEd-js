import { EntityProperty } from 'metaed-core';
import { newIntegerColumn } from '../../model/database/Column';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreator } from './ColumnCreator';
import { ColumnNamer } from '../../model/database/ColumnNamer';

export function descriptorPropertyColumnCreator(): ColumnCreator {
  return {
    createColumns: (property: EntityProperty, strategy: BuildStrategy): Column[] => {
      if (!strategy.buildColumns(property)) return [];

      const columnNamer: ColumnNamer = strategy.columnNamer(
        strategy.parentContext(),
        property.data.edfiOds.odsContextPrefix,
        property.data.edfiOds.odsDescriptorifiedBaseName,
      );
      const column: Column = Object.assign(newIntegerColumn(), {
        name: `${columnNamer()}Id`,
        description: property.documentation,
        isNullable: property.isOptional,
        isPartOfPrimaryKey:
          !strategy.suppressPrimaryKeyCreation() && (property.isPartOfIdentity || property.data.edfiOds.odsIsCollection),
        referenceContext: property.data.edfiOds.odsName,
        mergedReferenceContexts: [property.data.edfiOds.odsName],
        sourceEntityProperties: [property],
      });
      return [column];
    },
  };
}
