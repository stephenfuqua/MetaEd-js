// @flow
import type { PropertyType, MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getPropertiesOfType, asReferentialProperty } from 'metaed-core';

const validTypes: Array<PropertyType> = ['common', 'inlineCommon', 'choice', 'association', 'domainEntity'];

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getPropertiesOfType(metaEd.propertyIndex, ...validTypes).forEach(property => {
    if (!property.mergedProperties) return;
    asReferentialProperty(property).mergedProperties.forEach(mergedProperty => {
      const prefix: string =
        property.withContext && property.withContext !== property.metaEdName ? property.withContext : '';
      if (mergedProperty.mergePropertyPath[0] === `${prefix}${property.metaEdName}`) return;

      failures.push({
        validatorName: 'MergeStatementMustStartMergePathWithPropertyName',
        category: 'error',
        message: `Merge statement must start first property path with the current property ${
          prefix ? 'context and ' : ''
        }name: ${prefix}${property.metaEdName}.`,
        sourceMap: mergedProperty.sourceMap.mergePropertyPath[0],
        fileMap: null,
      });
    });
  });
  return failures;
}
