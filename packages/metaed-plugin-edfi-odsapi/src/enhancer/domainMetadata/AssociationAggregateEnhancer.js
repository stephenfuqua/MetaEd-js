// @flow
import { getEntitiesOfType, asAssociation } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult, Association } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';

const enhancerName: string = 'AssociationAggregateEnhancer';

export function enhanceEntityTable(association: Association, table: Table, entityTable: EntityTable): void {
  if (((association.data.edfiOds: any): TopLevelEntityEdfiOds).ods_TableName === table.name && association.isAbstract) {
    entityTable.isAbstract = true;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'association').forEach((modelBase: ModelBase) => {
    // $FlowIgnore - Flow issue #183 - Add support for destructuring parameters + default values
    enhanceSingleEntity(asAssociation(modelBase), metaEd.entity.namespaceInfo, { enhanceEntityTable });
  });

  return {
    enhancerName,
    success: true,
  };
}
