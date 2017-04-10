// @flow
import { IntegerProperty, integerPropertyFactory } from './IntegerProperty';

export class SharedIntegerProperty extends IntegerProperty {}

export function sharedIntegerPropertyFactory(): SharedIntegerProperty {
  return Object.assign(new SharedIntegerProperty(), integerPropertyFactory(), {
    type: 'shared integer',
  });
}
