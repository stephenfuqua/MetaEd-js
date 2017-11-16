// @flow
import type { MetaEdPlugin } from '../../metaed-core/index';
import { generate as xmlDataDictionaryGenerator } from './generator/XmlDataDictionaryGenerator';

export function initialize(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: [],
    generator: [xmlDataDictionaryGenerator],
  };
}
