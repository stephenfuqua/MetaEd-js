// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';
import { asDecimalType } from '../../../core/model/DecimalType';

const enhancerName: string = 'SharedDecimalPropertyEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedDecimal.forEach(property => {
    if (!property.referencedEntity) return;
    const referencedEntity = asDecimalType(property.referencedEntity);
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
