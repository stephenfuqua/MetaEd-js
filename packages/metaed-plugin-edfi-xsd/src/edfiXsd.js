// @flow
import type { Enhancer, Validator, MetaEdPlugin } from '../../../packages/metaed-core/index';

function validatorList(): Array<Validator> {
  return [];  // TODO: list them
}

function enhancerList(): Array<Enhancer> {
  return [];  // TODO: list them
}

export default function initialize(): MetaEdPlugin {
  return {
    validator: validatorList(),
    enhancer: enhancerList(),
  };
}
