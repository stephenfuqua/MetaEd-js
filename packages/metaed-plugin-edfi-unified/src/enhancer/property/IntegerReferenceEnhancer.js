// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'IntegerReferenceEnhancer';

// When integer type is moved to XSD specific, this should be a SharedIntegerProperty referencing SharedInteger enhancer
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const integerProperties = [];
  // Note right now we point shared integer properties to the IntegerType
  // this is a legacy from before we had SharedSimple properties at all
  integerProperties.push(...metaEd.propertyIndex.integer, ...metaEd.propertyIndex.sharedInteger);
  integerProperties.forEach(property => {
    const referencedEntity = metaEd.entity.integerType.get(property.metaEdName);
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
