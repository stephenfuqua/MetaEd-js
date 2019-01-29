import { versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { addColumn } from '../model/database/Table';
import { renameForeignKeyColumn } from './DiminisherHelper';
import { newDateColumn } from '../model/database/Column';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { Column } from '../model/database/Column';
import { Table } from '../model/database/Table';

// METAED-246
// EdFi ODS 2.x has StudentLearningObjective with extra BeginDate
const enhancerName = 'AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher';
const targetVersions = '2.x';

const studentLearningObjective = 'StudentLearningObjective';
const studentSectionAssociation = 'StudentSectionAssociation';
const beginDate = 'BeginDate';
const studentSectionAssociationBeginDate: string = studentSectionAssociation + beginDate;

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  const table: Table | undefined = tablesForCoreNamespace.get(studentLearningObjective);
  if (table != null && table.columns.find((x: Column) => x.name === studentSectionAssociationBeginDate) == null) {
    const column: Column = Object.assign(newDateColumn(), {
      name: studentSectionAssociationBeginDate,
      isNullable: true,
    });
    addColumn(table, column);
    renameForeignKeyColumn(
      table,
      studentSectionAssociation,
      beginDate,
      beginDate,
      beginDate,
      studentSectionAssociationBeginDate,
    );
  }

  return {
    enhancerName,
    success: true,
  };
}
