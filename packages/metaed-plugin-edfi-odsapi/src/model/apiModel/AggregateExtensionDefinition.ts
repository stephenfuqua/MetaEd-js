import { ApiFullName } from './ApiFullName';

export interface AggregateExtensionDefinition {
  aggregateRootEntityName: ApiFullName;
  extensionEntityNames: ApiFullName[];
}
