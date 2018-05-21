// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { addColumn } from '../model/database/Table';
import { newIntegerColumn } from '../model/database/Column';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Column } from '../model/database/Column';
import type { Table } from '../model/database/Table';

// METAED-251
// EdFi ODS 2.x has GradingPeriodType table with extra column
const enhancerName: string = 'AddExtraPeriodSequenceColumnToGradingPeriodTypeDiminisher';
const targetVersions: string = '2.x';

const gradingPeriodType: string = 'GradingPeriodType';
const periodSequence: string = 'PeriodSequence';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  const table: ?Table = tablesForCoreNamespace.get(gradingPeriodType);
  if (table != null && table.columns.find((x: Column) => x.name === periodSequence) == null) {
    const column: Column = Object.assign(newIntegerColumn(), {
      name: periodSequence,
      isNullable: true,
    });
    addColumn(table, column);
  }

  return {
    enhancerName,
    success: true,
  };
}
