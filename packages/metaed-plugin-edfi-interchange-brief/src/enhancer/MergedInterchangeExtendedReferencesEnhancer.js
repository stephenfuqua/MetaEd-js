// @flow
import { ReferentialProperty } from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { escapeForMarkdownTableContent } from './Shared';

function buildReferencedUsageInfo(referentialProperty, rootEntityName, isOptional) {
  const descriptor = referentialProperty.referencedEntity;
  const cardinalityDescription = `${isOptional ? 'Optional' : 'Required'}. `;
  let name;
  let description;
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

function isReferentialProperty(property) {
  return Object.keys(property).includes('referencedEntity');
}

function getReferenceUsageInfoList(entityExclusionList, previouslyMatchedProperties, referentialProperty: ReferentialProperty, rootEntityNameParam, isParentRelationshipOptional) {
  const results = [];
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

function getEntityAndParents(referencedEntity) {
  const results = [referencedEntity];
  if (referencedEntity.baseEntity) {
    results.push(...getEntityAndParents(referencedEntity.baseEntity));
  }
  return results;
}

function getPropertiesToScan(topLevelEntity, identityOnly) {
  const results = [];
  const propertiesToAdd = (identityOnly ? topLevelEntity.identityProperties : topLevelEntity.properties).filter(isReferentialProperty);
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
  const xsdRepository = (metaEd.plugin.get('edfi-Xsd'): any).entity;
  xsdRepository.mergedInterchange.forEach(interchange => {
    const interchangeTopLevelEntities = interchange.elements.reduce((array, element) => {
      array.push(...getEntityAndParents(element.referencedEntity));
      return array;
    }, []);
    const identityTemplatesTopLevelEntities = interchange.identityTemplates.reduce((array, element) => {
      array.push(...getEntityAndParents(element.referencedEntity));
      return array;
    }, []);
    const topLevelEntities = interchangeTopLevelEntities.concat(identityTemplatesTopLevelEntities);

    const interchangeTopLevelReferenceProperties = interchange.elements.reduce((array, element) => {
      array.push(...getPropertiesToScan(element.referencedEntity));
      return array;
    }, []);
    const identityTemplatesTopLevelReferenceProperties = interchange.identityTemplates.reduce((array, element) => {
      array.push(...getPropertiesToScan(element.referencedEntity));
      return array;
    }, []);
    const topLevelReferenceProperties: Array<ReferentialProperty> = interchangeTopLevelReferenceProperties.concat(identityTemplatesTopLevelReferenceProperties);
    const previouslyMatchedProperties = [];
    const referenceExclusionList = topLevelEntities.map(i => i.metaEdName);
    const allExtendedReferences = topLevelReferenceProperties.reduce(
      (arr, tlrp) => {
        const extendedReferencesFromProperty = [...getReferenceUsageInfoList(referenceExclusionList, previouslyMatchedProperties, tlrp)];
        extendedReferencesFromProperty.sort(sortByMetaEdName);
        if (extendedReferencesFromProperty.length > 0) {
          arr.push(...extendedReferencesFromProperty);
        }
        return arr;
      }, []);
    interchange.interchangeBriefExtendedReferences.push(...allExtendedReferences);
  });
}
