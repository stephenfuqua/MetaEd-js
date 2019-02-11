import {
  EntityProperty,
  SimpleProperty,
  MetaEdEnvironment,
  EntityRepository,
  PropertyIndex,
  SharedSimple,
  ValidationFailure,
  Namespace,
} from 'metaed-core';

function sharedSimpleNeedingDuplicateChecking(namespaces: Array<Namespace>): Array<SharedSimple> {
  const result: Array<SharedSimple> = [];

  const entityRepositories: Array<EntityRepository> = namespaces.map((n: Namespace) => n.entity);
  entityRepositories.forEach((entityRepository: EntityRepository) => {
    result.push(...entityRepository.sharedString.values());
    result.push(...entityRepository.sharedDecimal.values());
    result.push(...entityRepository.sharedInteger.values());
  });
  return result;
}

function propertiesNeedingDuplicateChecking(
  properties: PropertyIndex,
  namespaces: Array<Namespace>,
): Map<string, SimpleProperty> {
  const result: Array<SimpleProperty> = [];

  result.push(...properties.string.filter((property: EntityProperty) => namespaces.includes(property.namespace)));
  result.push(...properties.decimal.filter((property: EntityProperty) => namespaces.includes(property.namespace)));
  result.push(...properties.integer.filter((property: EntityProperty) => namespaces.includes(property.namespace)));
  result.push(...properties.short.filter((property: EntityProperty) => namespaces.includes(property.namespace)));

  // @ts-ignore -- typescript not correctly typing map() operation as SimpleProperty => [string, SimpleProperty] tuples
  return new Map(result.map(i => [i.metaEdName, i]));
}

function generateValidationErrorsForDuplicates(
  metaEdProperty: Map<string, SimpleProperty>,
  metaedEntities: Array<SharedSimple>,
): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaedEntities.forEach((entity: SharedSimple) => {
    const isDuplicate: boolean = metaEdProperty.has(entity.metaEdName);
    if (isDuplicate) {
      const property: SimpleProperty = metaEdProperty.get(entity.metaEdName) as SimpleProperty;
      failures.push(
        {
          validatorName: 'SimplePropertiesCannotReuseEntitySharedTypeNames',
          category: 'error',
          message: `${entity.typeHumanizedName} named ${entity.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: entity.sourceMap.metaEdName,
          fileMap: null,
        },
        {
          validatorName: 'SimplePropertiesCannotReuseEntitySharedTypeNames',
          category: 'error',
          message: `${property.typeHumanizedName} named ${property.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: property.sourceMap.metaEdName,
          fileMap: null,
        },
      );
    }
  });
  return failures;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    const namespacesToSearch: Array<Namespace> = [namespace, ...namespace.dependencies];
    failures.push(
      ...generateValidationErrorsForDuplicates(
        propertiesNeedingDuplicateChecking(metaEd.propertyIndex, namespacesToSearch),
        sharedSimpleNeedingDuplicateChecking(namespacesToSearch),
      ),
    );
  });

  return failures;
}
