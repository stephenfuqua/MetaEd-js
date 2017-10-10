// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../metaed-core/index';
import { asIntegerType } from '../../../metaed-core/src/model/IntegerType';

const enhancerName: string = 'SharedIntegerPropertyEnhancer';

function copyRestrictions(property) {
  const referencedEntity = asIntegerType(property.referencedEntity);
  property.minValue = referencedEntity.minValue;
  property.maxValue = referencedEntity.maxValue;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedInteger.forEach(property => {
    if (!property.referencedEntity) return;
    copyRestrictions(property);
  });

  metaEd.propertyIndex.sharedShort.forEach(property => {
    if (!property.referencedEntity) return;
    copyRestrictions(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
