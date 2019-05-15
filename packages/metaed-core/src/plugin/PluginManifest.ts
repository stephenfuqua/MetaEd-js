import { MetaEdPlugin } from './MetaEdPlugin';

export interface PluginManifest {
  npmName: string;
  description: string;
  version: string;
  mainModule: string;
  shortName: string;
  authorName: string;
  metaEdVersion: string;
  technologyVersion: string;
  dependencies: string[];
  metaEdPlugin: MetaEdPlugin;
  enabled: boolean;
}
