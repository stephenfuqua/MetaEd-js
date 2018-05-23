// @flow

// 3.1.X.12 - METAED-701 - METAED-761
import type { MetaEdEnvironment, ValidationFailure, AssociationSubclass } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  ((getAllEntitiesOfType(metaEd, 'associationSubclass'): any): Array<AssociationSubclass>).forEach(
    (associationSubclass: AssociationSubclass) => {
      if (!associationSubclass.baseEntity) return;
      if (!associationSubclass.namespace.isExtension) return;
      if (associationSubclass.baseEntityName !== 'StudentProgramAssociation') {
        failures.push({
          validatorName: 'SubclassingAnyAssociationExceptStudentProgramAssociationIsUnsupported',
          category: 'error',
          message: `${associationSubclass.typeHumanizedName} ${
            associationSubclass.metaEdName
          } is not a StudentProgramAssociation subclass.  StudentProgramAssociation subclasses are the only Association subclasses currently supported by the ODS/API.`,
          sourceMap: associationSubclass.sourceMap.type,
          fileMap: null,
        });
      }
    },
  );

  return failures;
}
