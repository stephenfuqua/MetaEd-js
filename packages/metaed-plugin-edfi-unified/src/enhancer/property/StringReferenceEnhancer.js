// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'StringReferenceEnhancer';

// When string type is moved to XSD specific, this should be a SharedStringProperty referencing SharedString enhancer
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const stringProperties = [];
  // Note right now we point shared string properties to the StringType
  // this is a legacy from before we had SharedSimple properties at all
  stringProperties.push(...metaEd.propertyIndex.string, ...metaEd.propertyIndex.sharedString);
  stringProperties.forEach(property => {
    const referencedEntity = metaEd.entity.stringType.get(property.metaEdName);
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
