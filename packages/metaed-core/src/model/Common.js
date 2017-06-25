// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import type { SourceMap } from './SourceMap';
import type { CommonExtension } from './CommonExtension';
import type { ModelBase } from './ModelBase';

export class CommonSourceMap extends TopLevelEntitySourceMap {
  extender: ?SourceMap;
  inlineInOds: ?SourceMap;
}

export class Common extends TopLevelEntity {
  extender: ?CommonExtension;
  inlineInOds: boolean;
  sourceMap: TopLevelEntitySourceMap | CommonSourceMap;
}

export function commonFactory(): Common {
  return Object.assign(new Common(), defaultTopLevelEntity(), {
    type: 'common',
    typeHumanizedName: 'Common',
    extender: null,
    // belongs in artifact-specific once 'Inline Common' is replaced by heuristic
    inlineInOds: false,
    sourceMap: new CommonSourceMap(),
  });
}

export function inlineCommonFactory(): Common {
  return Object.assign(new Common(), defaultTopLevelEntity(), {
    type: 'common',
    typeHumanizedName: 'Inline Common',
    extender: null,
    inlineInOds: true,
    sourceMap: new CommonSourceMap(),
  });
}

export const asCommon = (x: ModelBase): Common => ((x: any): Common);
