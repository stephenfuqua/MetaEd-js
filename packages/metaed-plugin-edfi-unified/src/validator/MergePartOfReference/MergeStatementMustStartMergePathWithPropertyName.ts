import { PropertyType, MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getPropertiesOfType, asReferentialProperty } from 'metaed-core';

const validPropertyTypes: Array<PropertyType> = [
  'association',
  'choice',
  'common',
  'descriptor',
  'domainEntity',
  'enumeration',
  'inlineCommon',
  'schoolYearEnumeration',
  'sharedDecimal',
  'sharedInteger',
  'sharedShort',
  'sharedString',
];
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getPropertiesOfType(metaEd.propertyIndex, ...validPropertyTypes).forEach(property => {
    // TODO: As of METAED-881, the current property here could also be one of the shared simple properties, which
    // are not currently extensions of ReferentialProperty but have an equivalent mergedProperties field
    const referentialProperty = asReferentialProperty(property);
    referentialProperty.mergedProperties.forEach(mergedProperty => {
      const prefix: string =
        referentialProperty.withContext && referentialProperty.withContext !== referentialProperty.metaEdName
          ? referentialProperty.withContext
          : '';
      if (mergedProperty.mergePropertyPath[0] === `${prefix}${referentialProperty.metaEdName}`) return;

      failures.push({
        validatorName: 'MergeStatementMustStartMergePathWithPropertyName',
        category: 'error',
        message: `Merge statement must start first property path with the current property ${
          prefix ? 'context and ' : ''
        }name: ${prefix}${referentialProperty.metaEdName}.`,
        sourceMap: mergedProperty.sourceMap.mergePropertyPath[0],
        fileMap: null,
      });
    });
  });
  return failures;
}
