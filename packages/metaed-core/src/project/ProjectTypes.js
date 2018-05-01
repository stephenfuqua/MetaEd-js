// @flow
import type { SemVer } from '../MetaEdEnvironment';

export type MetaEdProject = {
  namespaceName: string,
  projectName: string,
  projectVersion: SemVer,
  projectExtension?: string,
};

export type MetaEdProjectPathPairs = {
  path: string,
  project: MetaEdProject,
};

export const newMetaEdProject: () => MetaEdProject = () => ({
  namespaceName: '',
  projectName: '',
  projectVersion: '0.0.0',
  projectExtension: '',
});

export const isDataStandard = (project: MetaEdProject): boolean => project.namespaceName === 'edfi';

export function findDataStandardVersions(projects: Array<MetaEdProject>): Array<SemVer> {
  return projects.filter(project => isDataStandard(project)).map(project => project.projectVersion);
}
