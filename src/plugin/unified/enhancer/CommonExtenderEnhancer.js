// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';
import { asCommon } from '../../../core/model/Common';

const enhancerName: string = 'CommonExtenderEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.commonExtension.forEach(extensionEntity => {
    if (extensionEntity.baseEntity) {
      asCommon(extensionEntity.baseEntity).extender = extensionEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
