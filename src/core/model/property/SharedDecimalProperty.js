// @flow
import { DecimalProperty, decimalPropertyFactory } from './DecimalProperty';

export class SharedDecimalProperty extends DecimalProperty {}

export function sharedDecimalPropertyFactory(): SharedDecimalProperty {
  return Object.assign(new SharedDecimalProperty(), decimalPropertyFactory(), {
    type: 'sharedDecimal',
  });
}
