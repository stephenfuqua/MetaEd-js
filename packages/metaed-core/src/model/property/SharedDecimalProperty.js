// @flow
import type { DecimalProperty, DecimalPropertySourceMap } from './DecimalProperty';
import { newDecimalProperty, newDecimalPropertySourceMap } from './DecimalProperty';
import type { EntityProperty } from './EntityProperty';
import type { MergedProperty } from './MergedProperty';
import type { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export type SharedDecimalPropertySourceMap = {
  ...$Exact<DecimalPropertySourceMap>,
  mergedProperties: Array<SourceMap>,
};

export function newSharedDecimalPropertySourceMap(): SharedDecimalPropertySourceMap {
  return {
    ...newDecimalPropertySourceMap(),
    referencedEntity: NoSourceMap,
    mergedProperties: [],
  };
}

export type SharedDecimalProperty = {
  sourceMap: SharedDecimalPropertySourceMap,
  ...$Exact<DecimalProperty>,
  mergedProperties: Array<MergedProperty>,
};

export function newSharedDecimalProperty(): SharedDecimalProperty {
  return {
    ...newDecimalProperty(),
    type: 'sharedDecimal',
    typeHumanizedName: 'Shared Decimal Property',
    mergedProperties: [],
    sourceMap: newSharedDecimalPropertySourceMap(),
  };
}

export const asSharedDecimalProperty = (x: EntityProperty): SharedDecimalProperty => ((x: any): SharedDecimalProperty);
