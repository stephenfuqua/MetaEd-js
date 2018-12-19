import {
  EnhancerResult,
  MetaEdEnvironment,
  SharedDecimalProperty,
  Namespace,
  DecimalType,
  SharedDecimal,
} from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'DecimalReferenceEnhancer';

// NOTE:
// referringSimpleProperties is only used by MetaEdHandbook
// decimalType is only used by XSD
// this functionality should be moved to MetaEdHandbook
// referringSimpleProperties should be moved to SharedSimple instead of DecimalType
function addReferringSimplePropertiesToDecimalType(metaEd: MetaEdEnvironment): void {
  metaEd.propertyIndex.sharedDecimal.forEach((property: SharedDecimalProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: DecimalType | null = getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'decimalType',
    ) as DecimalType | null;

    if (referencedEntity) {
      referencedEntity.referringSimpleProperties.push(property);
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedDecimal.forEach((property: SharedDecimalProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: SharedDecimal | null = getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'sharedDecimal',
    ) as SharedDecimal | null;

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
