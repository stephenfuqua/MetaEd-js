import { MetaEdProject } from './project/ProjectTypes';
import { SemVer } from './MetaEdEnvironment';

/**
 *
 */
export type PluginTargetTechnologyVersion = {
  targetTechnologyVersion: SemVer;
};

/**
 *
 */
export type MetaEdConfiguration = {
  artifactDirectory: string;
  deployDirectory: string;
  pluginTechVersion: {
    [shortName: string]: PluginTargetTechnologyVersion;
  };
  defaultPluginTechVersion: string;
  projects: Array<MetaEdProject>;
  // projectPaths is meant to parallel projects
  projectPaths: Array<string>;

  // pluginConfigDirectories is an override for the directories to look for plugin configuration files
  pluginConfigDirectories: Array<string>;
};

/**
 *
 */
export const newPluginTargetTechnologyVersion: () => PluginTargetTechnologyVersion = () => ({
  targetTechnologyVersion: '0.0.0',
});

/**
 *
 */
export const newMetaEdConfiguration: () => MetaEdConfiguration = () => ({
  artifactDirectory: '',
  deployDirectory: '',
  pluginTechVersion: {},
  projects: [],
  projectPaths: [],
  pluginConfigDirectories: [],
  defaultPluginTechVersion: '2.0.0',
});
