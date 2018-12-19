import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { ModelBase } from './ModelBase';

export interface CommonSourceMap extends TopLevelEntitySourceMap {
  inlineInOds: SourceMap;
}

/**
 *
 */
export function newCommonSourceMap(): CommonSourceMap {
  return {
    ...newTopLevelEntitySourceMap(),
    inlineInOds: NoSourceMap,
  };
}

export interface Common extends TopLevelEntity {
  sourceMap: CommonSourceMap;
  inlineInOds: boolean;
}

/**
 *
 */
export function newCommon(): Common {
  return {
    ...newTopLevelEntity(),
    type: 'common',
    typeHumanizedName: 'Common',
    // belongs in artifact-specific once 'Inline Common' is replaced by heuristic
    inlineInOds: false,
    sourceMap: newCommonSourceMap(),
  };
}

/**
 *
 */
export function newInlineCommon(): Common {
  return {
    ...newCommon(),
    typeHumanizedName: 'Inline Common',
    // belongs in artifact-specific once 'Inline Common' is replaced by heuristic
    inlineInOds: true,
  };
}

/**
 *
 */
export const asCommon = (x: ModelBase): Common => x as Common;

/**
 *
 */
export const asInlineCommon = (x: ModelBase): Common => x as Common;
