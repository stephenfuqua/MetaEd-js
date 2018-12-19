import { getAllEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity } from 'metaed-core';
import { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';
import { EntityTable } from '../../model/domainMetadata/EntityTable';

const enhancerName = 'DomainEntitySubclassAggregateEnhancer';

export function enhanceEntityTable(entity: TopLevelEntity, table: Table, entityTable: EntityTable): void {
  if ((entity.data.edfiOds as TopLevelEntityEdfiOds).odsTableName === table.name && entity.baseEntity != null) {
    entityTable.isA = (entity.baseEntity.data.edfiOds as TopLevelEntityEdfiOds).odsTableName;
    entityTable.hasIsA = true;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'domainEntitySubclass').forEach((modelBase: ModelBase) => {
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.namespace, enhanceEntityTable);
  });

  return {
    enhancerName,
    success: true,
  };
}
