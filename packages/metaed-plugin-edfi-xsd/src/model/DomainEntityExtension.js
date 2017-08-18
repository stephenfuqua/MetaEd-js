// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntityExtension, EntityProperty } from '../../../../packages/metaed-core/index';
import { metaEdNameWithExtensionIncludingSuffix } from './shared/AddMetaEdNameWithExtension';

export type DomainEntityExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string;
  xsd_Properties: Array<EntityProperty>;
};

const enhancerName: string = 'DomainEntityExtensionSetupEnhancer';

export function addDomainEntityExtensionEdfiXsdTo(domainEntityExtension: DomainEntityExtension) {
  Object.assign(domainEntityExtension.data.edfiXsd, {
    xsd_MetaEdNameWithExtension: metaEdNameWithExtensionIncludingSuffix(domainEntityExtension),
    xsd_Properties: domainEntityExtension.properties.filter(p => !p.isPartOfIdentity),
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
