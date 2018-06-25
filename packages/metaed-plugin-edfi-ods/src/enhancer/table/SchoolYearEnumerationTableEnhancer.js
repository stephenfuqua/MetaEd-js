// @flow
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, ModelBase } from 'metaed-core';
import { addTables } from '../table/TableCreatingEntityEnhancerBase';
import { schoolYearEnumerationTableCreator } from './SchoolYearEnumerationTableCreator';
import type { Table } from '../../model/database/Table';

const enhancerName: string = 'SchoolYearEnumerationTableEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'schoolYearEnumeration').forEach(
    (entity: ModelBase) => {
      const table: Table = schoolYearEnumerationTableCreator.build(metaEd, entity.namespace, entity.documentation);
      entity.data.edfiOds.ods_Tables = [table];
      entity.data.edfiOds.ods_EntityTable = table;
      addTables(metaEd, [table]);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
