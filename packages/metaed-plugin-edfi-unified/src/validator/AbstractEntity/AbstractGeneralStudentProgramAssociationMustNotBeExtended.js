// @flow
import { versionSatisfies, V3OrGreater } from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure, AssociationExtension } from 'metaed-core';

// METAED-805
const validatorName: string = 'AbstractGeneralStudentProgramAssociationMustNotBeExtended';
const targetVersions: string = V3OrGreater;

const generalStudentProgramAssociationName: string = 'GeneralStudentProgramAssociation';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return [];

  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach(namespace => {
    namespace.entity.associationExtension.forEach((extensionEntity: AssociationExtension) => {
      if (extensionEntity.metaEdName !== generalStudentProgramAssociationName) return;

      failures.push({
        validatorName,
        category: 'error',
        message: `Abstract Association ${
          extensionEntity.metaEdName
        } additions is not valid.  Abstract entities cannot be extended.`,
        sourceMap: extensionEntity.sourceMap.type,
        fileMap: null,
      });
    });
  });

  return failures;
}
