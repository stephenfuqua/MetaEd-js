// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntitySubclass, EntityProperty } from '../../../../packages/metaed-core/index';

export type DomainEntitySubclassEdfiXsd = {
  xsd_Properties: Array<EntityProperty>;
};

const enhancerName: string = 'DomainEntitySubclassSetupEnhancer';

export function addDomainEntitySubclassEdfiXsdTo(domainEntitySubclass: DomainEntitySubclass) {
  Object.assign(domainEntitySubclass.data.edfiXsd, {
    xsd_Properties: domainEntitySubclass.properties.filter(p => !p.isPartOfIdentity),
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
