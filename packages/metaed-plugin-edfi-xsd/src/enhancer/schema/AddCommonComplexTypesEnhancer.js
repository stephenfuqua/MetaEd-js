// @flow
import type { MetaEdEnvironment, EnhancerResult, Common } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { typeGroupCommon, createDefaultComplexType } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddCommonComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'common'): any): Array<Common>).forEach((common: Common) => {
    common.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(common, typeGroupCommon);
  });

  return {
    enhancerName,
    success: true,
  };
}
