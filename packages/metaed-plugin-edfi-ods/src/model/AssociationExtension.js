// @flow
import type { MetaEdEnvironment, EnhancerResult, AssociationExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export type AssociationExtensionEdfiOds = {
  ods_ExtensionName: string,
};

const enhancerName: string = 'OdsAssociationExtensionSetupEnhancer';

export function addAssociationExtensionEdfiOdsTo(associationExtension: AssociationExtension) {
  if (associationExtension.data.edfiOds == null) associationExtension.data.edfiOds = {};

  Object.assign(associationExtension.data.edfiOds, {
    ods_ExtensionName: associationExtension.metaEdName + associationExtension.namespace.extensionEntitySuffix,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'associationExtension'): any): Array<AssociationExtension>).forEach(
    (associationExtension: AssociationExtension) => {
      addAssociationExtensionEdfiOdsTo(associationExtension);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
