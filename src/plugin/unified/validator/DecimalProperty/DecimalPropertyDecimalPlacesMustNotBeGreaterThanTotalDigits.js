// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { DecimalProperty, DecimalPropertySourceMap, asDecimalProperty } from '../../../../core/model/property/DecimalProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntity.forEach(entity => {
    entity.properties.filter(p => p.type === 'decimal').forEach(property => {
      const decimalProperty: DecimalProperty = asDecimalProperty(property);
      if (decimalProperty.decimalPlaces && decimalProperty.totalDigits &&
        Number.parseInt(decimalProperty.decimalPlaces, 10) > Number.parseInt(decimalProperty.totalDigits, 10)) {
        failures.push({
          validatorName: 'DecimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits',
          category: 'error',
          message: `${property.type} ${property.metaEdName} has decimal places greater than total digits.`,
          sourceMap: ((property.sourceMap: any): DecimalPropertySourceMap).decimalPlaces,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
