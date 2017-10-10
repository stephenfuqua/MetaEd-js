// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../metaed-core/index';
import { asCommon } from '../../../metaed-core/src/model/Common';

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
