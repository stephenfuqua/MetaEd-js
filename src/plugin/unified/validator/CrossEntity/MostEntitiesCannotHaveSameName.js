// @flow
import { entitiesNeedingDuplicateChecking } from '../../../../core/model/Repository';
import type { Repository, MostEntities } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyType } from '../../../../core/model/property/PropertyType';
import type { EntityProperty } from '../../../../core/model/property/EntityProperty';

function groupByMetaEdName(entities: Array<MostEntities>): Map<string, Array<MostEntities>> {
  return entities.reduce((structure: Map<string, Array<MostEntities>>, entity: MostEntities) => {
    if (!structure.has(entity.metaEdName)) structure.set(entity.metaEdName, []);
    // $FlowIgnore - we ensure the key is in the map above
    structure.get(entity.metaEdName).push(entity);
    return structure;
  }, new Map());
}

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: Map<PropertyType, Array<EntityProperty>>): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  groupByMetaEdName(entitiesNeedingDuplicateChecking(repository)).forEach((entities, metaEdName) => {
    if (entities.length > 1) {
      entities.forEach(entity => {
        failures.push({
          validatorName: 'MostEntitiesCannotHaveSameName',
          category: 'error',
          message: `${entity.typeGroupHumanizedName} named ${metaEdName} is a duplicate declaration of that name.`,
          sourceMap: entity.sourceMap.type,
          fileMap: null,
        });
      });
    }
  });

  return failures;
}
