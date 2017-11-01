// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { asStringType } from 'metaed-core';

const enhancerName: string = 'SharedStringPropertyEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedString.forEach(property => {
    if (!property.referencedEntity) return;
    const referencedEntity = asStringType(property.referencedEntity);
    property.minLength = referencedEntity.minLength;
    property.maxLength = referencedEntity.maxLength;
  });

  return {
    enhancerName,
    success: true,
  };
}
