import deepFreeze from 'deep-freeze';
import { Validator } from '../validator/Validator';
import { Enhancer } from '../enhancer/Enhancer';
import { Generator } from '../generator/Generator';
import { ConfigurationSchema } from './ConfigurationSchema';

/**
 *
 */
export interface MetaEdPlugin {
  validator: Validator[];
  enhancer: Enhancer[];
  generator: Generator[];
  configurationSchemas: ConfigurationSchema;
}

/**
 *
 */
export function newMetaEdPlugin(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: [],
    generator: [],
    configurationSchemas: new Map(),
  };
}

/**
 *
 */
export const NoMetaEdPlugin = deepFreeze(newMetaEdPlugin());
