// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { ForeignKey } from '../model/database/ForeignKey';
import type { Table } from '../model/database/Table';

// METAED-77
// Adjusting name to duplicate the word 'Assessment' for GraduationPlanRequiredAssessmentPerformanceLevel
const enhancerName: string = 'GraduationPlanRequiredAssessmentPerformanceLevelDiminisher';
const targetVersions: string = '2.x';

const graduationPlanRequiredAssessmentPerformanceLevel: string = 'GraduationPlanRequiredAssessmentPerformanceLevel';
const graduationPlanRequiredAssessmentAssessmentPerformanceLevel: string =
  'GraduationPlanRequiredAssessmentAssessmentPerformanceLevel';

function renameGraduationPlanRequiredAssessmentPerformanceLevelTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(graduationPlanRequiredAssessmentPerformanceLevel);
  const targetTable: ?Table = tablesForCoreNamespace.get(graduationPlanRequiredAssessmentAssessmentPerformanceLevel);
  if (table == null || targetTable != null) return;

  table.name = graduationPlanRequiredAssessmentAssessmentPerformanceLevel;
  tablesForCoreNamespace.set(table.name, table);
  tablesForCoreNamespace.delete(graduationPlanRequiredAssessmentPerformanceLevel);

  table.foreignKeys.forEach((fk: ForeignKey) => {
    fk.parentTableName = table.name;
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameGraduationPlanRequiredAssessmentPerformanceLevelTable(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
