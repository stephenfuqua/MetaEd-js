// @flow
import type { Validator } from '../validator/Validator';

export type MetaEdPlugin = {
  validators: Array<Validator>,
}

export function newMetaEdPlugin(): MetaEdPlugin {
  return {
    validators: [],
  };
}

export const NoMetaEdPlugin = newMetaEdPlugin();

export type PluginManifest = {
  npmName: string,
  version: string,
  mainModule: string,
  pluginName: string,
  displayName: string,
  author: string,
  metaEdVersion: string,
  dependencies: Array<string>,
  plugin: MetaEdPlugin,
  enabled: boolean,
}

export type PluginData = {
  todo: string
}
