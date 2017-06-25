// @flow
import { StringProperty, stringPropertyFactory } from './StringProperty';
import type { EntityProperty } from './EntityProperty';

export class SharedStringProperty extends StringProperty {}

export function sharedStringPropertyFactory(): SharedStringProperty {
  return Object.assign(new SharedStringProperty(), stringPropertyFactory(), {
    type: 'sharedString',
  });
}

export const asSharedStringProperty = (x: EntityProperty): SharedStringProperty => ((x: any): SharedStringProperty);
