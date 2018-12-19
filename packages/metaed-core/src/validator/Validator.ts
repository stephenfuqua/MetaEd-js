import { MetaEdEnvironment } from '../MetaEdEnvironment';
import { ValidationFailure } from './ValidationFailure';

/**
 *
 */
export type Validator = (metaEd: MetaEdEnvironment) => Array<ValidationFailure>;
