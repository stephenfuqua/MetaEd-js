// @flow
import { IntegerProperty, newIntegerProperty } from './IntegerProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedIntegerProperty extends IntegerProperty {}

export function newSharedIntegerProperty(): SharedIntegerProperty {
  return Object.assign(new SharedIntegerProperty(), newIntegerProperty(), {
    type: 'sharedInteger',
  });
}

export const asSharedIntegerProperty = (x: EntityProperty): SharedIntegerProperty => ((x: any): SharedIntegerProperty);
