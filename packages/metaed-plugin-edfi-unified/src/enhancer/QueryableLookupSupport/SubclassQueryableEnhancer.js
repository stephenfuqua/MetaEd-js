// @flow
import type { EnhancerResult, EntityProperty, MetaEdEnvironment, TopLevelEntity } from 'metaed-core';
import { asTopLevelEntity, getAllEntities } from 'metaed-core';

const enhancerName: string = 'SubclassQueryableEnhancer';

function includeBaseClassQueryableFields(
  entity: TopLevelEntity,
  queryableProperties: Array<EntityProperty>,
): Array<EntityProperty> {
  const baseEntity = entity.baseEntity;
  if (!baseEntity) return queryableProperties;
  const entityIdentityRenames = entity.identityProperties.filter(x => x.isIdentityRename).map(x => x.baseKeyName);
  queryableProperties.push(...baseEntity.queryableFields.filter(x => !entityIdentityRenames.includes(x.metaEdName)));
  return includeBaseClassQueryableFields(baseEntity, queryableProperties);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntities(metaEd.entity)
    .map(x => asTopLevelEntity(x))
    .filter(x => x.baseEntity && x.baseEntity.queryableFields)
    .forEach(entity => entity.queryableFields.push(...includeBaseClassQueryableFields(entity, [])));

  return {
    enhancerName,
    success: true,
  };
}
