// @flow
import type { MetaEdEnvironment, EnhancerResult, InterchangeItem, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';
import type { MergedInterchangeEdfiInterchangeBrief } from '../model/MergedInterchange';
import { escapeForMarkdownTableContent } from './Shared';

const enhancerName: string = 'MergedInterchangeEntitiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const xsdRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (xsdRepository == null) return;

    // eslint-disable-next-line prettier/prettier
    const mergedInterchanges: Array<MergedInterchange> = ((Array.from(
      xsdRepository.mergedInterchange.values(),
    ): any): Array<MergedInterchange>);

    mergedInterchanges.forEach(mergedInterchange => {
      const entities: Array<InterchangeItem> = ((mergedInterchange.identityTemplates.concat(
        mergedInterchange.elements,
      ): any): Array<InterchangeItem>);
      entities.forEach(entity => {
        if (entity.referencedEntity.type === 'domainEntityExtension') {
          entity.data.edfiInterchangeBrief = {
            ...entity.data.edfiInterchangeBrief,
            interchangeBriefDescription: entity.referencedEntity.baseEntity
              ? escapeForMarkdownTableContent(entity.referencedEntity.baseEntity.documentation)
              : '',
          };
        } else {
          entity.data.edfiInterchangeBrief = {
            ...entity.data.edfiInterchangeBrief,
            interchangeBriefDescription: escapeForMarkdownTableContent(entity.referencedEntity.documentation),
          };
        }
      });

      ((mergedInterchange.data
        .edfiInterchangeBrief: any): MergedInterchangeEdfiInterchangeBrief).interchangeBriefEntities.push(...entities);
    });
  });
  return {
    enhancerName,
    success: true,
  };
}
