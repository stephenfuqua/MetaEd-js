import {
  ShortProperty,
  StringProperty,
  DecimalProperty,
  IntegerProperty,
  MetaEdEnvironment,
  PropertyIndex,
  ValidationFailure,
} from 'metaed-core';
import { groupByMetaEdName } from '../../shared/GroupByMetaEdName';

type SimpleProperties = ShortProperty | DecimalProperty | IntegerProperty | StringProperty;

function propertiesNeedingDuplicateChecking(properties: PropertyIndex): Array<SimpleProperties> {
  const result: Array<SimpleProperties> = [];

  result.push(...properties.string);
  result.push(...properties.decimal);
  result.push(...properties.integer);
  result.push(...properties.short);
  result.push(...properties.sharedString);
  result.push(...properties.sharedDecimal);
  result.push(...properties.sharedInteger);
  result.push(...properties.sharedShort);
  return result;
}

function generateValidationErrorsForDuplicates(metaEdProperty: Array<SimpleProperties>): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  groupByMetaEdName(metaEdProperty).forEach((properties, metaEdName) => {
    if (properties.length > 1) {
      properties.forEach(property => {
        failures.push({
          validatorName: 'SimplePropertiesCannotDuplicateNames',
          category: 'error',
          message: `${property.typeHumanizedName} named ${metaEdName} is a duplicate declaration of that name.`,
          sourceMap: property.sourceMap.metaEdName,
          fileMap: null,
        });
      });
    }
  });
  return failures;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  failures.push(...generateValidationErrorsForDuplicates(propertiesNeedingDuplicateChecking(metaEd.propertyIndex)));

  return failures;
}
