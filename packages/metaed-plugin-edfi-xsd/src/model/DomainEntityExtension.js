// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntityExtension } from 'metaed-core';
import { metaEdNameWithExtensionIncludingSuffix } from './shared/AddMetaEdNameWithExtension';

export type DomainEntityExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string,
};

const enhancerName: string = 'DomainEntityExtensionSetupEnhancer';

export function addDomainEntityExtensionEdfiXsdTo(domainEntityExtension: DomainEntityExtension) {
  if (domainEntityExtension.data.edfiXsd == null) domainEntityExtension.data.edfiXsd = {};

  Object.assign(domainEntityExtension.data.edfiXsd, {
    xsd_MetaEdNameWithExtension: metaEdNameWithExtensionIncludingSuffix(domainEntityExtension),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.domainEntityExtension.forEach((domainEntityExtension: DomainEntityExtension) => {
    addDomainEntityExtensionEdfiXsdTo(domainEntityExtension);
  });

  return {
    enhancerName,
    success: true,
  };
}
