// @flow
import type { SemVer } from '../MetaEdEnvironment';

export type PluginEnvironment = {
  // the plugin-specific entity repository
  entity: any,

  // the plugin's target technology version
  targetTechnologyVersion: SemVer,
};

export const newPluginEnvironment: () => PluginEnvironment = () => ({
  entity: {},
  targetTechnologyVersion: '0.0.0',
});
