// @flow
import type { EntityRepository } from './model/EntityRepository';
import type { PropertyIndex } from './model/property/PropertyRepository';
import { newEntityRepository } from './model/EntityRepository';
import { newPropertyIndex } from './model/property/PropertyRepository';

export type PluginEnvironment = {
  // the plugin-specific entity repository
  entity: any,
};

export const newPluginEnvironment: () => PluginEnvironment = () => ({
  entity: {},
});

export type SemVer = string;

// provided to validators and enhancers
export type MetaEdEnvironment = {
  // the entity repository
  entity: EntityRepository,

  // the property index, provided for convenience (a little hesitant here, as it should be dependent on entityRepository)
  propertyIndex: PropertyIndex,

  // plugin environment by plugin name
  plugin: Map<string, PluginEnvironment>,

  metaEdVersion: SemVer,

  dataStandardVersion: SemVer,
};

export const newMetaEdEnvironment: () => MetaEdEnvironment = () => ({
  entity: newEntityRepository(),
  propertyIndex: newPropertyIndex(),
  plugin: new Map(),
  metaEdVersion: '',
  dataStandardVersion: '',
});
