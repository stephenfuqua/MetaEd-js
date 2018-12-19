import { SourceMap } from '../model/SourceMap';
import { FileMap } from '../file/FileIndex';

export type ValidationFailureCategory = 'error' | 'warning' | 'info';
/**
 *
 */
export type ValidationFailure = {
  validatorName: string;
  category: ValidationFailureCategory;
  message: string;
  sourceMap: SourceMap | null;
  fileMap: FileMap | null;
};
