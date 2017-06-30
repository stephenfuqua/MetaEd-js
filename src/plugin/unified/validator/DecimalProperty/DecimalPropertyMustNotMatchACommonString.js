// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntity.forEach(entity => {
    entity.properties.forEach(property => {
      metaEd.entity.sharedString.forEach(sharedString => {
        if (property.metaEdName === sharedString.metaEdName) {
          failures.push({
            validatorName: 'DecimalPropertyMustNotMatchACommonString',
            category: 'error',
            message: `${property.type} ${property.metaEdName} has the same name as a Common String.`,
            sourceMap: property.sourceMap.metaEdName,
            fileMap: null,
          });
        }
      });
    });
  });

  return failures;
}
