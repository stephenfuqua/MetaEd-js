// @flow
import type { MetaEdEnvironment, EnhancerResult, CommonExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { typeGroupCommon, createDefaultComplexType } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddCommonExtensionComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'commonExtension'): any): Array<CommonExtension>).forEach(
    (commonExtension: CommonExtension) => {
      if (commonExtension.baseEntity == null) return;
      commonExtension.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(
        commonExtension,
        typeGroupCommon,
        commonExtension.baseEntity.data.edfiXsd.xsd_MetaEdNameWithExtension(),
      );
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
