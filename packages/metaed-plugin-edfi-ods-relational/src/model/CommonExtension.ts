import { MetaEdEnvironment, EnhancerResult, CommonExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export interface CommonExtensionEdfiOds {
  odsExtensionName: string;
}

const enhancerName = 'OdsCommonExtensionSetupEnhancer';

export function addCommonExtensionEdfiOdsTo(commonExtension: CommonExtension) {
  if (commonExtension.data.edfiOds == null) commonExtension.data.edfiOds = {};

  Object.assign(commonExtension.data.edfiOds, {
    odsExtensionName: commonExtension.metaEdName + commonExtension.namespace.extensionEntitySuffix,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'commonExtension') as CommonExtension[]).forEach((commonExtension: CommonExtension) => {
    addCommonExtensionEdfiOdsTo(commonExtension);
  });

  return {
    enhancerName,
    success: true,
  };
}
