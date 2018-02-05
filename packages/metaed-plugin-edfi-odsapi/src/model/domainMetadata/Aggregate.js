// @flow
import type { EntityTable } from './EntityTable';

export type Aggregate = {
  root: string,
  allowPrimaryKeyUpdates: boolean,
  isExtension: boolean,
  entityTables: Array<EntityTable>,
};

export const NoAggregate: Aggregate = {
  root: '',
  allowPrimaryKeyUpdates: false,
  isExtension: false,
  entityTables: [],
};
