// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { IntegerProperty, IntegerPropertySourceMap, asIntegerProperty } from '../../../../../packages/metaed-core/src/model/property/IntegerProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.integer.forEach(integer => {
    const integerProperty: IntegerProperty = asIntegerProperty(integer);
    const minValue: number = Number.parseInt(integerProperty.minValue || '0', 10);
    const maxValue: number = Number.parseInt(integerProperty.maxValue || '0', 10);
    if (minValue <= maxValue) return;

    failures.push({
      validatorName: 'IntegerPropertyMinValueMustNotBeGreaterThanMaxValue',
      category: 'error',
      message: `${integer.type} ${integer.metaEdName} has min value greater than max value.`,
      sourceMap: ((integer.sourceMap: any): IntegerPropertySourceMap).minValue,
      fileMap: null,
    });
  });
  return failures;
}
