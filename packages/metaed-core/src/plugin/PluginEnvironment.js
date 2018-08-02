// @flow
import type { SemVer } from '../MetaEdEnvironment';
import type { Namespace } from '../model/Namespace';

export type PluginEnvironment = {
  shortName: string,

  // the plugin-specific namespace partition to the plugin's entity repository
  namespace: Map<Namespace, any>,

  // the plugin's target technology version
  targetTechnologyVersion: SemVer,

  // plugin-wide configuration data
  config: any,
};

export const newPluginEnvironment: () => PluginEnvironment = () => ({
  shortName: '',
  namespace: new Map(),
  targetTechnologyVersion: '0.0.0',
  config: {},
});
