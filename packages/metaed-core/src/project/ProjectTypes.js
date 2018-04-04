// @flow
import type { SemVer } from '../MetaEdEnvironment';

export type MetaEdProject = {
  namespace: string,
  projectName: string,
  projectVersion: SemVer,
  projectExtension?: string,
};

export const newMetaEdProject: () => MetaEdProject = () => ({
  namespace: '',
  projectName: '',
  projectVersion: '0.0.0',
  projectExtension: '',
});

export const isDataStandard = (project: MetaEdProject): boolean => project.namespace === 'edfi';

export function findDataStandardVersions(projects: Array<MetaEdProject>): Array<SemVer> {
  return projects.filter(project => isDataStandard(project)).map(project => project.projectVersion);
}
