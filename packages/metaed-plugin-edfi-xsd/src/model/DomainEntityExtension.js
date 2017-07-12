// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntityExtension } from '../../../../packages/metaed-core/index';
import { metaEdNameWithExtension } from './shared/AddMetaEdNameWithExtension';

export type DomainEntityExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: string;
};

const enhancerName: string = 'DomainEntityExtensionSetupEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.domainEntityExtension.forEach((domainEntityExtension: DomainEntityExtension) => {
    Object.assign(domainEntityExtension.data.edfiXsd, {
      xsd_MetaEdNameWithExtension: metaEdNameWithExtension(domainEntityExtension),
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
