// @flow
import { getAllEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';

const enhancerName: string = 'AssociationSubclassAggregateEnhancer';

export function enhanceEntityTable(entity: TopLevelEntity, table: Table, entityTable: EntityTable): void {
  if (((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName === table.name && entity.baseEntity != null) {
    entityTable.isA = ((entity.baseEntity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName;
    entityTable.hasIsA = true;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'associationSubclass').forEach((modelBase: ModelBase) => {
    // $FlowIgnore - Flow issue #183 - Add support for destructuring parameters + default values
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.namespace, {
      enhanceEntityTable,
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
