import { versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { ColumnDataTypes } from '../model/database/ColumnDataTypes';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { Column, StringColumn } from '../model/database/Column';
import { Table } from '../model/database/Table';

// METAED-247
// Ed-Fi ODS 2.x EducationContentDerivativeSourceLearningResourceMetadataURI and EducationContentDerivativeSourceURI
// tables need DerivativeSource context on URI column

// METAED-261
// Datatype mismatch
const enhancerName = 'AddRoleNameFromEducationContentDSLRMUriDiminisher';
const targetVersions = '2.x';

const derivativeSourceLearningResourceMetadataURI = 'DerivativeSourceLearningResourceMetadataURI';
const derivativeSourceURI = 'DerivativeSourceURI';
const educationContentDerivativeSourceLearningResourceMetadataURI =
  'EducationContentDerivativeSourceLearningResourceMetadataURI';
const educationContentDerivativeSourceURI = 'EducationContentDerivativeSourceURI';
const learningResourceMetadataURI = 'LearningResourceMetadataURI';
const uri = 'URI';

function renameAndTruncateEducationContentDerivativeSourceLearningResourceMetadataURI(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: Table | undefined = tablesForCoreNamespace.get(educationContentDerivativeSourceLearningResourceMetadataURI);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === learningResourceMetadataURI) != null) return;

  const column: Column | undefined = table.columns.find(
    (x: Column) => x.name === derivativeSourceLearningResourceMetadataURI,
  );
  if (column == null) return;

  column.name = learningResourceMetadataURI;
  column.dataType = ColumnDataTypes.string('225');
  ((column as unknown) as StringColumn).length = '225';
}

function renameAndTruncateEducationContentDerivativeSourceURI(tablesForCoreNamespace: Map<string, Table>): void {
  const table: Table | undefined = tablesForCoreNamespace.get(educationContentDerivativeSourceURI);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === uri) != null) return;

  const column: Column | undefined = table.columns.find((x: Column) => x.name === derivativeSourceURI);
  if (column == null) return;

  column.name = uri;
  column.dataType = ColumnDataTypes.string('225');
  ((column as unknown) as StringColumn).length = '225';
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameAndTruncateEducationContentDerivativeSourceLearningResourceMetadataURI(tablesForCoreNamespace);
  renameAndTruncateEducationContentDerivativeSourceURI(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
