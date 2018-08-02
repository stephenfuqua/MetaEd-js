// @flow
import deepFreeze from 'deep-freeze';
import type { Validator } from '../validator/Validator';
import type { Enhancer } from '../enhancer/Enhancer';
import type { Generator } from '../generator/Generator';
import type { ConfigurationSchema } from './ConfigurationSchema';

export type MetaEdPlugin = {
  validator: Array<Validator>,
  enhancer: Array<Enhancer>,
  generator: Array<Generator>,
  configurationSchemas: ConfigurationSchema,
};

export function newMetaEdPlugin(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: [],
    generator: [],
    configurationSchemas: new Map(),
  };
}

export const NoMetaEdPlugin = deepFreeze(newMetaEdPlugin());
