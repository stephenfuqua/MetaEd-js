// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import {
  typeGroupAssociation,
  baseTypeTopLevelEntity,
  createDefaultComplexType,
  createIdentityType,
  createReferenceType,
} from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddAssociationComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.association.forEach(association => {
    association.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(
      association,
      typeGroupAssociation,
      baseTypeTopLevelEntity,
    );
    association.data.edfiXsd.xsd_IdentityType = createIdentityType(association);
    association.data.edfiXsd.xsd_ReferenceType = createReferenceType(association);
  });

  return {
    enhancerName,
    success: true,
  };
}
