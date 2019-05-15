import { ValidationFailure } from '../validator/ValidationFailure';

/**
 * EnhancerResult is the object returned by an Enhancer.
 *
 * **enhancerName** is the name of the Enhancer and should be the same as the Enhancer filename.
 *
 * **success** is true if the enhancer ran to completion successfully.
 *
 * **validationFailure** is an optional ValidationFailure, if the Enhancer can communicate as a validation
 * failure what would otherwise be a failure of the Enhancer.  Enhancers can be successful yet have a ValidationFailure.
 */
export interface EnhancerResult {
  enhancerName: string;
  success: boolean;
  validationFailure?: ValidationFailure;
}
