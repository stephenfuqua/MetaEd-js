import { DecimalProperty, DecimalPropertySourceMap } from './DecimalProperty';
import { newDecimalProperty, newDecimalPropertySourceMap } from './DecimalProperty';
import { EntityProperty } from './EntityProperty';
import { MergeDirective } from './MergeDirective';
import { SourceMap } from '../SourceMap';

export interface SharedDecimalPropertySourceMap extends DecimalPropertySourceMap {
  mergeDirectives: Array<SourceMap>;
}

/**
 *
 */
export function newSharedDecimalPropertySourceMap(): SharedDecimalPropertySourceMap {
  return {
    ...newDecimalPropertySourceMap(),
    mergeDirectives: [],
  };
}

export interface SharedDecimalProperty extends DecimalProperty {
  sourceMap: SharedDecimalPropertySourceMap;
  mergeDirectives: Array<MergeDirective>;
}

/**
 *
 */
export function newSharedDecimalProperty(): SharedDecimalProperty {
  return {
    ...newDecimalProperty(),
    type: 'sharedDecimal',
    typeHumanizedName: 'Shared Decimal Property',
    mergeDirectives: [],
    sourceMap: newSharedDecimalPropertySourceMap(),
  };
}

/**
 *
 */
export const asSharedDecimalProperty = (x: EntityProperty): SharedDecimalProperty => x as SharedDecimalProperty;
