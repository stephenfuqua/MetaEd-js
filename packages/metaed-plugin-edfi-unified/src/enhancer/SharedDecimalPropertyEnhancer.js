// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../metaed-core/index';
import { asDecimalType } from '../../../metaed-core/src/model/DecimalType';

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
