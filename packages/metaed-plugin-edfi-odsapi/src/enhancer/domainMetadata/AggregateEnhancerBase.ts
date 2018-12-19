import R from 'ramda';
import { Namespace, TopLevelEntity } from 'metaed-core';
import { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { TopLevelEntityEdfiOdsApi } from '../../model/TopLevelEntity';
import { NamespaceEdfiOdsApi } from '../../model/Namespace';
import { Aggregate } from '../../model/domainMetadata/Aggregate';
import { EntityTable } from '../../model/domainMetadata/EntityTable';

export type EnhanceEntityTable = (entity: TopLevelEntity, table: Table, entityTable: EntityTable) => void;
export type IsAggregateExtension = () => boolean;
export type OrderedAndUniqueTablesFor = (entity: TopLevelEntity, namespace: Namespace) => Array<Table>;

// @ts-ignore - parameters never read
export function nullEnhanceEntityTable(entity: TopLevelEntity, table: Table, entityTable: EntityTable): void {} // eslint-disable-line no-unused-vars

export function defaultOrderedAndUniqueTablesFor(entity: TopLevelEntity, namespace: Namespace): Array<Table> {
  const tablesForNamespace = (entity.data.edfiOds as TopLevelEntityEdfiOds).odsTables.filter(
    (t: Table) => t.schema === namespace.namespaceName,
  );
  // TODO: why is unique necessary?
  const uniquedTables = R.uniqBy(R.prop('name'), tablesForNamespace);
  return R.sortBy(R.prop('name'), uniquedTables);
}

function generateAggregate(
  entity: TopLevelEntity,
  namespace: Namespace,
  enhanceEntityTable: EnhanceEntityTable,
  isAggregateExtension: IsAggregateExtension,
  orderedAndUniqueTablesFor: OrderedAndUniqueTablesFor,
): Aggregate | null {
  const tables: Array<Table> = orderedAndUniqueTablesFor(entity, namespace).filter(
    (table: Table) => !table.hideFromApiMetadata,
  );
  if (tables.length === 0) return null;
  const aggregate: Aggregate = {
    root: (entity.data.edfiOds as TopLevelEntityEdfiOds).odsTableName,
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
  enhanceEntityTable: EnhanceEntityTable = nullEnhanceEntityTable,
  isAggregateExtension: IsAggregateExtension = () => false,
  orderedAndUniqueTablesFor: OrderedAndUniqueTablesFor = defaultOrderedAndUniqueTablesFor,
) {
  const entityNamespace = R.head(
    Array.from(namespaceMap.values()).filter(n => n.namespaceName === entity.namespace.namespaceName),
  );
  const aggregate = generateAggregate(
    entity,
    entityNamespace,
    enhanceEntityTable,
    isAggregateExtension,
    orderedAndUniqueTablesFor,
  );
  if (aggregate == null) return;
  (entity.data.edfiOdsApi as TopLevelEntityEdfiOdsApi).aggregate = aggregate;
  (entityNamespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates.push(aggregate);
}
