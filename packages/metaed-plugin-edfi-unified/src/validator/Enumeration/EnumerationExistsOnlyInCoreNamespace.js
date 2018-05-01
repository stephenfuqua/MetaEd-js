// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.enumeration.forEach(enumeration => {
    if (!enumeration.namespace.isExtension) return;
    failures.push({
      validatorName: 'EnumerationExistsOnlyInCoreNamespace',
      category: 'warning',
      message: `${enumeration.typeHumanizedName} ${enumeration.metaEdName} will no longer be valid in extension namespace ${
        enumeration.namespace.projectExtension
      } in future releases.  Please convert to a Descriptor.`,
      sourceMap: enumeration.sourceMap.type,
      fileMap: null,
    });
  });
  return failures;
}
