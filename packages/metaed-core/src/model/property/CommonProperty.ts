import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { EntityProperty } from './EntityProperty';

export interface CommonPropertySourceMap extends ReferentialPropertySourceMap {
  isExtensionOverride: SourceMap;
}

/**
 *
 */
export function newCommonPropertySourceMap(): CommonPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
    isExtensionOverride: NoSourceMap,
  };
}

export interface CommonProperty extends ReferentialProperty {
  sourceMap: CommonPropertySourceMap;
  isExtensionOverride: boolean;
}

/**
 *
 */
export function newCommonProperty(): CommonProperty {
  return {
    ...newReferentialProperty(),
    type: 'common',
    typeHumanizedName: 'Common Property',
    isExtensionOverride: false,
    sourceMap: newCommonPropertySourceMap(),
  };
}

/**
 *
 */
export const asCommonProperty = (x: EntityProperty): CommonProperty => x as CommonProperty;
