import { MetaEdPlugin, newMetaEdPlugin } from 'metaed-core';

import { validate as sourcePropertyAndTargetPropertyMustMatch } from './validator/MergeDirective/SourcePropertyAndTargetPropertyMustMatch';
import { validate as sourcePropertyPathStringsMustExist } from './validator/MergeDirective/SourcePropertyPathMustExist';
import { validate as targetPropertyPathStringsMustExist } from './validator/MergeDirective/TargetPropertyPathMustExist';

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: [
      sourcePropertyPathStringsMustExist,
      targetPropertyPathStringsMustExist,
      sourcePropertyAndTargetPropertyMustMatch,
    ],
    enhancer: [],
  });
}
