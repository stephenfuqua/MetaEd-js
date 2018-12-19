import { MetaEdEnvironment, ValidationFailure, CommonPropertySourceMap, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.propertyIndex.common.forEach(property => {
    if (!property.isExtensionOverride) return;
    const referencedEntity: ModelBase | null = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'commonExtension',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'CommonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension',
        category: 'error',
        message: `'common extension' is invalid for property ${property.metaEdName} on ${
          property.parentEntity.typeHumanizedName
        } ${property.parentEntity.metaEdName}. 'common extension' is only valid for referencing Common extensions.`,
        sourceMap: (property.sourceMap as CommonPropertySourceMap).isExtensionOverride,
        fileMap: null,
      });
    }
  });
  return failures;
}
