// @flow
import { ShortProperty, shortPropertyFactory } from './ShortProperty';

export class SharedShortProperty extends ShortProperty {}

export function sharedShortPropertyFactory(): SharedShortProperty {
  return Object.assign(new SharedShortProperty(), shortPropertyFactory(), {
    type: 'sharedShort',
  });
}
