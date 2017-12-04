// @flow
import { ReferentialProperty, isReferentialProperty } from 'metaed-core';
import type { MetaEdEnvironment, TopLevelEntity, EntityProperty } from 'metaed-core';
import type { EdFiXsdEntityRepository } from 'metaed-plugin-edfi-xsd';
import { escapeForMarkdownTableContent } from './Shared';
import { addEdfiBriefInterchangeTo } from '../model/MergedInterchange';
import type { ReferencedUsageInfo } from '../model/ReferencedUsageInfo';

function buildReferencedUsageInfo(referentialProperty: ReferentialProperty, rootEntityName: string, isOptional): ReferencedUsageInfo {
  const descriptor: TopLevelEntity = referentialProperty.referencedEntity;
  const cardinalityDescription: string = `${isOptional ? 'Optional' : 'Required'}. `;
  let name: string;
  let description: string;
  if (descriptor.type !== 'descriptor') {
    name = referentialProperty.data.EdfiXsd.xsd_Name;
    description = cardinalityDescription + referentialProperty.documentation;
  } else {
    name = descriptor.data.EdfiXsd.xsd_DescriptorName;
    description = cardinalityDescription + descriptor.documentation;
  }
  return {
    name: escapeForMarkdownTableContent(name),
    rootEntityName: escapeForMarkdownTableContent(rootEntityName),
    isOptional,
    description: escapeForMarkdownTableContent(description),
  };
}

function getReferenceUsageInfoList(entityExclusionList, previouslyMatchedProperties, referentialProperty: ReferentialProperty, rootEntityNameParam, isParentRelationshipOptional): Array<ReferencedUsageInfo> {
  const results: Array<ReferencedUsageInfo> = [];
  const rootEntityName = rootEntityNameParam || referentialProperty.parentEntityName;
  const isOptional = isParentRelationshipOptional || referentialProperty.isOptional || referentialProperty.isOptionalCollection;
  if (referentialProperty.type === 'domainEntity'
    && !entityExclusionList.find(i => i === referentialProperty.referencedEntity.metaEdName)
    && !previouslyMatchedProperties.find(i => i === referentialProperty)) {
    results.push(buildReferencedUsageInfo(referentialProperty, rootEntityName, isOptional));
    previouslyMatchedProperties.push(referentialProperty);
    return results;
  } else if (['inlineCommon', 'common', 'choice'].includes(referentialProperty.type)) {
    const referencedEntityProperties: Array<ReferentialProperty> = (referentialProperty.referencedEntity.properties.filter(isReferentialProperty): any);
    results.push(...referencedEntityProperties.reduce((arr, rep) => { arr.push(...getReferenceUsageInfoList(entityExclusionList, previouslyMatchedProperties, rep, rootEntityName, isOptional)); return arr; }, []));
  }
  return results;
}

function getEntityAndParents(referencedEntity): Array<TopLevelEntity> {
  const results: Array<TopLevelEntity> = [referencedEntity];
  if (referencedEntity.baseEntity) {
    results.push(...getEntityAndParents(referencedEntity.baseEntity));
  }
  return results;
}

function getPropertiesToScan(topLevelEntity, identityOnly): Array<ReferentialProperty> {
  const results: Array<ReferentialProperty> = [];
  const propertiesToAdd: Array<ReferentialProperty> = (((identityOnly ? topLevelEntity.identityProperties : topLevelEntity.properties).filter(isReferentialProperty): any): Array<ReferentialProperty>);
  results.push(...propertiesToAdd);

  if (topLevelEntity.baseEntity) {
    results.push(...getPropertiesToScan(topLevelEntity.baseEntity, identityOnly));
  }
  return results;
}
function sortByMetaEdName(a: any, b: any) {
  if (a.metaEdName < b.metaEdName) return -1;
  if (a.metaEdName > b.metaEdName) return 1;
  return 0;
}
export function enhance(metaEd: MetaEdEnvironment) {
  const xsdRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfi-Xsd'): any).entity;
  xsdRepository.mergedInterchange.forEach(interchange => {
    addEdfiBriefInterchangeTo(interchange);
    const interchangeTopLevelEntities: Array<TopLevelEntity> = interchange.elements.reduce((array, element) => {
      array.push(...getEntityAndParents(element.referencedEntity));
      return array;
    }, []);
    const identityTemplatesTopLevelEntities: Array<TopLevelEntity> = interchange.identityTemplates.reduce((array, element) => {
      array.push(...getEntityAndParents(element.referencedEntity));
      return array;
    }, []);
    const topLevelEntities: Array<TopLevelEntity> = interchangeTopLevelEntities.concat(identityTemplatesTopLevelEntities);

    const interchangeTopLevelReferenceProperties: Array<ReferentialProperty> = interchange.elements.reduce((array, element) => {
      array.push(...getPropertiesToScan(element.referencedEntity));
      return array;
    }, []);
    const identityTemplatesTopLevelReferenceProperties: Array<ReferentialProperty> = interchange.identityTemplates.reduce((array, element) => {
      array.push(...getPropertiesToScan(element.referencedEntity));
      return array;
    }, []);
    const topLevelReferenceProperties: Array<ReferentialProperty> = interchangeTopLevelReferenceProperties.concat(identityTemplatesTopLevelReferenceProperties);
    const previouslyMatchedProperties: Array<EntityProperty> = [];
    const referenceExclusionList: Array<string> = topLevelEntities.map(i => i.metaEdName);
    const allExtendedReferences: Array<ReferencedUsageInfo> = topLevelReferenceProperties.reduce(
      (arr, tlrp) => {
        const extendedReferencesFromProperty: Array<ReferencedUsageInfo> = [...getReferenceUsageInfoList(referenceExclusionList, previouslyMatchedProperties, tlrp)];
        extendedReferencesFromProperty.sort(sortByMetaEdName);
        if (extendedReferencesFromProperty.length > 0) {
          arr.push(...extendedReferencesFromProperty);
        }
        return arr;
      }, []);
    interchange.data.EdfiInterchangeBrief.interchangeBriefExtendedReferences.push(...allExtendedReferences);
  });
}
