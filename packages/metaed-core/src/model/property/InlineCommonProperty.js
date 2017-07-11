// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, newReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class InlineCommonPropertySourceMap extends ReferentialPropertySourceMap {}

export class InlineCommonProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | InlineCommonPropertySourceMap;
}

export function newInlineCommonProperty(): InlineCommonProperty {
  return Object.assign(new InlineCommonProperty(), newReferentialProperty(), {
    type: 'inlineCommon',
    typeHumanizedName: 'Inline Common Property',
    sourceMap: new InlineCommonPropertySourceMap(),
  });
}

export const asInlineCommonProperty = (x: EntityProperty): InlineCommonProperty => ((x: any): InlineCommonProperty);
