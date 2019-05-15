import { getAllEntitiesOfType, asTopLevelEntity, normalizeEnumerationSuffix } from 'metaed-core';
import { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity, Namespace } from 'metaed-core';
import { Table, TopLevelEntityEdfiOds, DescriptorEdfiOds } from 'metaed-plugin-edfi-ods';
import { DescriptorEdfiOdsApi } from '../../model/Descriptor';
import { TopLevelEntityEdfiOdsApi } from '../../model/TopLevelEntity';
import { EntityTable } from '../../model/domainMetadata/EntityTable';
import { Aggregate } from '../../model/domainMetadata/Aggregate';
import { NoAggregate } from '../../model/domainMetadata/Aggregate';
import { NamespaceEdfiOdsApi } from '../../model/Namespace';
import { defaultOrderedAndUniqueTablesFor } from './AggregateEnhancerBase';

const enhancerName = 'DescriptorAggregateEnhancer';

function generateAggregate(entity: TopLevelEntity, namespace: Namespace): Aggregate | null {
  const tables: Table[] = defaultOrderedAndUniqueTablesFor(entity, namespace);
  if (tables.length === 0) return null;
  const aggregate: Aggregate = {
    root: (entity.data.edfiOds as TopLevelEntityEdfiOds).odsTableName,
    schema: entity.namespace.namespaceName.toLowerCase(),
    allowPrimaryKeyUpdates: entity.allowPrimaryKeyUpdates,
    isExtension: false,
    entityTables: [],
  };

  let typeAggregate: Aggregate = NoAggregate;
  if (entity.type === 'descriptor' && (entity.data.edfiOds as DescriptorEdfiOds).odsIsMapType) {
    typeAggregate = {
      root: normalizeEnumerationSuffix(entity.metaEdName),
      schema: entity.namespace.namespaceName.toLowerCase(),
      allowPrimaryKeyUpdates: false,
      isExtension: false,
      entityTables: [],
    };
    (entity.data.edfiOdsApi as DescriptorEdfiOdsApi).typeAggregate = typeAggregate;
    (namespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates.push(typeAggregate);
  }

  tables.forEach((table: Table) => {
    const entityTable: EntityTable = {
      table: table.name,
      isA: table.name === (entity.data.edfiOds as TopLevelEntityEdfiOds).odsTableName ? 'Descriptor' : null,
      isAbstract: false,
      isRequiredCollection: false,
      schema: table.schema,
      hasIsA: table.name === (entity.data.edfiOds as TopLevelEntityEdfiOds).odsTableName,
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
  (entity.data.edfiOdsApi as TopLevelEntityEdfiOdsApi).aggregate = aggregate;
  (entity.namespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates.push(aggregate);
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
