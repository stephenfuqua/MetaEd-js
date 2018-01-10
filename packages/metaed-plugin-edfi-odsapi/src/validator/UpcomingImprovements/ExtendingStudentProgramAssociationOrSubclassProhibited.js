// @flow

// 2.2.X.1 - METAED-701 - ODS-827
import type { MetaEdEnvironment, ValidationFailure, TopLevelEntity } from 'metaed-core';

function isStudentProgramAssociationOrSubclass(topLevelEntity: TopLevelEntity): boolean {
  if (topLevelEntity.metaEdName === 'StudentProgramAssociation') return true;
  if (topLevelEntity.type !== 'associationSubclass') return false;
  if (topLevelEntity.baseEntity) return isStudentProgramAssociationOrSubclass(topLevelEntity.baseEntity);
  return false;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.associationExtension.forEach(associationExtension => {
    if (!associationExtension.baseEntity) return;
    if (isStudentProgramAssociationOrSubclass(associationExtension.baseEntity)) {
      failures.push({
        validatorName: 'ExtendingStudentProgramAssociationOrSubclassProhibited',
        category: 'warning',
        message: `[ODS-827] ${associationExtension.typeHumanizedName} ${
          associationExtension.metaEdName
        } is an extension of StudentProgramAssociation or its subclass.  The ODS/API does not currently support this pattern and will fail to build.`,
        sourceMap: associationExtension.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
