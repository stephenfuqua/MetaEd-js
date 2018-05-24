// @flow

// 3.1.X.12 - METAED-701 - METAED-761
import type { MetaEdEnvironment, ValidationFailure, SemVer, AssociationSubclass } from 'metaed-core';
import { versionSatisfies, V3OrGreater, getAllEntitiesOfType } from 'metaed-core';

const validatorName: string = 'SubclassingAnyAssociationExceptGeneralStudentProgramAssociationIsUnsupported';
const targetVersions: SemVer = V3OrGreater;

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return failures;

  ((getAllEntitiesOfType(metaEd, 'associationSubclass'): any): Array<AssociationSubclass>).forEach(
    (associationSubclass: AssociationSubclass) => {
      if (!associationSubclass.baseEntity) return;
      if (!associationSubclass.namespace.isExtension) return;
      if (associationSubclass.baseEntityName !== 'GeneralStudentProgramAssociation') {
        failures.push({
          validatorName,
          category: 'error',
          message: `${associationSubclass.typeHumanizedName} ${
            associationSubclass.metaEdName
          } is not a GeneralStudentProgramAssociation subclass.  GeneralStudentProgramAssociation subclasses are the only Association subclasses currently supported by the ODS/API.`,
          sourceMap: associationSubclass.sourceMap.type,
          fileMap: null,
        });
      }
    },
  );

  return failures;
}
