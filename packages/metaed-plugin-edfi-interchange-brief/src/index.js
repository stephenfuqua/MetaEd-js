// @flow
import type { MetaEdPlugin } from 'metaed-core';
import { generate as InterchangeBriefSvgGenerator } from './generator/InterchangeBriefSvgGenerator';
import { generate as InterchangeBriefGenerator } from './generator/InterchangeBriefAsMarkdownGenerator';

export function initialize(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: [],
    generator: [InterchangeBriefSvgGenerator, InterchangeBriefGenerator],
  };
}
