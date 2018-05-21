// @flow
import type {
  EnhancerResult,
  MetaEdEnvironment,
  SharedShortProperty,
  Namespace,
  IntegerType,
  SharedInteger,
} from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'ShortReferenceEnhancer';

// NOTE:
// referringSimpleProperties is only used by MetaEdHandbook
// integerType is only used by XSD
// this functionality should be moved to MetaEdHandbook
// referringSimpleProperties should be moved to SharedSimple instead of IntegerType
function addReferringSimplePropertiesToShortType(metaEd: MetaEdEnvironment): void {
  metaEd.propertyIndex.sharedShort.forEach((property: SharedShortProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: ?IntegerType = ((getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'integerType',
    ): any): ?IntegerType);

    if (referencedEntity) {
      referencedEntity.referringSimpleProperties.push(property);
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedShort.forEach((property: SharedShortProperty) => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: ?SharedInteger = ((getEntityForNamespaces(
      property.referencedType,
      namespaces,
      'sharedInteger',
    ): any): ?SharedInteger);

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  addReferringSimplePropertiesToShortType(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
