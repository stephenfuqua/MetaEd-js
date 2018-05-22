// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import {
  typeGroupDomainEntity,
  baseTypeTopLevelEntity,
  createDefaultComplexType,
  createIdentityType,
  createReferenceType,
} from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddDomainEntityComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'domainEntity').forEach(domainEntity => {
    domainEntity.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(
      domainEntity,
      typeGroupDomainEntity,
      baseTypeTopLevelEntity,
      domainEntity.isAbstract,
    );
    domainEntity.data.edfiXsd.xsd_IdentityType = createIdentityType(domainEntity);
    domainEntity.data.edfiXsd.xsd_ReferenceType = createReferenceType(domainEntity);
  });

  return {
    enhancerName,
    success: true,
  };
}
