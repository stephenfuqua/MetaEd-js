import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { ModelBase } from './ModelBase';

/**
 *
 */
export type CommonExtensionSourceMap = TopLevelEntitySourceMap;

/**
 *
 */
export function newCommonExtensionSourceMap(): CommonExtensionSourceMap {
  return newTopLevelEntitySourceMap();
}

export interface CommonExtension extends TopLevelEntity {
  sourceMap: CommonExtensionSourceMap;
}

/**
 *
 */
export function newCommonExtension(): CommonExtension {
  return {
    ...newTopLevelEntity(),
    type: 'commonExtension',
    typeHumanizedName: 'Common Extension',
    sourceMap: newCommonExtensionSourceMap(),
  };
}

/**
 *
 */
export const asCommonExtension = (x: ModelBase): CommonExtension => x as CommonExtension;
