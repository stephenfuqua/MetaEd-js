import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';

/**
 *
 */
export type CommonSubclassSourceMap = TopLevelEntitySourceMap;

/**
 *
 */
export function newCommonSubclassSourceMap(): CommonSubclassSourceMap {
  return newTopLevelEntitySourceMap();
}

export interface CommonSubclass extends TopLevelEntity {
  sourceMap: CommonSubclassSourceMap;
}

/**
 *
 */
export function newCommonSubclass(): CommonSubclass {
  return {
    ...newTopLevelEntity(),
    type: 'commonSubclass',
    typeHumanizedName: 'Common Subclass',
    sourceMap: newCommonSubclassSourceMap(),
  };
}
