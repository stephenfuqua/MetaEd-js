import { EntityProperty, EntityPropertySourceMap } from './EntityProperty';
import { newEntityPropertySourceMap, newEntityProperty } from './EntityProperty';
import { NoSharedSimple } from '../SharedSimple';
import { SharedSimple } from '../SharedSimple';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export interface SimplePropertySourceMap extends EntityPropertySourceMap {
  referencedEntity: SourceMap;
  referencedEntityDeprecated: SourceMap;
}

/**
 *
 */
export function newSimplePropertySourceMap(): SimplePropertySourceMap {
  return {
    ...newEntityPropertySourceMap(),
    referencedEntity: NoSourceMap,
    referencedEntityDeprecated: NoSourceMap,
  };
}

export interface SimpleProperty extends EntityProperty {
  referencedEntity: SharedSimple;
  referencedEntityDeprecated: boolean;
}

/**
 *
 */
export function newSimpleProperty() {
  return {
    ...newEntityProperty(),
    referencedEntity: NoSharedSimple,
    referencedEntityDeprecated: false,
    sourceMap: newSimplePropertySourceMap(),
  };
}

/**
 *
 */
export const asSimpleProperty = (x: EntityProperty): SimpleProperty => x as SimpleProperty;
