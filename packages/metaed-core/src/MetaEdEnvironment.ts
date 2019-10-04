import { newPropertyIndex } from './model/property/PropertyRepository';
import { Namespace } from './model/Namespace';
import { PluginEnvironment } from './plugin/PluginEnvironment';
import { PropertyIndex } from './model/property/PropertyRepository';

/**
 *
 */
export type SemVer = string;

/**
 * Provided to validators and enhancers
 */
export interface MetaEdEnvironment {
  // namespaces
  namespace: Map<string, Namespace>;

  // the property index, provided for convenience (a little hesitant here, as it should be dependent on entityRepository)
  propertyIndex: PropertyIndex;

  // plugin environment by plugin shortName
  plugin: Map<string, PluginEnvironment>;

  // the current MetaEd Version
  metaEdVersion: SemVer;

  // the data standard version to target
  dataStandardVersion: SemVer;

  // whether we are running in Alliance mode - which means assuming this is an Ed-Fi Alliance user
  allianceMode: boolean;
}

/**
 *
 */
export const newMetaEdEnvironment: () => MetaEdEnvironment = () => ({
  namespace: new Map(),
  propertyIndex: newPropertyIndex(),
  plugin: new Map(),
  metaEdVersion: '0.0.0',
  dataStandardVersion: '0.0.0',
  allianceMode: false,
});
