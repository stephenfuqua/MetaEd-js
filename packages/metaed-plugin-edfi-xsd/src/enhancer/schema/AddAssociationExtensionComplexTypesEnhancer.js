// @flow
import type { MetaEdEnvironment, EnhancerResult, AssociationExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import type { TopLevelEntityEdfiXsd } from '../../model/TopLevelEntity';
import {
  typeGroupAssociation,
  createDefaultComplexType,
  createCoreRestrictionForExtensionParent,
  restrictionName,
} from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddAssociationExtensionComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'associationExtension'): any): Array<AssociationExtension>).forEach(
    (associationExtension: AssociationExtension) => {
      if (associationExtension.data.edfiXsd.xsd_HasExtensionOverrideProperties()) {
        const associationExtensionEdfiXsd: TopLevelEntityEdfiXsd = associationExtension.data.edfiXsd;
        associationExtensionEdfiXsd.xsd_ComplexTypes = [createCoreRestrictionForExtensionParent(associationExtension)];
        associationExtensionEdfiXsd.xsd_ComplexTypes.push(
          ...createDefaultComplexType(associationExtension, typeGroupAssociation, restrictionName(associationExtension)),
        );
      } else {
        if (associationExtension.baseEntity == null) return;

        associationExtension.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(
          associationExtension,
          typeGroupAssociation,
          associationExtension.baseEntity.data.edfiXsd.xsd_MetaEdNameWithExtension(),
        );
      }
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
