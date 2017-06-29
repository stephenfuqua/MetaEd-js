// @flow
import type { Repository } from '../model/Repository';
import type { PropertyRepository } from '../model/property/PropertyRepository';
import type { ValidationFailure } from './ValidationFailure';

// TODO: this is wrong!!!!!!!!!!!!!!  should be (EntityRepository, PropertyRepository) => Array<ValidationFailure>
export type Validator = (Repository, PropertyRepository) => Array<ValidationFailure>;
