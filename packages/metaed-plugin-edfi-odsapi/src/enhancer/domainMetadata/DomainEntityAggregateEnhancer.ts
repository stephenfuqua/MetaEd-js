import { getAllEntitiesOfType, asTopLevelEntity, asDomainEntity } from 'metaed-core';
import { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity, DomainEntity } from 'metaed-core';
import { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';
import { EntityTable } from '../../model/domainMetadata/EntityTable';

const enhancerName = 'DomainEntityAggregateEnhancer';

export function enhanceEntityTable(entity: TopLevelEntity, table: Table, entityTable: EntityTable): void {
  const domainEntity: DomainEntity = asDomainEntity(entity);
  if ((domainEntity.data.edfiOds as TopLevelEntityEdfiOds).odsTableName === table.name && domainEntity.isAbstract) {
    entityTable.isAbstract = true;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'domainEntity').forEach((modelBase: ModelBase) => {
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.namespace, enhanceEntityTable);
  });

  return {
    enhancerName,
    success: true,
  };
}
