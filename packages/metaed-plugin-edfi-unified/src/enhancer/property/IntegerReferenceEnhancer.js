// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getReferencedEntity } from './SimpleReferenceHelper';

const enhancerName: string = 'IntegerReferenceEnhancer';

// When integer type is moved to XSD specific, this should be a SharedIntegerProperty referencing SharedInteger enhancer
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const integerProperties = [];
  // Note right now we point shared integer properties to the IntegerType
  // this is a legacy from before we had SharedSimple properties at all
  integerProperties.push(...metaEd.propertyIndex.integer, ...metaEd.propertyIndex.sharedInteger);
  integerProperties.forEach(property => {
    const referencedEntity = getReferencedEntity(metaEd.entity.integerType, property);
    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
      referencedEntity.referringSimpleProperties.push(property);
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
