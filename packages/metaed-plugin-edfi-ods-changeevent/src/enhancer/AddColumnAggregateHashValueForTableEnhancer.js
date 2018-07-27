// @flow

import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { Table } from 'metaed-plugin-edfi-ods';
import { tableEntities } from 'metaed-plugin-edfi-ods';
import { addColumnAggregateHashValueForTableEntities } from './EnhancerHelper';
import { twoDotXIndicated } from './ChangeEventIndicator';
import type { AddColumnAggregateHashValueForTable } from '../model/AddColumnAggregateHashValueForTable';

const enhancerName: string = 'AddColumnAggregateHashValueForTableEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    if (twoDotXIndicated(metaEd, namespace)) {
      tableEntities(metaEd, namespace).forEach((table: Table) => {
        if (table.isAggregateRootTable) {
          const addColumnAggregateHashValueForTable: AddColumnAggregateHashValueForTable = {
            schema: table.schema,
            tableName: table.name,
          };
          addColumnAggregateHashValueForTableEntities(metaEd, namespace).push(addColumnAggregateHashValueForTable);
        }
      });
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
