// @flow
import { getEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';

const enhancerName: string = 'DomainEntityAggregateEnhancer';

export function enhanceEntityTable(entity: TopLevelEntity, table: Table, entityTable: EntityTable): void {
  if (((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName === table.name && entity.isAbstract) {
    entityTable.isAbstract = true;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'domainEntity').forEach((modelBase: ModelBase) => {
    // $FlowIgnore - Flow issue #183 - Add support for destructuring parameters + default values
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.entity.namespaceInfo, {
      enhanceEntityTable,
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
