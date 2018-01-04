// @flow
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { ValidationFailure } from './ValidationFailure';

export type Validator = MetaEdEnvironment => Array<ValidationFailure>;
