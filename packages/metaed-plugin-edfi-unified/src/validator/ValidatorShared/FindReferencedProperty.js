// @flow
import type {
  EntityProperty,
  EntityRepository,
  ModelBase,
  ModelType,
  PropertyType,
} from '../../../../../packages/metaed-core/index';
import { asModelType } from '../../../../metaed-core/src/model/ModelType';
import { asTopLevelEntity } from '../../../../metaed-core/src/model/TopLevelEntity';
import { getEntity } from '../../../../../packages/metaed-core/index';

export const referenceTypes: Array<ModelType> = [
  'association',
  'associationExtension',
  'associationSubclass',
  'choice',
  'common',
  'domainEntity',
  'domainEntityExtension',
  'domainEntitySubclass',
  'inlineCommon',
];

export const commonTypes: Array<PropertyType> = [
  'choice',
  'common',
  'inlineCommon',
];

const subclassSuffix: string = 'Subclass';
const extensionSuffix: string = 'Extension';

export function getReferencedEntity(
  repository: EntityRepository,
  name: string,
  propertyType: ModelType | PropertyType,
): ?ModelBase {
  return getEntity(repository, name, ...[
    propertyType,
    `${propertyType}${extensionSuffix}`,
    `${propertyType}${subclassSuffix}`,
  ].map(x => asModelType(x)));
}

export function getBaseEntity(repository: EntityRepository, entity: ?ModelBase): ?ModelBase {
  if (!entity) return null;
  const modelTypes: Array<ModelType> = [];
  if (entity.type.match(subclassSuffix)) modelTypes.push(asModelType(entity.type.replace(subclassSuffix, '')));
  if (entity.type.match(extensionSuffix)) modelTypes.push(asModelType(entity.type.replace(extensionSuffix, '')));
  return getEntity(repository, asTopLevelEntity(entity).baseEntityName, ...modelTypes);
}

export const matchAll = () => (): boolean => true;

export const matchAllIdentityReferenceProperties = () =>
  (property: EntityProperty, parentContext: ModelBase): boolean =>
    ['choice', 'inlineCommon'].includes(parentContext.type)
    || ((property.isPartOfIdentity || property.isIdentityRename)
    && ['association', 'descriptor', 'domainEntity', 'enumeration'].includes(property.type));

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
      propertyContext = asTopLevelEntity(entityContext).properties
        // eslint-disable-next-line no-loop-func
        .find(x => (x.metaEdName === pathSegment || withContext(x) === pathSegment)
          // $FlowIgnore entityContext could be null
          && currentFilter(x, entityContext));
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
