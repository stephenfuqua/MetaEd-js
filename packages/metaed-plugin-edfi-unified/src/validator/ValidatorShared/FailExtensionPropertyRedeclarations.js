// @flow
import type { TopLevelEntity, EntityProperty, CommonProperty, ValidationFailure } from '../../../../../packages/metaed-core/index';

function isNotCommonExtensionOverride(entityProperty: EntityProperty): boolean {
  if (entityProperty.type !== 'common') return true;
  return !((entityProperty: any): CommonProperty).isExtensionOverride;
}

export function failExtensionPropertyRedeclarations(
  validatorName: string,
  extensionEntity: TopLevelEntity,
  baseEntity: TopLevelEntity,
  failures: Array<ValidationFailure>) {
  extensionEntity.properties.forEach(extensionProperty => {
    baseEntity.properties.forEach(baseProperty => {
      if (extensionProperty.metaEdName === baseProperty.metaEdName &&
        isNotCommonExtensionOverride(extensionProperty)) {
        failures.push({
          validatorName,
          category: 'error',
          message: `${extensionEntity.typeHumanizedName} ${extensionEntity.metaEdName} redeclares property ${extensionProperty.metaEdName} of base ${baseEntity.typeHumanizedName}.`,
          sourceMap: extensionProperty.sourceMap.type,
          fileMap: null,
        });
      }
    });
  });
}
