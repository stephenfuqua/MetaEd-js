import { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityFromNamespaceChain } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.descriptor.forEach(property => {
    const referencedEntity: ModelBase | null = getEntityFromNamespaceChain(
      property.metaEdName,
      property.referencedNamespaceName,
      property.namespace,
      'descriptor',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'DescriptorPropertyMustMatchADescriptor',
        category: 'error',
        message: `Descriptor property ${property.metaEdName} does not match any declared descriptor in namespace ${
          property.referencedNamespaceName
        }.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });
  return failures;
}
