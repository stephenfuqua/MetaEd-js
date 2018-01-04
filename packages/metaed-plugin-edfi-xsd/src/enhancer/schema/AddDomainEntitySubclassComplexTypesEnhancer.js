// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import {
  typeGroupDomainEntity,
  createDefaultComplexType,
  createIdentityType,
  createReferenceType,
} from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddDomainEntitySubclassComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    if (domainEntitySubclass.baseEntity == null) return;
    domainEntitySubclass.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(
      domainEntitySubclass,
      typeGroupDomainEntity,
      domainEntitySubclass.baseEntity.data.edfiXsd.xsd_MetaEdNameWithExtension(),
    );
    domainEntitySubclass.data.edfiXsd.xsd_IdentityType = createIdentityType(domainEntitySubclass);
    domainEntitySubclass.data.edfiXsd.xsd_ReferenceType = createReferenceType(domainEntitySubclass);
  });

  return {
    enhancerName,
    success: true,
  };
}
