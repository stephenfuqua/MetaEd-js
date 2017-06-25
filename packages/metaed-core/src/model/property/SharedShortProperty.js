// @flow
import { ShortProperty, shortPropertyFactory } from './ShortProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedShortProperty extends ShortProperty {}

export function sharedShortPropertyFactory(): SharedShortProperty {
  return Object.assign(new SharedShortProperty(), shortPropertyFactory(), {
    type: 'sharedShort',
  });
}

export const asSharedShortProperty = (x: EntityProperty): SharedShortProperty => ((x: any): SharedShortProperty);
