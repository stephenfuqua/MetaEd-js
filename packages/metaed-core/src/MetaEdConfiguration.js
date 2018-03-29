// @flow
import type { SemVer } from './MetaEdEnvironment';

export type MetaEdProject = {
  namespace: string,
  projectName: string,
  projectVersion: SemVer,
  projectExtension?: string,
};

export type PluginConfiguration = {
  targetTechnologyVersion: SemVer,
};

export type MetaEdConfiguration = {
  artifactDirectory: string,
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
  pluginConfig: {},
  projects: [],
  projectPaths: [],
});

export function findDataStandardVersions(projects: Array<MetaEdProject>): Array<SemVer> {
  return projects.filter((project: MetaEdProject) => project.namespace === 'edfi').map(project => project.projectVersion);
}
