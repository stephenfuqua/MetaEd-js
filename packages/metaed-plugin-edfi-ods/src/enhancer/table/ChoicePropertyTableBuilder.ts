import { EntityProperty, MergedProperty, ReferentialProperty } from 'metaed-core';
import { asReferentialProperty } from 'metaed-core';
import { cloneColumn } from '../../model/database/Column';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';
import { TableBuilderFactory } from './TableBuilderFactory';
import { TableStrategy } from '../../model/database/TableStrategy';

export function choicePropertyTableBuilder(factory: TableBuilderFactory): TableBuilder {
  return {
    buildTables(
      property: EntityProperty,
      parentTableStrategy: TableStrategy,
      parentPrimaryKeys: Array<Column>,
      buildStrategy: BuildStrategy,
      tables: Array<Table>,
      // @ts-ignore
      parentIsRequired: boolean | null,
    ): void {
      const choice: ReferentialProperty = asReferentialProperty(property);
      let strategy: BuildStrategy = buildStrategy;

      if (choice.mergedProperties.length > 0) {
        strategy = strategy.skipPath(choice.mergedProperties.map((x: MergedProperty) => x.mergePropertyPath.slice(1)));
      }

      choice.referencedEntity.data.edfiOds.odsProperties.forEach((odsProperty: EntityProperty) => {
        const tableBuilder: TableBuilder = factory.tableBuilderFor(odsProperty);

        tableBuilder.buildTables(
          odsProperty,
          parentTableStrategy,
          parentPrimaryKeys.map(pk => cloneColumn(pk)),
          strategy.makeLeafColumnsNullable(),
          tables,
          choice.isRequired,
        );
      });
    },
  };
}
