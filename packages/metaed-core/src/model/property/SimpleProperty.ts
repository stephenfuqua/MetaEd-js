import { EntityProperty, EntityPropertySourceMap } from './EntityProperty';
import { newEntityPropertySourceMap, newEntityProperty } from './EntityProperty';
import { NoSharedSimple } from '../SharedSimple';
import { SharedSimple } from '../SharedSimple';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export interface SimplePropertySourceMap extends EntityPropertySourceMap {
  referencedEntity: SourceMap;
}

/**
 *
 */
export function newSimplePropertySourceMap(): SimplePropertySourceMap {
  return {
    ...newEntityPropertySourceMap(),
    referencedEntity: NoSourceMap,
  };
}

export interface SimpleProperty extends EntityProperty {
  referencedEntity: SharedSimple;
}

/**
 *
 */
export function newSimpleProperty() {
  return {
    ...newEntityProperty(),
    referencedEntity: NoSharedSimple,
    sourceMap: newSimplePropertySourceMap(),
  };
}

/**
 *
 */
export const asSimpleProperty = (x: EntityProperty): SimpleProperty => x as SimpleProperty;
