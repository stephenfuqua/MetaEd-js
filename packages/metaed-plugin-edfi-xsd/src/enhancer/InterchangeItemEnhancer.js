// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import type { InterchangeItemEdfiXsd } from '../model/InterchangeItem';
import type { DescriptorEdfiXsd } from '../model/Descriptor';
import type { ModelBaseEdfiXsd } from '../model/ModelBase';

const enhancerName: string = 'InterchangeItemEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  Array.from(edFiXsdEntityRepository.mergedInterchange.values()).forEach(interchange => {
    interchange.elements.forEach(elementItem => {
      const interchangeItemEdfiXsd = ((elementItem.data.edfiXsd: any): InterchangeItemEdfiXsd);
      interchangeItemEdfiXsd.xsd_Name = elementItem.metaEdName;
      if (elementItem.referencedEntity.type === 'descriptor') {
        const referencedEntityEdfiXsd: DescriptorEdfiXsd = ((elementItem.referencedEntity.data
          .edfiXsd: any): DescriptorEdfiXsd);
        interchangeItemEdfiXsd.xsd_Type = referencedEntityEdfiXsd.xsd_DescriptorNameWithExtension;
      } else {
        const referencedEntityEdfiXsd: ModelBaseEdfiXsd = ((elementItem.referencedEntity.data
          .edfiXsd: any): ModelBaseEdfiXsd);
        interchangeItemEdfiXsd.xsd_Type = referencedEntityEdfiXsd.xsd_MetaEdNameWithExtension();
      }
    });

    interchange.identityTemplates.forEach(elementItem => {
      const identityTemplateItemEdfiXsd = ((elementItem.data.edfiXsd: any): InterchangeItemEdfiXsd);
      identityTemplateItemEdfiXsd.xsd_Name = `${elementItem.metaEdName}Reference`;
      const referencedEntityEdfiXsd: ModelBaseEdfiXsd = ((elementItem.referencedEntity.data.edfiXsd: any): ModelBaseEdfiXsd);
      identityTemplateItemEdfiXsd.xsd_Type = `${referencedEntityEdfiXsd.xsd_MetaEdNameWithExtension()}ReferenceType`;
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
