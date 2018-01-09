// @flow
import { newEntityRepository } from './model/EntityRepository';
import { newPropertyIndex } from './model/property/PropertyRepository';
import type { EntityRepository } from './model/EntityRepository';
import type { PluginEnvironment } from './plugin/PluginEnvironment';
import type { PropertyIndex } from './model/property/PropertyRepository';

export type SemVer = string;

// provided to validators and enhancers
export type MetaEdEnvironment = {
  // the entity repository
  entity: EntityRepository,

  // the property index, provided for convenience (a little hesitant here, as it should be dependent on entityRepository)
  propertyIndex: PropertyIndex,

  // plugin environment by plugin name
  plugin: Map<string, PluginEnvironment>,

  // the current MetaEd Version
  metaEdVersion: SemVer,

  // the data standard version to target
  dataStandardVersion: SemVer,
};

export const newMetaEdEnvironment: () => MetaEdEnvironment = () => ({
  entity: newEntityRepository(),
  propertyIndex: newPropertyIndex(),
  plugin: new Map(),
  metaEdVersion: '0.0.0',
  dataStandardVersion: '0.0.0',
});
