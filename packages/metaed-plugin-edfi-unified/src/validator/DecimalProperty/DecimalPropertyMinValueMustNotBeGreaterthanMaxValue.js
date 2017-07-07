// @flow
import type { DecimalProperty, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import type { DecimalPropertySourceMap } from '../../../../../packages/metaed-core/src/model/property/DecimalProperty';
import { asDecimalProperty } from '../../../../../packages/metaed-core/src/model/property/DecimalProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(decimal => {
    const decimalProperty: DecimalProperty = asDecimalProperty(decimal);
    const minValue: number = Number.parseInt(decimalProperty.minValue || '0', 10);
    const maxValue: number = Number.parseInt(decimalProperty.maxValue || '0', 10);
    if (minValue <= maxValue) return;

    failures.push({
      validatorName: 'DecimalPropertyMinValueMustNotBeGreaterThanMaxValue',
      category: 'error',
      message: `${decimal.type} ${decimal.metaEdName} has min value greater than max value.`,
      sourceMap: ((decimal.sourceMap: any): DecimalPropertySourceMap).minValue,
      fileMap: null,
    });
  });
  return failures;
}
