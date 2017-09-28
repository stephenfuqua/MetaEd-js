// @flow
import type { Validator, MetaEdPlugin } from '../../metaed-core/index';
import { enhancerList } from './enhancer/EnhancerList';

function validatorList(): Array<Validator> {
  return [];
}

export default function initialize(): MetaEdPlugin {
  return {
    validator: validatorList(),
    enhancer: enhancerList(),
  };
}
