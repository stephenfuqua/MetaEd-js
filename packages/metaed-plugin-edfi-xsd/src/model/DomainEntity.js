// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntity, EntityProperty } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export type DomainEntityEdfiXsd = {
  xsd_Properties: () => Array<EntityProperty>,
};

const enhancerName: string = 'DomainEntitySetupEnhancer';

// note this is an override of xsdProperties in TopLevelEntity
function xsdProperties(domainEntity: DomainEntity): () => Array<EntityProperty> {
  return () =>
    domainEntity.isAbstract ? domainEntity.properties.filter(p => !p.isPartOfIdentity) : domainEntity.properties;
}

export function addDomainEntityEdfiXsdTo(domainEntity: DomainEntity) {
  if (domainEntity.data.edfiXsd == null) domainEntity.data.edfiXsd = {};

  Object.assign(domainEntity.data.edfiXsd, {
    xsd_Properties: xsdProperties(domainEntity),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'domainEntity'): any): Array<DomainEntity>).forEach((domainEntity: DomainEntity) => {
    addDomainEntityEdfiXsdTo(domainEntity);
  });

  return {
    enhancerName,
    success: true,
  };
}
