import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, ModelBase } from 'metaed-core';
import { addTables } from './TableCreatingEntityEnhancerBase';
import { enumerationTableCreator } from './EnumerationTableCreator';
import { Table } from '../../model/database/Table';

const enhancerName = 'EnumerationTableEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'enumeration').forEach((entity: ModelBase) => {
    const table: Table = enumerationTableCreator.build(metaEd, entity.metaEdName, entity.namespace, entity.documentation);
    entity.data.edfiOds.odsTables = [table];
    entity.data.edfiOds.odsEntityTable = table;
    addTables(metaEd, [table]);
  });

  return {
    enhancerName,
    success: true,
  };
}
