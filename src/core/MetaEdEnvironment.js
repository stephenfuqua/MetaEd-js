// @flow
import type { EntityRepository } from './model/Repository';
import type { PropertyIndex } from './model/property/PropertyRepository';
import { entityRepositoryFactory } from './model/Repository';
import { propertyIndexFactory } from './model/property/PropertyRepository';

// plugin exports:
//   - specialized model types
//   - maybe specialized model factories (hopefully not)
//   - hopefully no behavior
export type PluginEnvironment = any;

// access to core model types
export type CoreModel = any;

export type SemVer = string;

// provided to validators and enhancers
export type MetaEdEnvironment = {
  // the entity repository
  entity: EntityRepository,

  // the property index, provided for convenience (a little hesitant here, as it should be dependent on entityRepository)
  propertyIndex: PropertyIndex,

  // plugin environment by plugin name
  plugin: Map<string, PluginEnvironment>,

  // access to core model types (and factories??)
  model: CoreModel,

  metaEdVersion: SemVer,

  dataStandardVersion: SemVer,
};

export const metaEdEnvironmentFactory: () => MetaEdEnvironment = () =>
  ({
    entity: entityRepositoryFactory(),
    propertyIndex: propertyIndexFactory(),
    plugin: new Map(),
    model: {},
    metaEdVersion: '',
    dataStandardVersion: '',
  });
