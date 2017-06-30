// @flow
import { DecimalProperty, decimalPropertyFactory } from './DecimalProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedDecimalProperty extends DecimalProperty {}

export function sharedDecimalPropertyFactory(): SharedDecimalProperty {
  return Object.assign(new SharedDecimalProperty(), decimalPropertyFactory(), {
    type: 'sharedDecimal',
  });
}

export const asSharedDecimalProperty = (x: EntityProperty): SharedDecimalProperty => ((x: any): SharedDecimalProperty);
