// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { typeGroupCommon, createDefaultComplexType } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddCommonExtensionComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.commonExtension.forEach(commonExtension => {
    if (commonExtension.baseEntity == null) return;
    commonExtension.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(
      commonExtension,
      typeGroupCommon,
      commonExtension.baseEntity.data.edfiXsd.xsd_MetaEdNameWithExtension(),
    );
  });

  return {
    enhancerName,
    success: true,
  };
}
