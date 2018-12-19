import { AggregateDefinition } from './AggregateDefinition';
import { AggregateExtensionDefinition } from './AggregateExtensionDefinition';
import { AssociationDefinition } from './AssociationDefinition';
import { EntityDefinition } from './EntityDefinition';
import { SchemaDefinition } from './SchemaDefinition';

import { NoSchemaDefinition } from './SchemaDefinition';

export type DomainModelDefinition = {
  odsApiVersion: string;
  schemaDefinition: SchemaDefinition;
  aggregateDefinitions: Array<AggregateDefinition>;
  aggregateExtensionDefinitions: Array<AggregateExtensionDefinition>;
  entityDefinitions: Array<EntityDefinition>;
  associationDefinitions: Array<AssociationDefinition>;
};

export function newDomainModelDefinition(): DomainModelDefinition {
  return {
    odsApiVersion: '',
    schemaDefinition: NoSchemaDefinition,
    aggregateDefinitions: [],
    aggregateExtensionDefinitions: [],
    entityDefinitions: [],
    associationDefinitions: [],
  };
}
