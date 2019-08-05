import { EntityProperty, MetaEdEnvironment, TopLevelEntity } from 'metaed-core';
import { BuildStrategyDefault } from './BuildStrategy';
import { cloneColumn } from '../../model/database/Column';
import { collectPrimaryKeys } from './PrimaryKeyCollector';
import { columnCreatorFactory } from './ColumnCreatorFactory';
import { newTable } from '../../model/database/Table';
import { tableEntities } from '../EnhancerHelper';
import { tableBuilderFactory } from './TableBuilderFactory';
import { TableStrategy } from '../../model/database/TableStrategy';
import { Column } from '../../model/database/Column';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';

// Build top level and sub level tables for the given top level entity,
// including columns for each property and cascading through special property types as needed
export function buildTablesFromProperties(entity: TopLevelEntity, mainTable: Table, tables: Table[]): void {
  const primaryKeys: Column[] = collectPrimaryKeys(entity, BuildStrategyDefault, columnCreatorFactory).map((x: Column) =>
    cloneColumn(x),
  );

  entity.data.edfiOds.odsProperties.forEach((property: EntityProperty) => {
    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(property);
    tableBuilder.buildTables(property, TableStrategy.default(mainTable), primaryKeys, BuildStrategyDefault, tables, null);
  });
}

// @ts-ignore - "metaEd" is never read
export function buildMainTable(metaEd: MetaEdEnvironment, entity: TopLevelEntity, aggregateRootTable: boolean): Table {
  const mainTable: Table = Object.assign(newTable(), {
    namespace: entity.namespace,
    schema: entity.namespace.namespaceName.toLowerCase(),
    name: entity.data.edfiOds.odsTableName,
    nameComponents: [entity.data.edfiOds.odsTableName],
    description: entity.documentation,
    parentEntity: entity,
    isEntityMainTable: true,
  });

  if (aggregateRootTable) {
    mainTable.includeCreateDateColumn = true;
    mainTable.includeLastModifiedDateAndIdColumn = true;
    mainTable.isAggregateRootTable = true;
  }

  entity.data.edfiOds.odsEntityTable = mainTable;

  return mainTable;
}

export function addTables(metaEd: MetaEdEnvironment, tables: Table[]): void {
  tables.forEach((table: Table) => {
    tableEntities(metaEd, table.namespace).set(table.name, table);
  });
}
