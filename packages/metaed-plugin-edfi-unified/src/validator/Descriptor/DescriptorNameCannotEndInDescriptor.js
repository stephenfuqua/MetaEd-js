// @flow
import type { MetaEdEnvironment, ValidationFailure, DescriptorSourceMap, Namespace } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.descriptor.forEach(descriptor => {
      if (descriptor.metaEdName.endsWith('Descriptor')) {
        failures.push({
          validatorName: 'DescriptorNameCannotEndInDescriptor',
          category: 'error',
          message: `Descriptor ${
            descriptor.metaEdName
          } name is invalid.  Descriptor names cannot be suffixed with 'Descriptor'.`,
          sourceMap: ((descriptor.sourceMap: any): DescriptorSourceMap).metaEdName,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
