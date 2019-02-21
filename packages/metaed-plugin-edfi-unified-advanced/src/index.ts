import { MetaEdPlugin, newMetaEdPlugin } from 'metaed-core';

import { validate as sourcePropertyAndTargetPropertyMustMatch } from './validator/MergeDirective/SourcePropertyAndTargetPropertyMustMatch';
import { validate as sourcePropertyPathMustExist } from './validator/MergeDirective/SourcePropertyPathMustExist';
import { validate as targetPropertyPathMustExist } from './validator/MergeDirective/TargetPropertyPathMustExist';

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: [sourcePropertyPathMustExist, targetPropertyPathMustExist, sourcePropertyAndTargetPropertyMustMatch],
    enhancer: [],
  });
}
