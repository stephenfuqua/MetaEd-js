// @flow
import type { EntityProperty, EntityRepository, ModelBase, ModelType, PropertyType } from 'metaed-core';
import { asModelType, getEntity, asTopLevelEntity, allEntityModelTypes } from 'metaed-core';

export const referenceTypes: Array<ModelType> = [
  'association',
  'associationExtension',
  'associationSubclass',
  'domainEntity',
  'domainEntityExtension',
  'domainEntitySubclass',
  'choice',
  'common',
  'inlineCommon',
];

export const commonTypes: Array<PropertyType> = ['choice', 'common', 'inlineCommon'];

const subclassSuffix: string = 'Subclass';
const extensionSuffix: string = 'Extension';

function possibleModelTypesReferencedByProperty(propertyType: ModelType | PropertyType): Array<ModelType> {
  const allEntityModelTypesUntyped = ((allEntityModelTypes: any): Array<string>);
  const result = [propertyType];
  if (allEntityModelTypesUntyped.includes(`${propertyType}${extensionSuffix}`))
    result.push(`${propertyType}${extensionSuffix}`);
  if (allEntityModelTypesUntyped.includes(`${propertyType}${subclassSuffix}`))
    result.push(`${propertyType}${subclassSuffix}`);
  return result.map(x => asModelType(x));
}

export function getReferencedEntity(
  repository: EntityRepository,
  name: string,
  propertyType: ModelType | PropertyType,
): ?ModelBase {
  return getEntity(repository, name, ...possibleModelTypesReferencedByProperty(propertyType));
}

export function getBaseEntity(repository: EntityRepository, entity: ?ModelBase): ?ModelBase {
  if (!entity) return null;
  const modelTypes: Array<ModelType> = [];
  if (entity.type.match(subclassSuffix)) modelTypes.push(asModelType(entity.type.replace(subclassSuffix, '')));
  if (entity.type.match(extensionSuffix)) modelTypes.push(asModelType(entity.type.replace(extensionSuffix, '')));
  return getEntity(repository, asTopLevelEntity(entity).baseEntityName, ...modelTypes);
}

export const matchAll = () => (): boolean => true;

export const matchAllIdentityReferenceProperties = () => (property: EntityProperty, parentContext: ModelBase): boolean =>
  ['choice', 'inlineCommon'].includes(parentContext.type) ||
  ((property.isPartOfIdentity || property.isIdentityRename) &&
    ['association', 'descriptor', 'domainEntity', 'enumeration', 'schoolYearEnumeration'].includes(property.type));

export const matchAllButFirstAsIdentityProperties = () => {
  let firstProperty: EntityProperty;
  return (property: EntityProperty, parentContext: ModelBase): boolean => {
    if (!firstProperty) {
      firstProperty = property;
      return true;
    }
    if (firstProperty === property) return true;
    return matchAllIdentityReferenceProperties()(property, parentContext);
  };
};

export function withContext(property: EntityProperty): string {
  if (!property.withContext) return '';
  return !property.shortenTo
    ? `${property.withContext}${property.metaEdName}`
    : `${property.shortenTo}${property.metaEdName}`;
}

export function findReferencedProperty(
  repository: EntityRepository,
  entity: ModelBase,
  propertyPath: Array<string>,
  filter: (property: EntityProperty, parentContext: ModelBase) => boolean = matchAll(),
): ?EntityProperty {
  let entityContext: ?ModelBase = entity;
  let propertyContext: ?EntityProperty;
  propertyPath.some(pathSegment => {
    propertyContext = undefined;
    let currentFilter = filter;
    while (entityContext && !propertyContext) {
      propertyContext = asTopLevelEntity(entityContext).properties.find(
        // eslint-disable-next-line no-loop-func
        x =>
          (x.metaEdName === pathSegment || withContext(x) === pathSegment) &&
          // $FlowIgnore entityContext could be null
          currentFilter(x, entityContext),
      );
      if (propertyContext) break;
      entityContext = getBaseEntity(repository, entityContext);
      currentFilter = matchAllIdentityReferenceProperties();
    }
    if (!propertyContext || !referenceTypes.includes(asModelType(propertyContext.type))) return true;
    entityContext = getReferencedEntity(repository, propertyContext.metaEdName, asModelType(propertyContext.type));
    if (propertyContext && commonTypes.includes(propertyContext.type)) propertyContext = undefined;
    return false;
  });
  return propertyContext;
}
