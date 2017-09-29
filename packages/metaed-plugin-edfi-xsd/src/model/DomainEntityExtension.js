// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntityExtension, EntityProperty } from '../../../../packages/metaed-core/index';
import { metaEdNameWithExtensionIncludingSuffix } from './shared/AddMetaEdNameWithExtension';

export type DomainEntityExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string;
  xsd_Properties: () => Array<EntityProperty>;
};

const enhancerName: string = 'DomainEntityExtensionSetupEnhancer';

// note this is an override of xsdProperties in TopLevelEntity
function xsdProperties(domainEntityExtension: DomainEntityExtension): () => Array<EntityProperty> {
  return () => domainEntityExtension.properties.filter(p => !p.isPartOfIdentity);
}

export function addDomainEntityExtensionEdfiXsdTo(domainEntityExtension: DomainEntityExtension) {
  if (domainEntityExtension.data.edfiXsd == null) domainEntityExtension.data.edfiXsd = {};

  Object.assign(domainEntityExtension.data.edfiXsd, {
    xsd_MetaEdNameWithExtension: metaEdNameWithExtensionIncludingSuffix(domainEntityExtension),
    xsd_Properties: xsdProperties(domainEntityExtension),
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
