import { versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { getForeignKeys } from '../model/database/Table';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

// METAED-258
// MetaEd declares cascading updates at the entity level
// MetaEd uses a deterministic graph algorithm to break circular references from cascading declarations
// Existing core follows no pattern on breaking references, so this diminisher matches it
const enhancerName = 'ModifyCascadingUpdatesDefinitionsDiminisher';
const targetVersions = '2.x';

const modifyCascadingUpdates = (tablesForCoreNamespace: Map<string, Table>) => (
  parentTableName: string,
  foreignTableName: string,
  withUpdateCascade: boolean = false,
): void => {
  const table: Table | undefined = tablesForCoreNamespace.get(parentTableName);
  if (table == null) return;

  const foreignKey: ForeignKey | undefined = getForeignKeys(table).find(
    (x: ForeignKey) => x.foreignTableName === foreignTableName,
  );
  if (foreignKey == null) return;
  foreignKey.withUpdateCascade = withUpdateCascade;
};

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  const modifyCascadingUpdatesFor = modifyCascadingUpdates(tablesForCoreNamespace);
  modifyCascadingUpdatesFor('CourseOfferingCurriculumUsed', 'CourseOffering');
  modifyCascadingUpdatesFor('Section', 'CourseOffering');
  modifyCascadingUpdatesFor('StudentSectionAssociation', 'Section');
  modifyCascadingUpdatesFor('StudentGradebookEntry', 'StudentSectionAssociation', true);
  modifyCascadingUpdatesFor('TermDescriptor', 'TermType', true);

  return {
    enhancerName,
    success: true,
  };
}
