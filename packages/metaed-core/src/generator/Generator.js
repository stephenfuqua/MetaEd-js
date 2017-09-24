// @flow
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { GeneratorResult } from './GeneratorResult';

export type Generator = (MetaEdEnvironment) => GeneratorResult;
