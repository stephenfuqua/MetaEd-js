// @flow
import { StringProperty, newStringProperty } from './StringProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedStringProperty extends StringProperty {}

export function newSharedStringProperty(): SharedStringProperty {
  return Object.assign(new SharedStringProperty(), newStringProperty(), {
    type: 'sharedString',
  });
}

export const asSharedStringProperty = (x: EntityProperty): SharedStringProperty => ((x: any): SharedStringProperty);
