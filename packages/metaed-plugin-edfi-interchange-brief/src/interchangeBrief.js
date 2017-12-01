// @flow
import type { Validator, MetaEdPlugin } from 'metaed-core';
import { generate as InterchangeBriefSvgGenerator } from './generator/InterchangeBriefSvgGenerator';
import { generate as InterchangeBriefGenerator } from './generator/InterchangeBriefAsMarkdownGenerator';

function validatorList(): Array<Validator> {
  return [];
}

export default function initialize(): MetaEdPlugin {
  return {
    validator: validatorList(),
    enhancer: [],
    generator: [InterchangeBriefSvgGenerator, InterchangeBriefGenerator],
  };
}
