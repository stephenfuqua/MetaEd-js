// @flow

// 3.1.X.11 - METAED-701 - ODS-1324 - ODS-1183
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
        message: `[ODS-1183] [ODS-1324] ${domainEntitySubclass.typeHumanizedName} ${
          domainEntitySubclass.metaEdName
        } is a Student subclass.  Student subclasses are currently unsupported by the ODS/API.`,
        sourceMap: domainEntitySubclass.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
