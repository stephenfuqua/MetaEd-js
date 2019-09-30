import { MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';

import { enhance as recordOwnershipTableSetupEnhancer } from './model/Table';

import { enhance as addOwnershipTokenColumnTableEnhancer } from './enhancer/AddOwnershipTokenColumnTableEnhancer';

export function initialize(): MetaEdPlugin {
  return {
    ...newMetaEdPlugin(),
    enhancer: [recordOwnershipTableSetupEnhancer, addOwnershipTokenColumnTableEnhancer],
  };
}
