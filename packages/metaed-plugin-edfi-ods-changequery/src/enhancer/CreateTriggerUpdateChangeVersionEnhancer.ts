import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { Table } from 'metaed-plugin-edfi-ods-relational';
import { tableEntities } from 'metaed-plugin-edfi-ods-relational';
import { createTriggerUpdateChangeVersionEntities } from './EnhancerHelper';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { CreateTriggerUpdateChangeVersion } from '../model/CreateTriggerUpdateChangeVersion';

const enhancerName = 'CreateTriggerUpdateChangeVersionEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (changeQueryIndicated(metaEd)) {
    metaEd.namespace.forEach((namespace: Namespace) => {
      tableEntities(metaEd, namespace).forEach((table: Table) => {
        if (table.isAggregateRootTable) {
          const createTriggerUpdateChangeVersion: CreateTriggerUpdateChangeVersion = {
            schema: table.schema,
            tableName: table.data.edfiOdsSqlServer.tableName,
            triggerName: `${table.schema}_${table.data.edfiOdsSqlServer.tableName}_TR_UpdateChangeVersion`,
          };
          createTriggerUpdateChangeVersionEntities(metaEd, namespace).push(createTriggerUpdateChangeVersion);
        }
      });
    });
  }
  return {
    enhancerName,
    success: true,
  };
}
