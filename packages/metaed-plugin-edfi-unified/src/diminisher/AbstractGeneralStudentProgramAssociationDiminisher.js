// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, Association, ModelBase } from 'metaed-core';
import { versionSatisfies, V3OrGreater, getEntitiesOfType, asAssociation } from 'metaed-core';

// METAED-769
// Forces GeneralStudentProgramAssociation to be abstract
// Pending fix in METAED-766 to add language support for abstract associations.
const enhancerName: string = 'AbstractGeneralStudentProgramAssociationDiminisher';
const targetVersions: string = V3OrGreater;

const generalStudentProgramAssociationName: string = 'GeneralStudentProgramAssociation';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const generalStudentProgramAssociation: Association = R.head(
    getEntitiesOfType(metaEd.entity, 'association')
      .map((entity: ModelBase) => asAssociation(entity))
      .filter(
        (association: Association) =>
          !association.namespace.isExtension && association.metaEdName === generalStudentProgramAssociationName,
      ),
  );

  if (generalStudentProgramAssociation != null) generalStudentProgramAssociation.isAbstract = true;

  return {
    enhancerName,
    success: true,
  };
}
