// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { getAllEntities } from '../../../../../packages/metaed-core/index';
import { asTopLevelEntity } from '../../../../metaed-core/src/model/TopLevelEntity';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getAllEntities(metaEd.entity).forEach(entity => {
    if (entity.metaEdId) return;
    const topLevelEntity = asTopLevelEntity(entity);
    failures.push({
      validatorName: 'MetaEdIdIsRequiredForEntities',
      category: 'warning',
      message: `${topLevelEntity.typeHumanizedName} ${topLevelEntity.metaEdName} is missing a MetaEdId value.`,
      sourceMap: topLevelEntity.sourceMap.type,
      fileMap: null,
    });
  });
  return failures;
}
