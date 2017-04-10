// @flow
import { EntityProperty, EntityPropertySourceMap, defaultEntityPropertyFields } from './EntityProperty';
import type { SourceMap } from './../ModelBase';
import { defaultSharedSimple, SharedSimple } from './../SharedSimple';

export class SimplePropertySourceMap extends EntityPropertySourceMap {
  referencedEntity: ?SourceMap;
}

export class SimpleProperty extends EntityProperty {
  referencedEntity: SharedSimple;
}

export function defaultSimplePropertyFields() {
  return Object.assign({}, defaultEntityPropertyFields(), {
    referencedEntity: defaultSharedSimple(),
  });
}

export function defaultSimpleProperty(): SimpleProperty {
  return Object.assign(new SimpleProperty(), defaultSimplePropertyFields());
}
