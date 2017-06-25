// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../../packages/metaed-core/src/enhancer/EnhancerResult';

const enhancerName: string = 'AssociationReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.association.forEach(property => {
    let referencedEntity = metaEd.entity.association.get(property.metaEdName);
    if (!referencedEntity) referencedEntity = metaEd.entity.associationSubclass.get(property.metaEdName);

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
