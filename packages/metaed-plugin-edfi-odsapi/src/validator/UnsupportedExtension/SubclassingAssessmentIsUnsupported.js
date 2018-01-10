// @flow

// 3.1.X.6 - METAED-701 - ODS-1324
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    if (!domainEntitySubclass.baseEntity) return;
    if (!domainEntitySubclass.namespaceInfo.isExtension) return;
    if (domainEntitySubclass.baseEntityName === 'Assessment') {
      failures.push({
        validatorName: 'SubclassingAssessmentIsUnsupported',
        category: 'warning',
        message: `[ODS-1324] ${domainEntitySubclass.typeHumanizedName} ${
          domainEntitySubclass.metaEdName
        } is an Assessment subclass.  Assessment subclasses are currently unsupported by the ODS/API.`,
        sourceMap: domainEntitySubclass.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
