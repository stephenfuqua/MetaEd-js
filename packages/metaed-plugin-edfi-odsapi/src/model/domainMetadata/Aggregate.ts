import deepFreeze from 'deep-freeze';
import { EntityTable } from './EntityTable';

export type Aggregate = {
  root: string;
  schema: string;
  allowPrimaryKeyUpdates: boolean;
  isExtension: boolean;
  entityTables: Array<EntityTable>;
};

export const NoAggregate: Aggregate = deepFreeze({
  root: '',
  schema: '',
  allowPrimaryKeyUpdates: false,
  isExtension: false,
  entityTables: [],
});
