// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../core/enhancer/EnhancerResult';

const enhancerName: string = 'SimplePropertyReferenceEnhancer';

// eslint-disable-next-line no-unused-vars
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  // TODO: implement - then delete eslint directive

  return {
    enhancerName,
    success: true,
  };
}
