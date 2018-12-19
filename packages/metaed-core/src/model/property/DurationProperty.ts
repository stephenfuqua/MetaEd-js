import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type DurationPropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newDurationPropertySourceMap(): DurationPropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface DurationProperty extends SimpleProperty {
  sourceMap: DurationPropertySourceMap;
}

/**
 *
 */
export function newDurationProperty(): DurationProperty {
  return {
    ...newSimpleProperty(),
    type: 'duration',
    typeHumanizedName: 'Duration Property',
    sourceMap: newDurationPropertySourceMap(),
  };
}

/**
 *
 */
export const asDurationProperty = (x: EntityProperty): DurationProperty => x as DurationProperty;
