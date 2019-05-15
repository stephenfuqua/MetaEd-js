import { GeneratedOutput } from './GeneratedOutput';

/**
 * GeneratorResult is the object returned by a Generator.
 *
 * **generatorName** is the name of the Generator and should be the same as the Generator filename.
 *
 * **generatedOutput** is an array of GeneratedOutput objects, one per generated artifact.
 */
export interface GeneratorResult {
  generatorName: string;
  generatedOutput: GeneratedOutput[];
}
