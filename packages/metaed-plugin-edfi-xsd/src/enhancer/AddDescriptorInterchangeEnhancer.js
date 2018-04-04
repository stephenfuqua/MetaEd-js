// @flow
import type { MetaEdEnvironment, EnhancerResult, NamespaceInfo, Descriptor, InterchangeItem } from 'metaed-core';
import { newInterchangeItem } from 'metaed-core';
import { addInterchangeItemEdfiXsdTo } from '../model/InterchangeItem';
import { newMergedInterchange, addMergedInterchangeToRepository } from '../model/MergedInterchange';
import type { MergedInterchange } from '../model/MergedInterchange';

const enhancerName: string = 'AddDescriptorInterchangeEnhancer';

export const descriptorInterchangeName: string = 'Descriptors';
const descriptorInterchangeDocumentation: string = `Descriptors provide states, districts, vendors, and other users of the Ed-Fi solution with the flexibility to use their own enumerations and code sets without modifying the Ed-Fi core schema.
The Descriptor interchange is used to describe metadata about the descriptors and their structure. It is used to define enumeration vocabularies that are not "fixed" within the XML schema, but are loaded in XML files and linked to their source.`;

const descriptorUseCaseDocumentation: string = `1. Exchange state, district, or vendor code sets in a way that Ed-Fi technology implementations can understand the semantics
2. Exchange code or enumeration values that change over time, but where longitudinal analysis is still important`;

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const allDescriptors: Array<Descriptor> = Array.from(metaEd.entity.descriptor.values());
  metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
    // Skip this namespace if no new descriptors defined
    if (allDescriptors.every((descriptor: Descriptor) => descriptor.namespaceInfo.namespace !== namespaceInfo.namespace))
      return;

    const descriptorInterchange: MergedInterchange = {
      ...newMergedInterchange(),
      namespaceInfo,
      metaEdName: descriptorInterchangeName,
      documentation: descriptorInterchangeDocumentation,
      useCaseDocumentation: descriptorUseCaseDocumentation,
    };

    // Include all core descriptors and all descriptors for the current namespace
    allDescriptors
      .filter(ad => !ad.namespaceInfo.isExtension || ad.namespaceInfo.namespace === namespaceInfo.namespace)
      .forEach((descriptor: Descriptor) => {
        const element: InterchangeItem = Object.assign(newInterchangeItem(), {
          metaEdName: descriptor.data.edfiXsd.xsd_DescriptorName,
          namespaceInfo,
          referencedEntity: descriptor,
        });
        addInterchangeItemEdfiXsdTo(element);
        descriptorInterchange.elements.push(element);
      });

    if (descriptorInterchange.elements.length > 0) addMergedInterchangeToRepository(metaEd, descriptorInterchange);
  });

  return {
    enhancerName,
    success: true,
  };
}
