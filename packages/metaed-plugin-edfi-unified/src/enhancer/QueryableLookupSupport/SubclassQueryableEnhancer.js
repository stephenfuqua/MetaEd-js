// @flow
import type {
  EnhancerResult,
  EntityProperty,
  MetaEdEnvironment,
  TopLevelEntity,
} from '../../../../../packages/metaed-core/index';
import { asTopLevelEntity, getAllEntities } from '../../../../../packages/metaed-core/index';

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
  getAllEntities(metaEd.entity).filter(x => asTopLevelEntity(x).baseEntity).forEach(entity => {
    asTopLevelEntity(entity).queryableFields.push(...includeBaseClassQueryableFields(asTopLevelEntity(entity), []));
  });

  return {
    enhancerName,
    success: true,
  };
}
