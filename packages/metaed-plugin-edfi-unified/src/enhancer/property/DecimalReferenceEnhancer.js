// @flow
import type { EnhancerResult, MetaEdEnvironment, SharedDecimalProperty, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'DecimalReferenceEnhancer';

// NOTE:
// referringSimpleProperties is only used by MetaEdHandbook
// decimalType is only used by XSD
// this functionality should be moved to MetaEdHandbook
// referringSimpleProperties should be moved to SharedSimple instead of DecimalType
function addReferringSimplePropertiesToDecimalType(metaEd: MetaEdEnvironment): void {
  metaEd.propertyIndex.sharedDecimal.forEach((property: SharedDecimalProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: ?ModelBase = getEntityForNamespaces(property.referencedType, namespaces, 'decimalType');

    if (referencedEntity) {
      referencedEntity.referringSimpleProperties.push(property);
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedDecimal.forEach((property: SharedDecimalProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: ?ModelBase = getEntityForNamespaces(property.referencedType, namespaces, 'sharedDecimal');

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  addReferringSimplePropertiesToDecimalType(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
