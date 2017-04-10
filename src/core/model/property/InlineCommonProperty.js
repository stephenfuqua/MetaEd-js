// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';

export class InlineCommonPropertySourceMap extends ReferentialPropertySourceMap {}

export class InlineCommonProperty extends ReferentialProperty {
  sourceMap: InlineCommonPropertySourceMap;
}

export function inlineCommonPropertyFactory(): InlineCommonProperty {
  return Object.assign(new InlineCommonProperty(), defaultReferentialProperty(), {
    type: 'inline common',
    sourceMap: new InlineCommonPropertySourceMap(),
  });
}
