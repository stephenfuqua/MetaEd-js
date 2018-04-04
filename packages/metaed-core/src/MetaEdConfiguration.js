// @flow
import type { MetaEdProject } from './project/ProjectTypes';
import type { SemVer } from './MetaEdEnvironment';

export type PluginConfiguration = {
  targetTechnologyVersion: SemVer,
};

export type MetaEdConfiguration = {
  artifactDirectory: string,
  deployDirectory: string,
  pluginConfig: {
    [shortName: string]: PluginConfiguration,
  },
  projects: Array<MetaEdProject>,
  // projectPaths is meant to parallel projects
  projectPaths: Array<string>,
};

export const newPluginConfiguration: () => PluginConfiguration = () => ({
  targetTechnologyVersion: '0.0.0',
});

export const newMetaEdConfiguration: () => MetaEdConfiguration = () => ({
  artifactDirectory: '',
  deployDirectory: '',
  pluginConfig: {},
  projects: [],
  projectPaths: [],
});
