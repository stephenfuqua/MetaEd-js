// @flow
import type { ValidationFailure } from '../validator/ValidationFailure';

export type EnhancerResult = {
  enhancerName: string,
  success: boolean,
  validationFailure?: ValidationFailure,
};
