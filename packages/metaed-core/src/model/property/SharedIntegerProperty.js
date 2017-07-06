// @flow
import { IntegerProperty, newIntegerCommonProperty } from './IntegerProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedIntegerProperty extends IntegerProperty {}

export function newSharedIntegerProperty(): SharedIntegerProperty {
  return Object.assign(new SharedIntegerProperty(), newIntegerCommonProperty(), {
    type: 'sharedInteger',
  });
}

export const asSharedIntegerProperty = (x: EntityProperty): SharedIntegerProperty => ((x: any): SharedIntegerProperty);
