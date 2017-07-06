// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, newReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class CommonPropertySourceMap extends ReferentialPropertySourceMap {
  isExtensionOverride: ?SourceMap;
}

export class CommonProperty extends ReferentialProperty {
  isExtensionOverride: boolean;
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | CommonPropertySourceMap;
}

export function newCommonProperty(): CommonProperty {
  return Object.assign(new CommonProperty(), newReferentialProperty(), {
    type: 'common',
    isExtensionOverride: false,
    sourceMap: new CommonPropertySourceMap(),
  });
}

export const asCommonProperty = (x: EntityProperty): CommonProperty => ((x: any): CommonProperty);
