// @flow
import type { ShortProperty, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import type { ShortPropertySourceMap } from '../../../../../packages/metaed-core/src/model/property/ShortProperty';
import { asShortProperty } from '../../../../../packages/metaed-core/src/model/property/ShortProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.short.forEach(short => {
    const shortProperty: ShortProperty = asShortProperty(short);
    const minValue: number = Number.parseInt(shortProperty.minValue || '0', 10);
    const maxValue: number = Number.parseInt(shortProperty.maxValue || '0', 10);
    if (minValue <= maxValue) return;

    failures.push({
      validatorName: 'ShortPropertyMinValueMustNotBeGreaterThanMaxValue',
      category: 'error',
      message: `Short Property ${short.metaEdName} has min value greater than max value.`,
      sourceMap: ((short.sourceMap: any): ShortPropertySourceMap).minValue,
      fileMap: null,
    });
  });

  return failures;
}
