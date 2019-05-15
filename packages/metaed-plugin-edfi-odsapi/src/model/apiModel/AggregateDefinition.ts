import { ApiFullName } from './ApiFullName';

export interface AggregateDefinition {
  aggregateRootEntityName: ApiFullName;
  aggregateEntityNames: ApiFullName[];
}
