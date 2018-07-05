// @flow
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, ModelBase } from 'metaed-core';
import { addTables } from './TableCreatingEntityEnhancerBase';
import { enumerationTableCreator } from './EnumerationTableCreator';
import type { Table } from '../../model/database/Table';

const enhancerName: string = 'EnumerationTableEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'enumeration').forEach((entity: ModelBase) => {
    const table: Table = enumerationTableCreator.build(metaEd, entity.metaEdName, entity.namespace, entity.documentation);
    entity.data.edfiOds.ods_Tables = [table];
    entity.data.edfiOds.ods_EntityTable = table;
    addTables(metaEd, [table]);
  });

  return {
    enhancerName,
    success: true,
  };
}
