// @flow
import type { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.choice.forEach(property => {
    const referencedEntity: ?ModelBase = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'choice',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'ChoicePropertyMustMatchAChoice',
        category: 'error',
        message: `Choice property '${property.metaEdName}' does not match any declared Choice.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
