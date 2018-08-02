// @flow
import type { MetaEdPlugin } from './MetaEdPlugin';

export type PluginManifest = {
  npmName: string,
  description: string,
  version: string,
  mainModule: string,
  shortName: string,
  authorName: string,
  metaEdVersion: string,
  technologyVersion: string,
  dependencies: Array<string>,
  metaEdPlugin: MetaEdPlugin,
  enabled: boolean,
};
