import { MetaEdEnvironment, EnhancerResult, SharedDecimal } from 'metaed-core';
import { NoSharedSimple } from 'metaed-core';

const enhancerName = 'SharedDecimalPropertyEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedDecimal.forEach(property => {
    if (property.referencedEntity === NoSharedSimple) return;

    const referencedEntity = property.referencedEntity as SharedDecimal;
    property.totalDigits = referencedEntity.totalDigits;
    property.decimalPlaces = referencedEntity.decimalPlaces;
    property.minValue = referencedEntity.minValue;
    property.maxValue = referencedEntity.maxValue;
  });

  return {
    enhancerName,
    success: true,
  };
}
