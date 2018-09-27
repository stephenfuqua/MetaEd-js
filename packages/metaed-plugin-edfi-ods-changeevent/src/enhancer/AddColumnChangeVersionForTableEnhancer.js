// @flow

import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { Table } from 'metaed-plugin-edfi-ods';
import { tableEntities } from 'metaed-plugin-edfi-ods';
import { addColumnChangeVersionForTableEntities } from './EnhancerHelper';
import { twoDotXIndicated } from './ChangeEventIndicator';
import type { AddColumnChangeVersionForTable } from '../model/AddColumnChangeVersionForTable';

const enhancerName: string = 'AddColumnChangeVersionForTableEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    if (twoDotXIndicated(metaEd, namespace)) {
      tableEntities(metaEd, namespace).forEach((table: Table) => {
        if (table.isAggregateRootTable) {
          const addColumnChangeVersionForTable: AddColumnChangeVersionForTable = {
            schema: table.schema,
            tableName: table.name,
          };
          addColumnChangeVersionForTableEntities(metaEd, namespace).push(addColumnChangeVersionForTable);
        }
      });
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
