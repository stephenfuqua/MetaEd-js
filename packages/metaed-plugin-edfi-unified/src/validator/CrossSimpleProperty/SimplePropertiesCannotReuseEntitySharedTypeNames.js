// @flow
import type {
    ShortProperty,
    StringProperty,
    DecimalProperty,
    IntegerProperty,
    MetaEdEnvironment,
    EntityRepository,
    PropertyIndex,
    SharedSimple,
    ValidationFailure } from '../../../../metaed-core/index';

type SimpleProperties =
    ShortProperty |
    DecimalProperty |
    IntegerProperty |
    StringProperty;

function sharedSimpleNeedingDuplicateChecking(entity: EntityRepository): Array<SharedSimple> {
  const result: Array<SharedSimple> = [];
  result.push(...entity.sharedString.values());
  result.push(...entity.sharedDecimal.values());
  result.push(...entity.sharedInteger.values());
  // result.push(...entity.sharedShort);
  return result;
}
function propertiesNeedingDuplicateChecking(properties: PropertyIndex): Map<string, SimpleProperties> {
  const result: Array<SimpleProperties> = [];
  result.push(...properties.string);
  result.push(...properties.decimal);
  result.push(...properties.integer);
  result.push(...properties.short);
  return new Map(result.map((i) => [i.metaEdName, i]));
}

function generateValidationErrorsForDuplicates(metaEdProperty: Map<string, SimpleProperties>, metaedEntities: Array<SharedSimple>): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaedEntities.forEach(entity => {
    const isDuplicate: boolean = metaEdProperty.has(entity.metaEdName);
    if (isDuplicate) {
      const property: SimpleProperties = ((metaEdProperty.get(entity.metaEdName): any): SimpleProperties);
      failures.push({
        validatorName: 'SimplePropertiesCannotReuseEntityShanedTypeNames',
        category: 'error',
        message: `${entity.typeHumanizedName} named ${entity.metaEdName} is a duplicate declaration of that name.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      }, {
        validatorName: 'SimplePropertiesCannotReuseEntityShanedTypeNames',
        category: 'error',
        message: `${property.typeHumanizedName} named ${property.metaEdName} is a duplicate declaration of that name.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });
  return failures;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  failures.push(...generateValidationErrorsForDuplicates(propertiesNeedingDuplicateChecking(metaEd.propertyIndex), sharedSimpleNeedingDuplicateChecking(metaEd.entity)));

  return failures;
}
