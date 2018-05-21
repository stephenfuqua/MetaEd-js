// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import type { EnumerationRow } from './database/EnumerationRow';
import type { SchoolYearEnumerationRow } from './database/SchoolYearEnumerationRow';
import type { Table } from './database/Table';

export type EdFiOdsEntityRepository = {
  table: Map<string, Table>,
  row: Map<string, EnumerationRow | SchoolYearEnumerationRow>,
};

const enhancerName: string = 'EdFiOdsEntityRepositorySetupEnhancer';

export function newEdFiOdsEntityRepository(): EdFiOdsEntityRepository {
  return {
    table: new Map(),
    row: new Map(),
  };
}

export function addEdFiOdsEntityRepositoryTo(metaEd: MetaEdEnvironment) {
  const namespaces: Map<Namespace, EdFiOdsEntityRepository> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespaces.set(namespace, newEdFiOdsEntityRepository());
  });

  const edfiOdsPlugin = metaEd.plugin.get('edfiOds');
  if (edfiOdsPlugin == null) {
    metaEd.plugin.set('edfiOds', { ...newPluginEnvironment(), namespace: namespaces });
  } else {
    edfiOdsPlugin.namespace = namespaces;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiOdsEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
