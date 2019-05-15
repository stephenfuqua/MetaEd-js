import deepFreeze from 'deep-freeze';
import { EntityTable } from './EntityTable';

export interface Aggregate {
  root: string;
  schema: string;
  allowPrimaryKeyUpdates: boolean;
  isExtension: boolean;
  entityTables: EntityTable[];
}

export const NoAggregate: Aggregate = deepFreeze({
  root: '',
  schema: '',
  allowPrimaryKeyUpdates: false,
  isExtension: false,
  entityTables: [],
});
