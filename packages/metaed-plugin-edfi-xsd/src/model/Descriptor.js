// @flow
import type { MetaEdEnvironment, EnhancerResult, Descriptor } from '../../../../packages/metaed-core/index';

export type DescriptorEdfiXsd = {
  xsd_DescriptorName: string;
  xsd_DescriptorNameWithExtension: string;
  xsd_IsMapType: boolean;
  xsd_HasPropertiesOrMapType: boolean;
};

const enhancerName: string = 'DescriptorSetupEnhancer';

export function addDescriptorEdfiXsd(descriptor: Descriptor) {
  Object.assign(descriptor.data.edfiXsd, {
    xsd_DescriptorName: descriptor.metaEdName,
    xsd_DescriptorNameWithExtension: descriptor.metaEdName + descriptor.namespaceInfo.extensionEntitySuffix,
    xsd_IsMapType: false,
    xsd_HasPropertiesOrMapType: false,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.descriptor.forEach((descriptor: Descriptor) => {
    addDescriptorEdfiXsd(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
