// @flow

// 3.1.X.12 - METAED-701
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    if (!domainEntitySubclass.baseEntity) return;
    if (!domainEntitySubclass.namespaceInfo.isExtension) return;
    if (domainEntitySubclass.baseEntityName !== 'EducationOrganization') {
      failures.push({
        validatorName: 'SubclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported',
        category: 'warning',
        message: `${domainEntitySubclass.typeHumanizedName} ${
          domainEntitySubclass.metaEdName
        } is not an EducationOrganization subclass.  EducationOrganization subclasses are the only Domain Entity subclasses currently supported by the ODS/API.`,
        sourceMap: domainEntitySubclass.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
