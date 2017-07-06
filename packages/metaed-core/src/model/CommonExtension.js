// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class CommonExtensionSourceMap extends TopLevelEntitySourceMap {}

export class CommonExtension extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | CommonExtensionSourceMap;
}

export function newCommonExtension(): CommonExtension {
  return Object.assign(new CommonExtension(), newTopLevelEntity(), {
    type: 'commonExtension',
    typeHumanizedName: 'Common Extension',
    sourceMap: new CommonExtensionSourceMap(),
  });
}

export const asCommonExtension = (x: ModelBase): CommonExtension => ((x: any): CommonExtension);
