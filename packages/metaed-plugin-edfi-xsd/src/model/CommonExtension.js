// @flow
import type { MetaEdEnvironment, EnhancerResult, CommonExtension } from 'metaed-core';
import { metaEdNameWithExtensionIncludingSuffix } from './shared/AddMetaEdNameWithExtension';

export type CommonExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string;
};

const enhancerName: string = 'CommonExtensionSetupEnhancer';

export function addCommonExtensionEdfiXsdTo(commonExtension: CommonExtension) {
  if (commonExtension.data.edfiXsd == null) commonExtension.data.edfiXsd = {};

  Object.assign(commonExtension.data.edfiXsd, {
    xsd_MetaEdNameWithExtension: metaEdNameWithExtensionIncludingSuffix(commonExtension),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.commonExtension.forEach((commonExtension: CommonExtension) => {
    addCommonExtensionEdfiXsdTo(commonExtension);
  });

  return {
    enhancerName,
    success: true,
  };
}
