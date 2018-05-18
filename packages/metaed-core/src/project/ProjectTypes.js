// @flow
import type { SemVer } from '../MetaEdEnvironment';
import { lowercaseAndNumericOnly } from '../Utility';

export type MetaEdProject = {
  namespace: string,
  projectName: string,
  projectVersion: SemVer,
  projectExtension?: string,
};

export type MetaEdProjectPathPairs = {
  path: string,
  project: MetaEdProject,
};

export const newMetaEdProject: () => MetaEdProject = () => ({
  namespace: '',
  projectName: '',
  projectVersion: '0.0.0',
  projectExtension: '',
});

export const deriveNamespaceFromProjectName = (projectName: string): ?string => lowercaseAndNumericOnly(projectName);

export const isDataStandard = (project: MetaEdProject): boolean => project.namespace === 'edfi';

export function findDataStandardVersions(projects: Array<MetaEdProject>): Array<SemVer> {
  return projects.filter(project => isDataStandard(project)).map(project => project.projectVersion);
}
