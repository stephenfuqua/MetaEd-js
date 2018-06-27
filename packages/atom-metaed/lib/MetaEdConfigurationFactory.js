/** @babel */
// @flow
import { newMetaEdConfiguration } from 'metaed-core';
import type { MetaEdConfiguration } from 'metaed-core';

export function metaEdConfigurationFor(defaultPluginTechVersion: string): MetaEdConfiguration {
  return {
    ...newMetaEdConfiguration(),
    defaultPluginTechVersion,
  };
}
