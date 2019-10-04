import { newMetaEdConfiguration } from 'metaed-core';
import { MetaEdConfiguration } from 'metaed-core';

export function metaEdConfigurationFor(defaultPluginTechVersion: string, allianceMode: boolean): MetaEdConfiguration {
  return {
    ...newMetaEdConfiguration(),
    defaultPluginTechVersion,
    allianceMode,
  };
}
