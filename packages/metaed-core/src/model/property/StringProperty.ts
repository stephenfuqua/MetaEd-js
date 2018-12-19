import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export interface StringPropertySourceMap extends SimplePropertySourceMap {
  minLength: SourceMap;
  maxLength: SourceMap;
}

/**
 *
 */
export function newStringPropertySourceMap(): StringPropertySourceMap {
  return {
    ...newSimplePropertySourceMap(),
    minLength: NoSourceMap,
    maxLength: NoSourceMap,
  };
}

export interface StringProperty extends SimpleProperty {
  sourceMap: StringPropertySourceMap;
  minLength: string | null;
  maxLength: string | null;
}

/**
 *
 */
export function newStringProperty(): StringProperty {
  return {
    ...newSimpleProperty(),
    type: 'string',
    typeHumanizedName: 'String Property',
    minLength: null,
    maxLength: null,
    sourceMap: newStringPropertySourceMap(),
  };
}

/**
 *
 */
export const asStringProperty = (x: EntityProperty): StringProperty => x as StringProperty;
