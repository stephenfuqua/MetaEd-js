// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class CommonExtensionSourceMap extends TopLevelEntitySourceMap {}

export class CommonExtension extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | CommonExtensionSourceMap;
}

export function commonExtensionFactory(): CommonExtension {
  return Object.assign(new CommonExtension(), defaultTopLevelEntity(), {
    type: 'commonExtension',
    typeHumanizedName: 'Common Extension',
    sourceMap: new CommonExtensionSourceMap(),
  });
}

export const asCommonExtension = (x: ModelBase): CommonExtension => ((x: any): CommonExtension);
