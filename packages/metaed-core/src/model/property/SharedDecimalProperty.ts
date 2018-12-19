import { DecimalProperty, DecimalPropertySourceMap } from './DecimalProperty';
import { newDecimalProperty, newDecimalPropertySourceMap } from './DecimalProperty';
import { EntityProperty } from './EntityProperty';
import { MergedProperty } from './MergedProperty';
import { SourceMap } from '../SourceMap';

export interface SharedDecimalPropertySourceMap extends DecimalPropertySourceMap {
  mergedProperties: Array<SourceMap>;
}

/**
 *
 */
export function newSharedDecimalPropertySourceMap(): SharedDecimalPropertySourceMap {
  return {
    ...newDecimalPropertySourceMap(),
    mergedProperties: [],
  };
}

export interface SharedDecimalProperty extends DecimalProperty {
  sourceMap: SharedDecimalPropertySourceMap;
  mergedProperties: Array<MergedProperty>;
}

/**
 *
 */
export function newSharedDecimalProperty(): SharedDecimalProperty {
  return {
    ...newDecimalProperty(),
    type: 'sharedDecimal',
    typeHumanizedName: 'Shared Decimal Property',
    mergedProperties: [],
    sourceMap: newSharedDecimalPropertySourceMap(),
  };
}

/**
 *
 */
export const asSharedDecimalProperty = (x: EntityProperty): SharedDecimalProperty => x as SharedDecimalProperty;
