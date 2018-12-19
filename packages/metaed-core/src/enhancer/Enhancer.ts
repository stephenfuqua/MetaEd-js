import { EnhancerResult } from './EnhancerResult';
import { MetaEdEnvironment } from '../MetaEdEnvironment';

/**
 * Enhancer is a function that makes a discrete addition or modification to entities or properties.  They are named
 * after the behavior they perform.  They must never modify data that is outside the plugin they belong to.
 * They take a MetaEdEnvironment and return an EnhancerResult.
 */
export type Enhancer = (metaEd: MetaEdEnvironment) => EnhancerResult;
