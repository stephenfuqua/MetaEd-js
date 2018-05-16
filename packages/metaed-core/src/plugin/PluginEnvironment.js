// @flow
import type { SemVer } from '../MetaEdEnvironment';

export type PluginEnvironment = {
  // the plugin-specific namespace partition to the plugin's entity repository
  namespace: Map<Namespace, any>,

  // the plugin's target technology version
  targetTechnologyVersion: SemVer,
};

export const newPluginEnvironment: () => PluginEnvironment = () => ({
  namespace: new Map(),
  targetTechnologyVersion: '0.0.0',
});
