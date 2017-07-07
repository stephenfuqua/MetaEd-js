// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';
import { asStringType } from '../../../../packages/metaed-core/src/model/StringType';

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
