// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';

const enhancerName: string = 'AssociationExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.associationExtension.forEach(childEntity => {
    let baseEntity = metaEd.entity.association.get(childEntity.baseEntityName);
    if (!baseEntity) baseEntity = metaEd.entity.associationSubclass.get(childEntity.baseEntityName);

    if (baseEntity) {
      childEntity.baseEntity = baseEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
