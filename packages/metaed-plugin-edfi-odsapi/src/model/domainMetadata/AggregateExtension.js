// @flow
import type { EntityTable } from './EntityTable';

export type AggregateExtension = {
  root: string,
  repositoryId: string,
  namespace: string,
  entityTables: Array<EntityTable>,
};

export function compareTo(ag1: AggregateExtension, ag2: AggregateExtension): number {
  if (ag1.root === ag2.root) return 0;
  return ag1.root > ag2.root ? 1 : -1;
}
