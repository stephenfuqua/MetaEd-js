// @flow

import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { Table } from 'metaed-plugin-edfi-ods';
import { tableEntities } from 'metaed-plugin-edfi-ods';
import { createTriggerUpdateChangeVersionEntities } from './EnhancerHelper';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import type { CreateTriggerUpdateChangeVersion } from '../model/CreateTriggerUpdateChangeVersion';

const enhancerName: string = 'CreateTriggerUpdateChangeVersionEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (changeQueryIndicated(metaEd)) {
    metaEd.namespace.forEach((namespace: Namespace) => {
      tableEntities(metaEd, namespace).forEach((table: Table) => {
        if (table.isAggregateRootTable) {
          const createTriggerUpdateChangeVersion: CreateTriggerUpdateChangeVersion = {
            schema: table.schema,
            tableName: table.name,
            triggerName: `${table.schema}_${table.name}_TR_UpdateChangeVersion`,
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
