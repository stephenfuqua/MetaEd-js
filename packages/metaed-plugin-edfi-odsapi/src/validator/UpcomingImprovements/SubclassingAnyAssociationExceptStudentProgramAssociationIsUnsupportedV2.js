// @flow

// 3.1.X.12 - METAED-701 - METAED-761
import type { MetaEdEnvironment, ValidationFailure, SemVer } from 'metaed-core';
import { versionSatisfies, V2Only } from 'metaed-core';

const validatorName: string = 'SubclassingAnyAssociationExceptStudentProgramAssociationIsUnsupportedV2';
const targetVersions: SemVer = V2Only;

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return failures;

  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    if (!associationSubclass.baseEntity) return;
    if (!associationSubclass.namespaceInfo.isExtension) return;
    if (associationSubclass.baseEntityName !== 'StudentProgramAssociation') {
      failures.push({
        validatorName,
        category: 'error',
        message: `${associationSubclass.typeHumanizedName} ${
          associationSubclass.metaEdName
        } is not a StudentProgramAssociation subclass.  StudentProgramAssociation subclasses are the only Association subclasses currently supported by the ODS/API.`,
        sourceMap: associationSubclass.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
