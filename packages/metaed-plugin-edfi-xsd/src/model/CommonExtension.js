// @flow
import type { MetaEdEnvironment, EnhancerResult, CommonExtension } from '../../../../packages/metaed-core/index';
import { metaEdNameWithExtension } from './shared/AddMetaEdNameWithExtension';

export type CommonExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: string;
};

const enhancerName: string = 'CommonExtensionSetupEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.commonExtension.forEach((commonExtension: CommonExtension) => {
    Object.assign(commonExtension.data.edfiXsd, {
      xsd_MetaEdNameWithExtension: metaEdNameWithExtension(commonExtension),
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
