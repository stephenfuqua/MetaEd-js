// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntity, EntityProperty } from '../../../../packages/metaed-core/index';

export type DomainEntityEdfiXsd = {
  xsd_Properties: () => Array<EntityProperty>;
};

const enhancerName: string = 'DomainEntitySetupEnhancer';

// note this is an override of xsdProperties in TopLevelEntity
function xsdProperties(domainEntity: DomainEntity): () => Array<EntityProperty> {
  return () => (domainEntity.isAbstract ? [] : domainEntity.properties.filter(p => !p.isPartOfIdentity));
}

export function addDomainEntityEdfiXsdTo(domainEntity: DomainEntity) {
  Object.assign(domainEntity.data.edfiXsd, {
    xsd_Properties: xsdProperties(domainEntity),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.domainEntity.forEach((domainEntity: DomainEntity) => {
    addDomainEntityEdfiXsdTo(domainEntity);
  });

  return {
    enhancerName,
    success: true,
  };
}
