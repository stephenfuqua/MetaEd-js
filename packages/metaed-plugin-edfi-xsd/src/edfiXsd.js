// @flow
import type { MetaEdPlugin } from 'metaed-core';
import { enhancerList } from './enhancer/EnhancerList';
import { generate as generateXsd } from './generator/XsdGenerator';
import { generate as generateSchemaAnnotation } from './generator/SchemaAnnotationGenerator';

export function initialize(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: enhancerList(),
    generator: [generateXsd, generateSchemaAnnotation],
  };
}
