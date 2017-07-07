// @flow
import type { MetaEdEnvironment, ValidationFailure, StringProperty } from '../../../../../packages/metaed-core/index';
import type { StringPropertySourceMap } from '../../../../../packages/metaed-core/src/model/property/StringProperty';
import { asStringProperty } from '../../../../../packages/metaed-core/src/model/property/StringProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.string.forEach(string => {
    const stringProperty: StringProperty = asStringProperty(string);
    const minLength: number = Number.parseInt(stringProperty.minLength || '0', 10);
    const maxLength: number = Number.parseInt(stringProperty.maxLength || '0', 10);
    if (minLength <= maxLength) return;

    failures.push({
      validatorName: 'StringPropertyMinLengthMustNotBeGreaterThanMaxLength',
      category: 'error',
      message: `String Property ${string.metaEdName} has min length greater than max length.`,
      sourceMap: ((string.sourceMap: any): StringPropertySourceMap).minLength,
      fileMap: null,
    });
  });

  return failures;
}
