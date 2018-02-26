// @flow
import type { SemVer } from './MetaEdEnvironment';

export type PluginConfiguration = {
  targetTechnologyVersion: SemVer,
};

export type MetaEdConfiguration = {
  title: string,
  namespace: string,
  dataStandardCoreSourceDirectory: string,
  dataStandardExtensionSourceDirectory: string,
  artifactDirectory: string,
  dataStandardCoreSourceVersion: SemVer,
  pluginConfig: {
    [shortName: string]: PluginConfiguration,
  },
};

export const newPluginConfiguration: () => PluginConfiguration = () => ({
  targetTechnologyVersion: '0.0.0',
});

export const newMetaEdConfiguration: () => MetaEdConfiguration = () => ({
  title: '',
  namespace: '',
  dataStandardCoreSourceDirectory: '',
  dataStandardExtensionSourceDirectory: '',
  artifactDirectory: '',
  dataStandardCoreSourceVersion: '0.0.0',
  pluginConfig: {},
});
