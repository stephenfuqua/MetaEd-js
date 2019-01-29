import { SemVer } from '../MetaEdEnvironment';
import { lowercaseAndNumericOnly } from '../Utility';

export type MetaEdProject = {
  namespaceName: string;
  projectName: string;
  projectVersion: SemVer;
  projectExtension?: string;
};

export type MetaEdProjectPathPairs = {
  path: string;
  project: MetaEdProject;
};

export const newMetaEdProject: () => MetaEdProject = () => ({
  namespaceName: '',
  projectName: '',
  projectVersion: '0.0.0',
  projectExtension: '',
});

export const deriveNamespaceFromProjectName = (projectName: string): string | null => lowercaseAndNumericOnly(projectName);

export const isDataStandard = (project: MetaEdProject): boolean => project.namespaceName === 'EdFi';

export function findDataStandardVersions(projects: Array<MetaEdProject>): Array<SemVer> {
  return projects.filter(project => isDataStandard(project)).map(project => project.projectVersion);
}
