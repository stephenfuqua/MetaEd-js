// @flow
import { StringProperty, stringPropertyFactory } from './StringProperty';

export class SharedStringProperty extends StringProperty {}

export function sharedStringPropertyFactory(): SharedStringProperty {
  return Object.assign(new SharedStringProperty(), stringPropertyFactory(), {
    type: 'shared string',
  });
}
