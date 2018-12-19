import { newMetaEdConfiguration } from 'metaed-core';
import { MetaEdConfiguration } from 'metaed-core';

export function metaEdConfigurationFor(defaultPluginTechVersion: string): MetaEdConfiguration {
  return {
    ...newMetaEdConfiguration(),
    defaultPluginTechVersion,
  };
}
