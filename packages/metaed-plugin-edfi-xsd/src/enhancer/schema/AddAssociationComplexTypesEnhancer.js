// @flow
import type { MetaEdEnvironment, EnhancerResult, Association } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import {
  typeGroupAssociation,
  baseTypeTopLevelEntity,
  createDefaultComplexType,
  createIdentityType,
  createReferenceType,
} from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddAssociationComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'association'): any): Array<Association>).forEach((association: Association) => {
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
