import { MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';

import { generate as addCreatedByOwnershipColumnForTableGenerator } from './generator/AddCreatedByOwnershipColumnForTableGenerator';

export function initialize(): MetaEdPlugin {
  return {
    ...newMetaEdPlugin(),
    generator: [addCreatedByOwnershipColumnForTableGenerator],
  };
}
