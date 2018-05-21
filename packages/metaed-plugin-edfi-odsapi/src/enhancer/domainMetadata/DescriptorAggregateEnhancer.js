// @flow
import { getAllEntitiesOfType, asTopLevelEntity, normalizeEnumerationSuffix } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity, Namespace } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds, DescriptorEdfiOds } from 'metaed-plugin-edfi-ods';
import type { DescriptorEdfiOdsApi } from '../../model/Descriptor';
import type { TopLevelEntityEdfiOdsApi } from '../../model/TopLevelEntity';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import { NoAggregate } from '../../model/domainMetadata/Aggregate';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';
import { defaultOrderedAndUniqueTablesFor } from './AggregateEnhancerBase';

const enhancerName: string = 'DescriptorAggregateEnhancer';

function generateAggregate(entity: TopLevelEntity, namespace: Namespace): ?Aggregate {
  const tables: Array<Table> = defaultOrderedAndUniqueTablesFor(entity, namespace);
  if (tables.length === 0) return null;
  const aggregate: Aggregate = {
    root: ((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName,
    schema: entity.namespace.namespaceName,
    allowPrimaryKeyUpdates: entity.allowPrimaryKeyUpdates,
    isExtension: false,
    entityTables: [],
  };

  let typeAggregate: Aggregate = NoAggregate;
  if (entity.type === 'descriptor' && ((entity.data.edfiOds: any): DescriptorEdfiOds).ods_IsMapType) {
    typeAggregate = {
      root: normalizeEnumerationSuffix(entity.metaEdName),
      schema: entity.namespace.namespaceName,
      allowPrimaryKeyUpdates: false,
      isExtension: false,
      entityTables: [],
    };
    ((entity.data.edfiOdsApi: any): DescriptorEdfiOdsApi).typeAggregate = typeAggregate;
    ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.push(typeAggregate);
  }

  tables.forEach((table: Table) => {
    const entityTable: EntityTable = {
      table: table.name,
      isA: table.name === ((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName ? 'Descriptor' : null,
      isAbstract: false,
      isRequiredCollection: false,
      schema: table.schema,
      hasIsA: table.name === ((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName,
      requiresSchema: entity.namespace.isExtension,
    };

    if (typeAggregate !== NoAggregate && table.name === normalizeEnumerationSuffix(entity.metaEdName)) {
      typeAggregate.entityTables.push(entityTable);
      return;
    }

    aggregate.entityTables.push(entityTable);
  });

  return aggregate;
}

function enhanceSingleEntity(entity: TopLevelEntity) {
  const aggregate = generateAggregate(entity, entity.namespace);
  if (aggregate == null) return;
  ((entity.data.edfiOdsApi: any): TopLevelEntityEdfiOdsApi).aggregate = aggregate;
  ((entity.namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.push(aggregate);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'descriptor').forEach((modelBase: ModelBase) => {
    enhanceSingleEntity(asTopLevelEntity(modelBase));
  });

  return {
    enhancerName,
    success: true,
  };
}
