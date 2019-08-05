import { MetaEdEnvironment, EnhancerResult, AssociationExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export interface AssociationExtensionEdfiOds {
  odsExtensionName: string;
}

const enhancerName = 'OdsAssociationExtensionSetupEnhancer';

export function addAssociationExtensionEdfiOdsTo(associationExtension: AssociationExtension) {
  if (associationExtension.data.edfiOds == null) associationExtension.data.edfiOds = {};

  Object.assign(associationExtension.data.edfiOds, {
    odsExtensionName: associationExtension.metaEdName + associationExtension.namespace.extensionEntitySuffix,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'associationExtension') as AssociationExtension[]).forEach(
    (associationExtension: AssociationExtension) => {
      addAssociationExtensionEdfiOdsTo(associationExtension);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
