// @flow
import { ShortProperty, newShortProperty } from './ShortProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedShortProperty extends ShortProperty {}

export function newSharedShortProperty(): SharedShortProperty {
  return Object.assign(new SharedShortProperty(), newShortProperty(), {
    type: 'sharedShort',
    typeHumanizedName: 'Shared Short Property',
  });
}

export const asSharedShortProperty = (x: EntityProperty): SharedShortProperty => ((x: any): SharedShortProperty);
