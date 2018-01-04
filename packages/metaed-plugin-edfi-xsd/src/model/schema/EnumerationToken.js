// @flow
import type { Annotation } from './Annotation';
import { newAnnotation } from './Annotation';

export type EnumerationToken = {
  value: string,
  annotation: Annotation,
};

export function newEnumerationToken(): EnumerationToken {
  return {
    value: '',
    annotation: newAnnotation(),
  };
}
