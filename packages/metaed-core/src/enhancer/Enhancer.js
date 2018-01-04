// @flow
import type { EnhancerResult } from './EnhancerResult';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';

export type Enhancer = MetaEdEnvironment => EnhancerResult;
