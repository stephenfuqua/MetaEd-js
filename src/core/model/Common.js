// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import type { SourceMap } from './SourceMap';
import type { CommonExtension } from './CommonExtension';

export class CommonSourceMap extends TopLevelEntitySourceMap {
  extender: ?SourceMap;
  inlineInOds: ?SourceMap;
}

export class Common extends TopLevelEntity {
  extender: ?CommonExtension;
  inlineInOds: boolean;
  sourceMap: CommonSourceMap;
}

export function commonFactory(): Common {
  return Object.assign(new Common(), defaultTopLevelEntity(), {
    type: 'common',
    typeGroupHumanizedName: 'common',
    extender: null,
    // belongs in artifact-specific once 'Inline Common' is replaced by heuristic
    inlineInOds: false,
    sourceMap: new CommonSourceMap(),
  });
}

export function inlineCommonFactory(): Common {
  return Object.assign(new Common(), defaultTopLevelEntity(), {
    type: 'common',
    typeGroupHumanizedName: 'common',
    extender: null,
    inlineInOds: true,
    sourceMap: new CommonSourceMap(),
  });
}
