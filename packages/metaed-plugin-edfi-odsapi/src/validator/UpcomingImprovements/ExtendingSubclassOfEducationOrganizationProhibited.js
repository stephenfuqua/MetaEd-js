// @flow

// 2.1.X.1 - METAED-701
import type { MetaEdEnvironment, ValidationFailure, TopLevelEntity } from 'metaed-core';

function isEducationOrganizationSubclass(topLevelEntity: TopLevelEntity): boolean {
  if (topLevelEntity.type !== 'domainEntitySubclass') return false;
  if (topLevelEntity.baseEntityName === 'EducationOrganization') return true;
  if (topLevelEntity.baseEntity) return isEducationOrganizationSubclass(topLevelEntity.baseEntity);
  return false;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntityExtension.forEach(domainEntityExtension => {
    if (!domainEntityExtension.baseEntity) return;
    if (isEducationOrganizationSubclass(domainEntityExtension.baseEntity)) {
      failures.push({
        validatorName: 'ExtendingSubclassOfEducationOrganizationProhibited',
        category: 'warning',
        message: `${domainEntityExtension.typeHumanizedName} ${domainEntityExtension.metaEdName} is an extension of an EducationOrganization subclass.  The ODS/API does not currently support this pattern and will fail to build.`,
        sourceMap: domainEntityExtension.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
