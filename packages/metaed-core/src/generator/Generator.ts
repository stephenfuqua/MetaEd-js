import { MetaEdEnvironment } from '../MetaEdEnvironment';
import { GeneratorResult } from './GeneratorResult';

/**
 * Generator is an async function that creates artifacts.  They should not contain much logic, but instead take
 * objects shaped by Enhancers and provide them to logic-less text templates or libraries that create binary streams.
 * They take a MetaEdEnvironment and return a Promise of a GeneratorResult.
 */
export type Generator = (metaEd: MetaEdEnvironment) => Promise<GeneratorResult>;
