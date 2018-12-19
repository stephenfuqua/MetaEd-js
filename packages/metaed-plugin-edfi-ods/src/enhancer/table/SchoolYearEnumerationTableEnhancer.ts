import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, ModelBase } from 'metaed-core';
import { addTables } from './TableCreatingEntityEnhancerBase';
import { schoolYearEnumerationTableCreator } from './SchoolYearEnumerationTableCreator';
import { Table } from '../../model/database/Table';

const enhancerName = 'SchoolYearEnumerationTableEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'schoolYearEnumeration').forEach(
    (entity: ModelBase) => {
      const table: Table = schoolYearEnumerationTableCreator.build(metaEd, entity.namespace, entity.documentation);
      entity.data.edfiOds.odsTables = [table];
      entity.data.edfiOds.odsEntityTable = table;
      addTables(metaEd, [table]);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
