// @flow
import { Interchange, newInterchange } from '../../../../packages/metaed-core/index';
import type { InterchangeItem } from '../../../../packages/metaed-core/index';

export class MergedInterchange extends Interchange {
  repositoryId: string;
  interchangeName: string;
  schemaLocation: string;
  orderedElements: Array<InterchangeItem>;
}

// warning: limitation of extending base model objects in an extension plugin is that the type field is restricted
// to base types - so it will have type as 'interchange'
export function newMergedInterchange(): MergedInterchange {
  return Object.assign(new MergedInterchange(), newInterchange(), {
    typeHumanizedName: 'Merged Interchange',
    repositoryId: '',
    interchangeName: '',
    schemaLocation: '',
    orderedElements: [],
  });
}
