// @flow
import R from 'ramda';
import type { SemVer } from './MetaEdEnvironment';

export type ProjectMetadata = {
  friendlyName: string,
  namespace: string,
  projectExtension: string,
  projectVersion: SemVer,
};

export type PluginConfiguration = {
  targetTechnologyVersion: SemVer,
};

export type MetaEdConfiguration = {
  artifactDirectory: string,
  pluginConfig: {
    [shortName: string]: PluginConfiguration,
  },
  // projectPaths is meant to parallel projectMetadataArray
  projectMetadataArray: Array<ProjectMetadata>,
  projectPaths: Array<string>,
};

export const newPluginConfiguration: () => PluginConfiguration = () => ({
  targetTechnologyVersion: '0.0.0',
});

export const newMetaEdConfiguration: () => MetaEdConfiguration = () => ({
  artifactDirectory: '',
  pluginConfig: {},
  projectMetadataArray: [],
  projectPaths: [],
});

export function findDataStandardVersions(projectMetadataArray: Array<ProjectMetadata>): Array<SemVer> {
  return R.uniq(
    projectMetadataArray
      .filter(projectMetadata => projectMetadata.namespace === 'edfi')
      .map(projectMetadata => projectMetadata.projectVersion),
  );
}
