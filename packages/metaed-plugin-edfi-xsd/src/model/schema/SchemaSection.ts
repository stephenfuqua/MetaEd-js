import { Annotation } from './Annotation';
import { ComplexType } from './ComplexType';
import { SimpleType } from './SimpleType';
import { newAnnotation } from './Annotation';

export interface SchemaSection {
  sectionAnnotation: Annotation;
  complexTypes: ComplexType[];
  simpleTypes: SimpleType[];
}

export function newSchemaSection(): SchemaSection {
  return {
    sectionAnnotation: newAnnotation(),
    complexTypes: [],
    simpleTypes: [],
  };
}
