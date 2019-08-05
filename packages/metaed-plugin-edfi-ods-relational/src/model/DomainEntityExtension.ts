import { MetaEdEnvironment, EnhancerResult, DomainEntityExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export interface DomainEntityExtensionEdfiOds {
  odsExtensionName: string;
}

const enhancerName = 'OdsDomainEntityExtensionSetupEnhancer';

export function addDomainEntityExtensionEdfiOdsTo(domainEntityExtension: DomainEntityExtension) {
  if (domainEntityExtension.data.edfiOds == null) domainEntityExtension.data.edfiOds = {};

  Object.assign(domainEntityExtension.data.edfiOds, {
    odsExtensionName: domainEntityExtension.metaEdName + domainEntityExtension.namespace.extensionEntitySuffix,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'domainEntityExtension') as DomainEntityExtension[]).forEach(
    (domainEntityExtension: DomainEntityExtension) => {
      addDomainEntityExtensionEdfiOdsTo(domainEntityExtension);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
