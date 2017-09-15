// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../../packages/metaed-core/index';
import {
  typeGroupAssociation,
  createDefaultComplexType,
  createIdentityType,
  createReferenceType,
 } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddAssociationSubclassComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    if (associationSubclass.baseEntity == null) return;
    associationSubclass.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(associationSubclass, typeGroupAssociation, associationSubclass.baseEntity.data.edfiXsd.xsd_MetaEdNameWithExtension());
    associationSubclass.data.edfiXsd.xsd_IdentityType = createIdentityType(associationSubclass);
    associationSubclass.data.edfiXsd.xsd_ReferenceType = createReferenceType(associationSubclass);
  });

  return {
    enhancerName,
    success: true,
  };
}
