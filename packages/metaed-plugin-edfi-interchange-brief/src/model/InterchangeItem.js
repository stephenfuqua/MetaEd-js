// @flow
import { InterchangeItem as InterchangeItemBase, newInterchangeItem as newInterchangeItemBase } from 'metaed-core';

export class InterchangeItem extends InterchangeItemBase {
  interchangeBriefDescription: string;
}
export function newInterchangeItem(): InterchangeItem {
  return ((Object.assign(new InterchangeItem(), newInterchangeItemBase(), {
    interchangeBriefDescription: '',
  }): any): InterchangeItem);
}
