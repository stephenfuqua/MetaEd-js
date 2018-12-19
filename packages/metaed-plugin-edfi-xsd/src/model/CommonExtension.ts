import { MetaEdEnvironment, EnhancerResult, CommonExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { metaEdNameWithExtensionIncludingSuffix } from './shared/AddMetaEdNameWithExtension';

export type CommonExtensionEdfiXsd = {
  xsdMetaEdNameWithExtension: () => string;
};

const enhancerName = 'CommonExtensionSetupEnhancer';

export function addCommonExtensionEdfiXsdTo(commonExtension: CommonExtension) {
  if (commonExtension.data.edfiXsd == null) commonExtension.data.edfiXsd = {};

  Object.assign(commonExtension.data.edfiXsd, {
    xsdMetaEdNameWithExtension: metaEdNameWithExtensionIncludingSuffix(commonExtension),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'commonExtension') as Array<CommonExtension>).forEach((commonExtension: CommonExtension) => {
    addCommonExtensionEdfiXsdTo(commonExtension);
  });

  return {
    enhancerName,
    success: true,
  };
}
