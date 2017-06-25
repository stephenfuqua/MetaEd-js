// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class CommonPropertySourceMap extends ReferentialPropertySourceMap {
  isExtensionOverride: ?SourceMap;
}

export class CommonProperty extends ReferentialProperty {
  isExtensionOverride: boolean;
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | CommonPropertySourceMap;
}

export function commonPropertyFactory(): CommonProperty {
  return Object.assign(new CommonProperty(), defaultReferentialProperty(), {
    type: 'common',
    isExtensionOverride: false,
    sourceMap: new CommonPropertySourceMap(),
  });
}

export const asCommonProperty = (x: EntityProperty): CommonProperty => ((x: any): CommonProperty);
