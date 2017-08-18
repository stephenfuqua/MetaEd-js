// @flow
import type { MetaEdEnvironment, EnhancerResult, AssociationExtension } from '../../../../packages/metaed-core/index';
import { metaEdNameWithExtensionIncludingSuffix } from './shared/AddMetaEdNameWithExtension';

export type AssociationExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string;
};

const enhancerName: string = 'AssociationExtensionSetupEnhancer';

export function addAssociationExtensionEdfiXsdTo(associationExtension: AssociationExtension) {
  Object.assign(associationExtension.data.edfiXsd, {
    xsd_MetaEdNameWithExtension: metaEdNameWithExtensionIncludingSuffix(associationExtension),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.associationExtension.forEach((associationExtension: AssociationExtension) => {
    addAssociationExtensionEdfiXsdTo(associationExtension);
  });

  return {
    enhancerName,
    success: true,
  };
}
