// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'ShortReferenceEnhancer';

// When short type is moved to XSD specific, this should be a SharedShortProperty referencing SharedShort enhancer
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const shortProperties = [];
  // Note right now we point shared short properties to the ShortType-equivalent IntegerType
  // this is a legacy from before we had SharedSimple properties at all
  shortProperties.push(...metaEd.propertyIndex.short, ...metaEd.propertyIndex.sharedShort);
  shortProperties.forEach(property => {
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
