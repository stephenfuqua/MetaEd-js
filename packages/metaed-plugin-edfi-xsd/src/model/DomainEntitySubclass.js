// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntitySubclass, EntityProperty } from '../../../metaed-core/index';

export type DomainEntitySubclassEdfiXsd = {
  xsd_Properties: () => Array<EntityProperty>;
};

const enhancerName: string = 'DomainEntitySubclassSetupEnhancer';

// note this is an override of xsdProperties in TopLevelEntity
function xsdProperties(domainEntitySubclass: DomainEntitySubclass): () => Array<EntityProperty> {
  return () => domainEntitySubclass.properties.filter(p => !p.isPartOfIdentity);
}

export function addDomainEntitySubclassEdfiXsdTo(domainEntitySubclass: DomainEntitySubclass) {
  if (domainEntitySubclass.data.edfiXsd == null) domainEntitySubclass.data.edfiXsd = {};

  Object.assign(domainEntitySubclass.data.edfiXsd, {
    xsd_Properties: xsdProperties(domainEntitySubclass),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.domainEntitySubclass.forEach((domainEntitySubclass: DomainEntitySubclass) => {
    addDomainEntitySubclassEdfiXsdTo(domainEntitySubclass);
  });

  return {
    enhancerName,
    success: true,
  };
}
