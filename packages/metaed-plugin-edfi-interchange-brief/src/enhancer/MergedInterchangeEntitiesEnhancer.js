// @flow
import type { MetaEdEnvironment, EnhancerResult, TopLevelEntity } from 'metaed-core';
import type { EdFiXsdEntityRepository } from 'metaed-plugin-edfi-xsd';
import type { MergedInterchange } from '../../src/model/MergedInterchange';
import type { InterchangeItem } from '../../src/model/InterchangeItem';
import { escapeForMarkdownTableContent } from './Shared';

const enhancerName: string = 'MergedInterchangeEntitiesEnhancer';


export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  const mergedInterchanges: Array<MergedInterchange>
  = ((Array.from(edFiXsdEntityRepository.mergedInterchange.values()): any): Array<MergedInterchange>);

  mergedInterchanges.forEach(interchange => {
    const entities: Array<InterchangeItem> = ((interchange.identityTemplates.concat(interchange.elements): any): Array<InterchangeItem>);
    entities.forEach(entity => {
      const extension: TopLevelEntity = entity.referencedEntity;
      entity.interchangeBriefDescription = extension && extension.baseEntity ? escapeForMarkdownTableContent(extension.baseEntity.documentation)
      : escapeForMarkdownTableContent(entity.referencedEntity.documentation);
    });
    interchange.interchangeBriefEntities.push(...entities);
  });

  return {
    enhancerName,
    success: true,
  };
}
