// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../../packages/metaed-core/index';
import {
  typeGroupCommon,
  createDefaultComplexType,
 } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddCommonComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.common.forEach(common => {
    common.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(common, typeGroupCommon);
  });

  return {
    enhancerName,
    success: true,
  };
}
