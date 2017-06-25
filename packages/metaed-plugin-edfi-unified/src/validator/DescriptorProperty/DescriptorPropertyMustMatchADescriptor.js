// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.descriptor.forEach(descriptorProperty => {
    if (metaEd.entity.descriptor.has(descriptorProperty.metaEdName)) return;
    failures.push({
      validatorName: 'DescriptorPropertyMustMatchADescriptor',
      category: 'error',
      message: `Descriptor property ${descriptorProperty.metaEdName} does not match any declared descriptor.`,
      sourceMap: descriptorProperty.sourceMap.type,
      fileMap: null,
    });
  });
  return failures;
}
