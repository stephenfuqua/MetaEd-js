// @flow
import { DecimalProperty, newDecimalProperty } from './DecimalProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedDecimalProperty extends DecimalProperty {}

export function newSharedDecimalProperty(): SharedDecimalProperty {
  return Object.assign(new SharedDecimalProperty(), newDecimalProperty(), {
    type: 'sharedDecimal',
  });
}

export const asSharedDecimalProperty = (x: EntityProperty): SharedDecimalProperty => ((x: any): SharedDecimalProperty);
