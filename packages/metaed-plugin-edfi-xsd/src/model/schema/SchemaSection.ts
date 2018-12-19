import { Annotation } from './Annotation';
import { ComplexType } from './ComplexType';
import { SimpleType } from './SimpleType';
import { newAnnotation } from './Annotation';

export type SchemaSection = {
  sectionAnnotation: Annotation;
  complexTypes: Array<ComplexType>;
  simpleTypes: Array<SimpleType>;
};

export function newSchemaSection(): SchemaSection {
  return {
    sectionAnnotation: newAnnotation(),
    complexTypes: [],
    simpleTypes: [],
  };
}
