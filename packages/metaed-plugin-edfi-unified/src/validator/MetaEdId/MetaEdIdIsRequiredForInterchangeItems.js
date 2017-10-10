// @flow
import type { Interchange, InterchangeExtension, MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import { getEntitiesOfType } from '../../../../metaed-core/index';
import { asInterchange } from '../../../../metaed-core/src/model/Interchange';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getEntitiesOfType(metaEd.entity, 'interchange', 'interchangeExtension').forEach(entity => {
    const interchange: Interchange | InterchangeExtension = asInterchange(entity);
    if (interchange.elements.length === 0 && interchange.identityTemplates.length === 0) return;
    [...interchange.elements, ...interchange.identityTemplates].forEach(interchangeItem => {
      if (interchangeItem.metaEdId) return;
      failures.push({
        validatorName: 'MetaEdIdIsRequiredForInterchangeItems',
        category: 'warning',
        message: `${interchangeItem.typeHumanizedName} ${interchangeItem.metaEdName} is missing a MetaEdId value.`,
        sourceMap: interchangeItem.sourceMap.referencedType,
        fileMap: null,
      });
    });
  });
  return failures;
}
