import { MetaEdEnvironment, ValidationFailure, CommonPropertySourceMap, ModelBase } from 'metaed-core';
import { getEntityFromNamespaceChain } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.propertyIndex.common.forEach(property => {
    if (!property.isExtensionOverride) return;
    const referencedEntity: ModelBase | null = getEntityFromNamespaceChain(
      property.metaEdName,
      // implicitly we reference Common Extension declared in same namespace as property using it
      property.namespace.namespaceName,
      property.namespace,
      'commonExtension',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'CommonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension',
        category: 'error',
        message: `'common extension' is invalid for property ${property.metaEdName} on ${
          property.parentEntity.typeHumanizedName
        } ${property.parentEntity.metaEdName} in namespace ${
          property.referencedNamespaceName
        }. 'common extension' is only valid for referencing Common extensions.`,
        sourceMap: (property.sourceMap as CommonPropertySourceMap).isExtensionOverride,
        fileMap: null,
      });
    }
  });
  return failures;
}
