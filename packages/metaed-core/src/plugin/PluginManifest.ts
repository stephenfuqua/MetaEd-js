import { MetaEdPlugin } from './MetaEdPlugin';
import { SemVerRange } from '../MetaEdEnvironment';

export interface PluginManifest {
  npmName: string;
  description: string;
  version: string;
  mainModule: string;
  shortName: string;
  authorName: string;
  metaEdVersion: SemVerRange;
  technologyVersion: SemVerRange;
  dependencies: string[];
  metaEdPlugin: MetaEdPlugin;
  enabled: boolean;
}
