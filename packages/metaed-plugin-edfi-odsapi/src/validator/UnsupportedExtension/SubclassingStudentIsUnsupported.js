// @flow

// 3.1.X.11 - METAED-701
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    if (!domainEntitySubclass.baseEntity) return;
    if (!domainEntitySubclass.namespaceInfo.isExtension) return;
    if (domainEntitySubclass.baseEntityName === 'Student') {
      failures.push({
        validatorName: 'SubclassingStudentIsUnsupported',
        category: 'warning',
        message: `${domainEntitySubclass.typeHumanizedName} ${domainEntitySubclass.metaEdName} is a Student subclass.  Student subclasses are currently unsupported by the ODS/API.`,
        sourceMap: domainEntitySubclass.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
