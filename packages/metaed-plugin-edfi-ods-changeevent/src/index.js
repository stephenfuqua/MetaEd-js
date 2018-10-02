// @flow
import type { MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';

import { validate as NamespaceMustNotBeNamedChanges } from './validator/NamespaceMustNotBeNamedChanges';

import { generate as CreateTrackedDeleteTablesGenerator } from './generator/CreateTrackedDeleteTablesGenerator';
import { generate as CreateDeletedForTrackingTriggersGenerator } from './generator/CreateDeletedForTrackingTriggersGenerator';
import { generate as CreateChangeVersionSequenceGenerator } from './generator/CreateChangeVersionSequenceGenerator';
import { generate as CreateTriggerUpdateChangeVersionGenerator } from './generator/CreateTriggerUpdateChangeVersionGenerator';
import { generate as AddColumnChangeVersionForTableGenerator } from './generator/AddColumnChangeVersionForTableGenerator';

import { enhance as edFiOdsChangeEventEntityRepository } from './model/EdFiOdsChangeEventEntityRepository';

import { enhance as associationChangeEventEnhancer } from './enhancer/AssociationChangeEventEnhancer';
import { enhance as associationSubclassChangeEventEnhancer } from './enhancer/AssociationSubclassChangeEventEnhancer';
import { enhance as baseDescriptorChangeEventEnhancer } from './enhancer/BaseDescriptorChangeEventEnhancer';
import { enhance as descriptorChangeEventEnhancer } from './enhancer/DescriptorChangeEventEnhancer';
import { enhance as domainEntityChangeEventEnhancer } from './enhancer/DomainEntityChangeEventEnhancer';
import { enhance as domainEntitySubclassChangeEventEnhancer } from './enhancer/DomainEntitySubclassChangeEventEnhancer';
import { enhance as enumerationChangeEventEnhancer } from './enhancer/EnumerationChangeEventEnhancer';
import { enhance as addColumnChangeVersionForTableEnhancer } from './enhancer/AddColumnChangeVersionForTableEnhancer';
import { enhance as createTriggerUpdateChangeVersionEnhancer } from './enhancer/CreateTriggerUpdateChangeVersionEnhancer';

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: [NamespaceMustNotBeNamedChanges],
    enhancer: [
      edFiOdsChangeEventEntityRepository,
      associationChangeEventEnhancer,
      associationSubclassChangeEventEnhancer,
      baseDescriptorChangeEventEnhancer,
      descriptorChangeEventEnhancer,
      domainEntityChangeEventEnhancer,
      domainEntitySubclassChangeEventEnhancer,
      enumerationChangeEventEnhancer,
      addColumnChangeVersionForTableEnhancer,
      createTriggerUpdateChangeVersionEnhancer,
    ],
    generator: [
      CreateTrackedDeleteTablesGenerator,
      CreateDeletedForTrackingTriggersGenerator,
      CreateChangeVersionSequenceGenerator,
      CreateTriggerUpdateChangeVersionGenerator,
      AddColumnChangeVersionForTableGenerator,
    ],
  });
}
