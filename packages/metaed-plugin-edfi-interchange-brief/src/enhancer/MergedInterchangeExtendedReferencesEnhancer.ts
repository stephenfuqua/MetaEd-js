import { ReferentialProperty, MetaEdEnvironment, TopLevelEntity, Namespace } from 'metaed-core';
import { EdFiXsdEntityRepository } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';
import { ReferenceUsageInfo } from '../model/ReferenceUsageInfo';
import { sortByNameThenRootEntityName } from '../model/ReferenceUsageInfo';
import { MergedInterchangeEdfiInterchangeBrief } from '../model/MergedInterchange';
import { addMergedInterchangeEdfiInterchangeBriefTo } from '../model/MergedInterchange';
import {
  getReferenceUsageInfoList,
  topLevelEntitiesFrom,
  topLevelReferencePropertiesFrom,
} from './MergedInterchangeDependenciesEnhancerBase';

const enhancerName = 'MergedInterchangeExtendedReferencesEnhancer';

export function enhance(metaEd: MetaEdEnvironment) {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const xsdRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (xsdRepository == null) return;

    xsdRepository.mergedInterchange.forEach(mergedInterchange => {
      addMergedInterchangeEdfiInterchangeBriefTo(mergedInterchange);

      const topLevelEntities: Array<TopLevelEntity> = topLevelEntitiesFrom(mergedInterchange);
      const topLevelReferenceProperties: Array<ReferentialProperty> = topLevelReferencePropertiesFrom(mergedInterchange);

      const previouslyMatchedProperties: Array<ReferentialProperty> = [];
      const referenceExclusionList: Array<string> = topLevelEntities.map(i => i.metaEdName);
      const allExtendedReferences: Array<ReferenceUsageInfo> = topLevelReferenceProperties.reduce(
        (referencedUsageInfos: Array<ReferenceUsageInfo>, tlrp: ReferentialProperty) => {
          const extendedReferencesFromProperty: Array<ReferenceUsageInfo> = [
            ...getReferenceUsageInfoList(
              ['domainEntity', 'association'],
              referenceExclusionList,
              previouslyMatchedProperties,
              tlrp,
            ),
          ];
          if (extendedReferencesFromProperty.length > 0) {
            referencedUsageInfos.push(...extendedReferencesFromProperty);
          }
          return referencedUsageInfos;
        },
        [],
      );
      allExtendedReferences.sort(sortByNameThenRootEntityName);
      (mergedInterchange.data
        .edfiInterchangeBrief as MergedInterchangeEdfiInterchangeBrief).interchangeBriefExtendedReferences.push(
        ...allExtendedReferences,
      );
    });
  });
  return {
    enhancerName,
    success: true,
  };
}
