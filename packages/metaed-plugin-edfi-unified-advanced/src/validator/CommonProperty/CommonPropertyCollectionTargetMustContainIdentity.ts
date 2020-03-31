import { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): ValidationFailure[] {
  const failures: ValidationFailure[] = [];

  metaEd.propertyIndex.common.forEach(commonProperty => {
    if (!commonProperty.isOptionalCollection && !commonProperty.isRequiredCollection) return;
    if (!commonProperty.referencedEntity.properties.some(property => property.isPartOfIdentity)) {
      failures.push({
        validatorName: 'CommonPropertyCollectionTargetMustContainIdentity',
        category: 'error',
        message: `Common property ${commonProperty.metaEdName} cannot be used as a collection because ${commonProperty.referencedEntity.typeHumanizedName} ${commonProperty.referencedEntity.metaEdName} does not have any identity properties.`,
        sourceMap: commonProperty.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });
  return failures;
}
