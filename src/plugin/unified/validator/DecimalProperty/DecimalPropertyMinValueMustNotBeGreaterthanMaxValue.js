// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { DecimalProperty, DecimalPropertySourceMap, asDecimalProperty } from '../../../../core/model/property/DecimalProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntity.forEach(entity => {
    entity.properties.filter(p => p.type === 'decimal').forEach(property => {
      const decimalProperty: DecimalProperty = asDecimalProperty(property);
      if (decimalProperty.minValue && decimalProperty.maxValue &&
        // $FlowIgnore
        Number.parseInt(decimalProperty.minValue, 10) > Number.parseInt(decimalProperty.maxValue, 10)) {
        failures.push({
          validatorName: 'DecimalPropertyMinValueMustNotBeGreaterThanMaxValue',
          category: 'error',
          message: `${property.type} ${property.metaEdName} has min value greater than max value.`,
          sourceMap: ((property.sourceMap: any): DecimalPropertySourceMap).minValue,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
