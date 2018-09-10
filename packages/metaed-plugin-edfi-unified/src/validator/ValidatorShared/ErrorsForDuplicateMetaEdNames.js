// @flow
import type { ModelBase, ValidationFailure } from 'metaed-core';
import { asTopLevelEntity } from 'metaed-core';
import { groupByMetaEdName } from '../../shared/GroupByMetaEdName';

export function generateValidationErrorsForDuplicates(
  metaEdEntity: Array<ModelBase>,
  validatorName: string,
): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  groupByMetaEdName(metaEdEntity).forEach((entities, metaEdName) => {
    if (entities.length > 1) {
      entities.forEach(entity => {
        failures.push({
          validatorName,
          category: 'error',
          message: `${
            asTopLevelEntity(entity).typeHumanizedName
          } named ${metaEdName} is a duplicate declaration of that name.`,
          sourceMap: asTopLevelEntity(entity).sourceMap.type,
          fileMap: null,
        });
      });
    }
  });
  return failures;
}
