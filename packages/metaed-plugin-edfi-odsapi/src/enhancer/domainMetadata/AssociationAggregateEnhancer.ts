import { getAllEntitiesOfType, asAssociation } from 'metaed-core';
import { MetaEdEnvironment, ModelBase, EnhancerResult, Association } from 'metaed-core';
import { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';
import { EntityTable } from '../../model/domainMetadata/EntityTable';

const enhancerName = 'AssociationAggregateEnhancer';

export function enhanceEntityTable(association: Association, table: Table, entityTable: EntityTable): void {
  if ((association.data.edfiOds as TopLevelEntityEdfiOds).odsTableName === table.name && association.isAbstract) {
    entityTable.isAbstract = true;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'association').forEach((modelBase: ModelBase) => {
    enhanceSingleEntity(asAssociation(modelBase), metaEd.namespace, enhanceEntityTable);
  });

  return {
    enhancerName,
    success: true,
  };
}
