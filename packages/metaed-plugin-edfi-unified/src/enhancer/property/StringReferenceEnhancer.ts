import { EnhancerResult, MetaEdEnvironment, SharedStringProperty, Namespace, StringType, SharedString } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'StringReferenceEnhancer';

// NOTE:
// referringSimpleProperties is only used by MetaEdHandbook
// stringType is only used by XSD
// this functionality should be moved to MetaEdHandbook
// referringSimpleProperties should be moved to SharedSimple instead of StringType
function addReferringSimplePropertiesToStringType(metaEd: MetaEdEnvironment): void {
  metaEd.propertyIndex.sharedString.forEach((property: SharedStringProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: StringType | null = getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'stringType',
    ) as StringType | null;

    if (referencedEntity) {
      referencedEntity.referringSimpleProperties.push(property);
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedString.forEach((property: SharedStringProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: SharedString | null = getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'sharedString',
    ) as SharedString | null;

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  addReferringSimplePropertiesToStringType(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
