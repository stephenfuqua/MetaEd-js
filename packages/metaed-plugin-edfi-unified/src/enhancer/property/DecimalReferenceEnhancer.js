// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'DecimalReferenceEnhancer';

// When decimal type is moved to XSD specific, this should be a SharedDecimalProperty referencing SharedDecimal enhancer
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const decimalProperties = [];
  // Note right now we point shared decimal properties to the DecimalType
  // this is a legacy from before we had SharedSimple properties at all
  decimalProperties.push(...metaEd.propertyIndex.decimal, ...metaEd.propertyIndex.sharedDecimal);
  decimalProperties.forEach(property => {
    const referencedEntity = metaEd.entity.decimalType.get(property.metaEdName);
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
