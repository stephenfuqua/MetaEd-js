// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntity, EntityProperty } from '../../../../packages/metaed-core/index';

export type DomainEntityEdfiXsd = {
  xsd_Properties: Array<EntityProperty>;
};

const enhancerName: string = 'DomainEntitySetupEnhancer';

export function addDomainEntityEdfiXsdTo(domainEntity: DomainEntity) {
  Object.assign(domainEntity.data.edfiXsd, {
    xsd_Properties: domainEntity.isAbstract ? [] : domainEntity.properties.filter(p => !p.isPartOfIdentity),
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
