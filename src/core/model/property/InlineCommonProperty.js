// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class InlineCommonPropertySourceMap extends ReferentialPropertySourceMap {}

export class InlineCommonProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | InlineCommonPropertySourceMap;
}

export function inlineCommonPropertyFactory(): InlineCommonProperty {
  return Object.assign(new InlineCommonProperty(), defaultReferentialProperty(), {
    type: 'inlineCommon',
    sourceMap: new InlineCommonPropertySourceMap(),
  });
}
