import { ApiFullName } from './ApiFullName';

export type AggregateExtensionDefinition = {
  aggregateRootEntityName: ApiFullName;
  extensionEntityNames: Array<ApiFullName>;
};
