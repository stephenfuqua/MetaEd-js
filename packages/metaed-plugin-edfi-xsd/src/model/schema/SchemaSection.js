// @flow
import type { Annotation } from './Annotation';
import type { ComplexType } from './ComplexType';
import type { SimpleType } from './SimpleType';
import { newAnnotation } from './Annotation';

export type SchemaSection = {
  sectionAnnotation: Annotation,
  complexTypes: Array<ComplexType>,
  simpleTypes: Array<SimpleType>,
}

export function newSchemaSection(): SchemaSection {
  return {
    sectionAnnotation: newAnnotation(),
    complexTypes: [],
    simpleTypes: [],
  };
}
