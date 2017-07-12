// @flow
import type { MetaEdEnvironment, EnhancerResult, AssociationExtension } from '../../../../packages/metaed-core/index';
import { metaEdNameWithExtension } from './shared/AddMetaEdNameWithExtension';

export type AssociationExtensionEdfiXsd = {
  xsd_MetaEdNameWithExtension: string;
};

const enhancerName: string = 'AssociationExtensionSetupEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.associationExtension.forEach((associationExtension: AssociationExtension) => {
    Object.assign(associationExtension.data.edfiXsd, {
      xsd_MetaEdNameWithExtension: metaEdNameWithExtension(associationExtension),
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
