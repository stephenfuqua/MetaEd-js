// @flow
import type { MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';

import { validate as NamespaceMustNotBeNamedChanges } from './validator/NamespaceMustNotBeNamedChanges';

import { generate as CreateTrackedDeleteTablesGenerator } from './generator/CreateTrackedDeleteTablesGenerator';
import { generate as CreateDeletedForTrackingTriggersGenerator } from './generator/CreateDeletedForTrackingTriggersGenerator';
import { generate as EnableDatabaseChangeTrackingGenerator } from './generator/EnableDatabaseChangeTrackingGenerator';
import { generate as EnableTableChangeTrackingGenerator } from './generator/EnableTableChangeTrackingGenerator';

import { enhance as edFiOdsChangeEventEntityRepository } from './model/EdFiOdsChangeEventEntityRepository';

import { enhance as associationChangeEventEnhancer } from './enhancer/AssociationChangeEventEnhancer';
import { enhance as associationSubclassChangeEventEnhancer } from './enhancer/AssociationSubclassChangeEventEnhancer';
import { enhance as baseDescriptorChangeEventEnhancer } from './enhancer/BaseDescriptorChangeEventEnhancer';
import { enhance as descriptorChangeEventEnhancer } from './enhancer/DescriptorChangeEventEnhancer';
import { enhance as domainEntityChangeEventEnhancer } from './enhancer/DomainEntityChangeEventEnhancer';
import { enhance as domainEntitySubclassChangeEventEnhancer } from './enhancer/DomainEntitySubclassChangeEventEnhancer';
import { enhance as enumerationChangeEventEnhancer } from './enhancer/EnumerationChangeEventEnhancer';
import { enhance as schoolYearEnumerationChangeEventEnhancer } from './enhancer/SchoolYearEnumerationChangeEventEnhancer';

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
      schoolYearEnumerationChangeEventEnhancer,
    ],
    generator: [
      CreateTrackedDeleteTablesGenerator,
      CreateDeletedForTrackingTriggersGenerator,
      EnableDatabaseChangeTrackingGenerator,
      EnableTableChangeTrackingGenerator,
    ],
  });
}
