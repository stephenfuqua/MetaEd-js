// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { HandbookEntry } from './HandbookEntry';

export type EdfiHandbookRepository = {
  handbookEntries: Array<HandbookEntry>,
};
const enhancerName: string = 'EdfiHandbookRepositorySetupEnhancer';

export function newEdfiHandbookRepository(): EdfiHandbookRepository {
  return {
    handbookEntries: [],
  };
}

export function addEdfiHandbookRepositoryTo(metaEd: MetaEdEnvironment) {
  const namespaces: Map<Namespace, EdfiHandbookRepository> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespaces.set(namespace, newEdfiHandbookRepository());
  });

  const edfiHandbookPlugin = metaEd.plugin.get('edfiHandbook');
  if (edfiHandbookPlugin == null) {
    metaEd.plugin.set('edfiHandbook', { ...newPluginEnvironment(), namespace: namespaces });
  } else {
    edfiHandbookPlugin.namespace = namespaces;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdfiHandbookRepositoryTo(metaEd);
  return {
    enhancerName,
    success: true,
  };
}
