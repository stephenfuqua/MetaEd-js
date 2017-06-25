// @flow
import { IntegerProperty, integerPropertyFactory } from './IntegerProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedIntegerProperty extends IntegerProperty {}

export function sharedIntegerPropertyFactory(): SharedIntegerProperty {
  return Object.assign(new SharedIntegerProperty(), integerPropertyFactory(), {
    type: 'sharedInteger',
  });
}

export const asSharedIntegerProperty = (x: EntityProperty): SharedIntegerProperty => ((x: any): SharedIntegerProperty);
