// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';

export class CommonPropertySourceMap extends ReferentialPropertySourceMap {
  isExtensionOverride: ?SourceMap;
}

export class CommonProperty extends ReferentialProperty {
  isExtensionOverride: boolean;
  sourceMap: CommonPropertySourceMap;
}

export function commonPropertyFactory(): CommonProperty {
  return Object.assign(new CommonProperty(), defaultReferentialProperty(), {
    type: 'common',
    isExtensionOverride: false,
    sourceMap: new CommonPropertySourceMap(),
  });
}
