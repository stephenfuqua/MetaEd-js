import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type InlineCommonPropertySourceMap = ReferentialPropertySourceMap;

/**
 *
 */
export function newInlineCommonPropertySourceMap(): InlineCommonPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
  };
}

export interface InlineCommonProperty extends ReferentialProperty {
  sourceMap: InlineCommonPropertySourceMap;
}

/**
 *
 */
export function newInlineCommonProperty(): InlineCommonProperty {
  return {
    ...newReferentialProperty(),
    type: 'inlineCommon',
    typeHumanizedName: 'Inline Common Property',
    sourceMap: newInlineCommonPropertySourceMap(),
  };
}

/**
 *
 */
export const asInlineCommonProperty = (x: EntityProperty): InlineCommonProperty => x as InlineCommonProperty;
