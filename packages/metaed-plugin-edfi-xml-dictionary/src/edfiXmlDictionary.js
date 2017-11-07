// @flow
import type { Validator, MetaEdPlugin } from '../../metaed-core/index';
import { generate as XmlDataDictionaryGenerator } from './generator/XmlDataDictionaryGenerator';

function validatorList(): Array<Validator> {
  return [];
}

export default function initialize(): MetaEdPlugin {
  return {
    validator: validatorList(),
    enhancer: [],
    generator: [XmlDataDictionaryGenerator],
  };
}
