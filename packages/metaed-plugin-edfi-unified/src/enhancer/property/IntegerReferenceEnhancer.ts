import {
  EnhancerResult,
  MetaEdEnvironment,
  SharedIntegerProperty,
  Namespace,
  IntegerType,
  SharedInteger,
} from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'IntegerReferenceEnhancer';

// NOTE:
// referringSimpleProperties is only used by MetaEdHandbook
// integerType is only used by XSD
// this functionality should be moved to MetaEdHandbook
// referringSimpleProperties should be moved to SharedSimple instead of IntegerType
function addReferringSimplePropertiesToIntegerType(metaEd: MetaEdEnvironment): void {
  metaEd.propertyIndex.sharedInteger.forEach((property: SharedIntegerProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: IntegerType | null = getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'integerType',
    ) as IntegerType | null;

    if (referencedEntity) {
      referencedEntity.referringSimpleProperties.push(property);
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedInteger.forEach((property: SharedIntegerProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: SharedInteger | null = getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'sharedInteger',
    ) as SharedInteger | null;

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  addReferringSimplePropertiesToIntegerType(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
