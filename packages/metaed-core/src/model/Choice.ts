import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { ModelBase } from './ModelBase';

/**
 *
 */
export type ChoiceSourceMap = TopLevelEntitySourceMap;

/**
 *
 */
export function newChoiceSourceMap(): ChoiceSourceMap {
  return newTopLevelEntitySourceMap();
}

export interface Choice extends TopLevelEntity {
  sourceMap: ChoiceSourceMap;
}

/**
 *
 */
export function newChoice(): Choice {
  return {
    ...newTopLevelEntity(),
    type: 'choice',
    typeHumanizedName: 'Choice',
    sourceMap: newChoiceSourceMap(),
  };
}

/**
 *
 */
export const asChoice = (x: ModelBase): Choice => x as Choice;
