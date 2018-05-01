// @flow
import type { State } from '../State';
import type { Namespace } from '../model/Namespace';
import type { MetaEdProject } from '../project/ProjectTypes';

// derives Namespace's projectName from its namespaceName
export function addProjectNameToNamespace(state: State): void {
  const projects: Array<MetaEdProject> = state.metaEdConfiguration.projects;
  const namespaces: Array<Namespace> = Array.from(state.metaEd.entity.namespace.values());

  namespaces.forEach((namespace: Namespace) => {
    const matchingProject: ?MetaEdProject = projects.find((p: MetaEdProject) => p.namespaceName === namespace.namespaceName);
    if (matchingProject) namespace.projectName = matchingProject.projectName;
  });
}
