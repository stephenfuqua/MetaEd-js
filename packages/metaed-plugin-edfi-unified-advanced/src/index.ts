import { MetaEdPlugin, newMetaEdPlugin } from 'metaed-core';

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: [],
    enhancer: [],
  });
}
