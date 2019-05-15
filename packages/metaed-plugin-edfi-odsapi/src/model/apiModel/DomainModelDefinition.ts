import { AggregateDefinition } from './AggregateDefinition';
import { AggregateExtensionDefinition } from './AggregateExtensionDefinition';
import { AssociationDefinition } from './AssociationDefinition';
import { EntityDefinition } from './EntityDefinition';
import { SchemaDefinition } from './SchemaDefinition';

import { NoSchemaDefinition } from './SchemaDefinition';

export interface DomainModelDefinition {
  odsApiVersion: string;
  schemaDefinition: SchemaDefinition;
  aggregateDefinitions: AggregateDefinition[];
  aggregateExtensionDefinitions: AggregateExtensionDefinition[];
  entityDefinitions: EntityDefinition[];
  associationDefinitions: AssociationDefinition[];
}

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
