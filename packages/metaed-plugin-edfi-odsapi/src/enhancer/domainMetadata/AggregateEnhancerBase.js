// @flow
import R from 'ramda';
import type { Namespace, TopLevelEntity } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import type { TopLevelEntityEdfiOdsApi } from '../../model/TopLevelEntity';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';

export type EnhanceEntityTable = (entity: TopLevelEntity, table: Table, entityTable: EntityTable) => void;
export type IsAggregateExtension = () => boolean;
export type OrderedAndUniqueTablesFor = (entity: TopLevelEntity, namespace: Namespace) => Array<Table>;

export type EnhanceSingleEntityOptions = {
  enhanceEntityTable: EnhanceEntityTable,
  isAggregateExtension: IsAggregateExtension,
  orderedAndUniqueTablesFor: OrderedAndUniqueTablesFor,
};

// eslint-disable-next-line no-unused-vars
export function nullEnhanceEntityTable(entity: TopLevelEntity, table: Table, entityTable: EntityTable): void {}

export function defaultOrderedAndUniqueTablesFor(entity: TopLevelEntity, namespace: Namespace): Array<Table> {
  const tablesForNamespace = ((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_Tables.filter(
    (t: Table) => t.schema === namespace.namespaceName,
  );
  // TODO: why is unique necessary?
  const uniquedTables = R.uniqBy(R.prop('name'), tablesForNamespace);
  return R.sortBy(R.prop('name'), uniquedTables);
}

function generateAggregate(
  entity: TopLevelEntity,
  namespace: Namespace,
  { enhanceEntityTable, isAggregateExtension, orderedAndUniqueTablesFor }: EnhanceSingleEntityOptions,
): ?Aggregate {
  const tables: Array<Table> = orderedAndUniqueTablesFor(entity, namespace).filter(
    (table: Table) => !table.hideFromApiMetadata,
  );
  if (tables.length === 0) return null;
  const aggregate: Aggregate = {
    root: ((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName,
    schema: entity.namespace.namespaceName,
    allowPrimaryKeyUpdates: entity.allowPrimaryKeyUpdates,
    isExtension: isAggregateExtension(),
    entityTables: [],
  };

  tables.forEach((table: Table) => {
    const entityTable: EntityTable = {
      table: table.name,
      isA: null,
      isAbstract: false,
      isRequiredCollection: table.isRequiredCollectionTable,
      schema: table.schema,
      hasIsA: false,
      requiresSchema: namespace.isExtension,
    };
    enhanceEntityTable(entity, table, entityTable);
    aggregate.entityTables.push(entityTable);
  });
  return aggregate;
}

export function enhanceSingleEntity(
  entity: TopLevelEntity,
  namespaceMap: Map<string, Namespace>,
  {
    enhanceEntityTable = nullEnhanceEntityTable,
    isAggregateExtension = () => false,
    orderedAndUniqueTablesFor = defaultOrderedAndUniqueTablesFor,
  }: EnhanceSingleEntityOptions = {},
) {
  const entityNamespace = R.head(
    Array.from(namespaceMap.values()).filter(n => n.namespaceName === entity.namespace.namespaceName),
  );
  const aggregate = generateAggregate(entity, entityNamespace, {
    enhanceEntityTable,
    isAggregateExtension,
    orderedAndUniqueTablesFor,
  });
  if (aggregate == null) return;
  ((entity.data.edfiOdsApi: any): TopLevelEntityEdfiOdsApi).aggregate = aggregate;
  ((entityNamespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.push(aggregate);
}
