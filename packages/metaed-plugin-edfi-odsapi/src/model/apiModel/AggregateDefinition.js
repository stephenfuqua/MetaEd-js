// @flow
import type { ApiFullName } from './ApiFullName';

export type AggregateDefinition = {
  aggregateRootEntityName: ApiFullName,
  aggregateEntityNames: Array<ApiFullName>,
};
