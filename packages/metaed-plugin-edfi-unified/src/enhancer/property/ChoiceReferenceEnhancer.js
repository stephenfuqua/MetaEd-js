// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'ChoiceReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.choice.forEach(property => {
    const referencedEntity = metaEd.entity.choice.get(property.metaEdName);
    if (referencedEntity) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
