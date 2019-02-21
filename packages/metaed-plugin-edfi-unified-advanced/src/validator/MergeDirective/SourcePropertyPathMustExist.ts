import { PropertyType, MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getPropertiesOfType, asReferentialProperty } from 'metaed-core';
import { failReferencedPropertyDoesNotExist } from './FailReferencedPropertyDoesNotExist';

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
    // are not currently extensions of ReferentialProperty but have an equivalent mergeDirectives field
    const referentialProperty = asReferentialProperty(property);
    referentialProperty.mergeDirectives.forEach(mergeDirective => {
      failReferencedPropertyDoesNotExist(
        'SourcePropertyPathMustExist',
        referentialProperty.namespace,
        referentialProperty.parentEntity,
        mergeDirective.sourcePropertyPath,
        mergeDirective.targetPropertyPath[0],
        mergeDirective.sourceMap.sourcePropertyPath[0],
        failures,
      );
    });
  });

  return failures;
}
