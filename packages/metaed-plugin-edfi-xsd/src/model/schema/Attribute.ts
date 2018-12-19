import { Annotation } from './Annotation';
import { newAnnotation } from './Annotation';

export type Attribute = {
  name: string;
  type: string;
  annotation: Annotation;
  isRequired: boolean;
};

export function newAttribute(): Attribute {
  return {
    name: '',
    type: '',
    annotation: newAnnotation(),
    isRequired: false,
  };
}
