// @flow
import type { Validator } from '../validator/Validator';
import type { Enhancer } from '../enhancer/Enhancer';
import type { Generator } from '../generator/Generator';

export type MetaEdPlugin = {
  validator: Array<Validator>,
  enhancer: Array<Enhancer>,
  generator: Array<Generator>,
}

export function newMetaEdPlugin(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: [],
    generator: [],
  };
}

export const NoMetaEdPlugin = newMetaEdPlugin();

export type PluginManifest = {
  npmName: string,
  version: string,
  mainModule: string,
  displayName: string,
  author: string,
  metaEdVersionRange: string,
  dependencies: Array<string>,
  dataReference: string,
  enabled: boolean,
  metaEdPlugin: MetaEdPlugin,
}
