// @flow
import type { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(property => {
    const referencedEntity: ?ModelBase = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'sharedInteger',
    );

    if (referencedEntity != null) {
      failures.push({
        validatorName: 'DecimalPropertyMustNotMatchASharedInteger',
        category: 'error',
        message: `Decimal Property ${property.metaEdName} has the same name as a Shared Integer.`,
        sourceMap: property.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
