// @flow
import type {
  DomainItem,
  EntityProperty,
  EntityRepository,
  EnumerationItem,
  InterchangeItem,
  MetaEdEnvironment,
  ModelBase,
  ValidationFailure,
  TopLevelEntity,
} from 'metaed-core';
import { getAllEntitiesNoSimpleTypes, getAllProperties } from 'metaed-core';

function getDomainItems(entity: EntityRepository): Array<DomainItem> {
  const result = [];
  entity.domain.forEach(domain => result.push(...domain.domainItems));
  entity.subdomain.forEach(subdomain => result.push(...subdomain.domainItems));
  return result;
}

function getEnumerationItems(entity: EntityRepository): Array<EnumerationItem> {
  const result = [];
  entity.enumeration.forEach(enumeration => result.push(...enumeration.enumerationItems));
  entity.mapTypeEnumeration.forEach(mapType => result.push(...mapType.enumerationItems));
  entity.schoolYearEnumeration.forEach(schoolYear => result.push(...schoolYear.enumerationItems));
  return result;
}

function getInterchangeItems(entity: EntityRepository): Array<InterchangeItem> {
  const result = [];
  entity.interchange.forEach(interchange => result.push(...interchange.elements, ...interchange.identityTemplates));
  entity.interchangeExtension.forEach(extension => result.push(...extension.elements, ...extension.identityTemplates));
  return result;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  const index: Array<DomainItem | EntityProperty | EnumerationItem | InterchangeItem | ModelBase | TopLevelEntity> = [
    ...getAllEntitiesNoSimpleTypes(metaEd.entity),
    ...getAllProperties(metaEd.propertyIndex),
    ...getDomainItems(metaEd.entity),
    ...getEnumerationItems(metaEd.entity),
    ...getInterchangeItems(metaEd.entity),
  ];

  const metaEdIdMap: Object = {};
  index.forEach(item => {
    if (!item.metaEdId) return;
    metaEdIdMap[item.metaEdId] = metaEdIdMap[item.metaEdId] || [];
    metaEdIdMap[item.metaEdId].push(item);
  });

  Object.keys(metaEdIdMap).forEach(metaEdId => {
    if (metaEdIdMap[metaEdId].length <= 1) return;
    metaEdIdMap[metaEdId].forEach(entity => {
      const metaEdName: string = entity.metaEdName ? entity.metaEdName : entity.shortDescription;
      failures.push({
        validatorName: 'MustNotDuplicateMetaEdId',
        category: 'warning',
        message: `MetaEdId '${entity.metaEdId}' on ${entity.typeHumanizedName} ${metaEdName} already exists on another entity. All MetaEdIds must be globally unique.`,
        sourceMap: entity.sourceMap.metaEdId,
        fileMap: null,
      });
    });
  });

  return failures;
}
