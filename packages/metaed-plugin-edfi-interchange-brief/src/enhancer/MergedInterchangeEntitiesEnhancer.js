// @flow
import type { MetaEdEnvironment, EnhancerResult, TopLevelEntity, InterchangeItem } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { escapeForMarkdownTableContent } from './Shared';
import { addEdfiBriefInterchangeTo } from '../model/MergedInterchange';

const enhancerName: string = 'MergedInterchangeEntitiesEnhancer';


export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  const mergedInterchanges: Array<MergedInterchange>
  = ((Array.from(edFiXsdEntityRepository.mergedInterchange.values()): any): Array<MergedInterchange>);

  mergedInterchanges.forEach(interchange => {
    addEdfiBriefInterchangeTo(interchange);
    const entities: Array<InterchangeItem> = ((interchange.identityTemplates.concat(interchange.elements): any): Array<InterchangeItem>);
    entities.forEach(entity => {
      const extension: TopLevelEntity = entity.referencedEntity;
      entity.data.EdfiInterchangeBrief = { interchangeBriefDescription: extension && extension.baseEntity ? escapeForMarkdownTableContent(extension.baseEntity.documentation)
      : escapeForMarkdownTableContent(entity.referencedEntity.documentation) };
    });
    interchange.data.EdfiInterchangeBrief.interchangeBriefEntities.push(...entities);
  });

  return {
    enhancerName,
    success: true,
  };
}
