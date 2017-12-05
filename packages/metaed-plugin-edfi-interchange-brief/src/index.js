// @flow
import type { MetaEdPlugin } from 'metaed-core';
import { enhance as MergedInterchangeEntitiesEnhance } from './enhancer/MergedInterchangeEntitiesEnhancer';
import { enhance as MergedInterchangeExtendedReferencesEnhance } from './enhancer/MergedInterchangeExtendedReferencesEnhancer';
import { generate as InterchangeBriefSvgGenerator } from './generator/InterchangeBriefSvgGenerator';
import { generate as InterchangeBriefGenerator } from './generator/InterchangeBriefAsMarkdownGenerator';

export function initialize(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: [MergedInterchangeEntitiesEnhance, MergedInterchangeExtendedReferencesEnhance],
    generator: [InterchangeBriefSvgGenerator, InterchangeBriefGenerator],
  };
}
