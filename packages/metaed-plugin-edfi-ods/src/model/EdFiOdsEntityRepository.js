// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
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
  if (metaEd.plugin.has('edfiOds')) {
    Object.assign((metaEd.plugin.get('edfiOds'): any), {
      entity: newEdFiOdsEntityRepository(),
    });
  } else {
    metaEd.plugin.set(
      'edfiOds',
      Object.assign(newPluginEnvironment(), {
        entity: newEdFiOdsEntityRepository(),
      }),
    );
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiOdsEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
