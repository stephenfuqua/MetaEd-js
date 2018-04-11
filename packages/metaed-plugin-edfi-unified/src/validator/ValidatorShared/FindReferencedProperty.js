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

export function getReferencedEntities(
  repository: EntityRepository,
  name: string,
  propertyType: ModelType | PropertyType,
): Array<ModelBase> {
  return possibleModelTypesReferencedByProperty(propertyType).reduce(
    (result: Array<ModelBase>, type: ModelType | PropertyType) => {
      const entity = getEntity(repository, name, asModelType(type));
      if (entity != null) return result.concat(entity);
      return result;
    },
    [],
  );
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
    if (firstProperty == null) {
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
  initialEntity: ModelBase,
  propertyPath: Array<string>,
  filter: (property: EntityProperty, parentContext: ModelBase) => boolean = matchAll(),
): ?EntityProperty {
  const entities: Array<ModelBase> = [initialEntity];
  let currentEntity: ?ModelBase;
  let currentProperty: ?EntityProperty;

  propertyPath.some(pathSegment => {
    currentProperty = undefined;
    let currentFilter = filter;

    while (entities.length > 0 && currentProperty == null) {
      currentEntity = entities.pop();
      currentProperty = asTopLevelEntity(currentEntity).properties.find(
        // eslint-disable-next-line no-loop-func
        (property: EntityProperty) =>
          (property.metaEdName === pathSegment || withContext(property) === pathSegment) &&
          // $FlowIgnore entityContext could be null
          currentFilter(property, currentEntity),
      );

      if (currentProperty != null) {
        if (!referenceTypes.includes(asModelType(currentProperty.type))) return true;
        entities.push(...getReferencedEntities(repository, currentProperty.metaEdName, asModelType(currentProperty.type)));
      } else {
        const baseEntity = getBaseEntity(repository, currentEntity);
        if (baseEntity != null) entities.push(baseEntity);
        currentFilter = matchAllIdentityReferenceProperties();
      }
    }
    if (currentProperty != null && commonTypes.includes(currentProperty.type)) currentProperty = undefined;
    return false;
  });

  return currentProperty;
}
