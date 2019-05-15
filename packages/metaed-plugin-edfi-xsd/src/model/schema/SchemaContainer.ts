import { Annotation } from './Annotation';
import { SchemaSection } from './SchemaSection';
import { newAnnotation } from './Annotation';

export interface SchemaContainer {
  isExtension: boolean;
  schemaAnnotation: Annotation;
  sections: SchemaSection[];
  schemaVersion: string;
}

export function newSchemaContainer(): SchemaContainer {
  return {
    isExtension: false,
    schemaAnnotation: newAnnotation(),
    sections: [],
    schemaVersion: '',
  };
}
