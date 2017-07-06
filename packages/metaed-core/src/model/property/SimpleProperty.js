// @flow
import { EntityProperty, EntityPropertySourceMap, newEntityPropertyFields } from './EntityProperty';
import type { SourceMap } from './../SourceMap';
import { newDecimalType } from './../DecimalType';
import type { DecimalType } from './../DecimalType';
import type { IntegerType } from './../IntegerType';
import type { StringType } from './../StringType';

export class SimplePropertySourceMap extends EntityPropertySourceMap {
  referencedEntity: ?SourceMap;
}

export class SimpleProperty extends EntityProperty {
  // note these are obsoleted by Shared versions, and references should move to them, only for SharedProperties
  // Nonshared won't need referenced entity - will be handled in XSD specific
  referencedEntity: DecimalType | IntegerType | StringType;
}

export function newSimplePropertyFields() {
  return Object.assign({}, newEntityPropertyFields(), {
    // default referencedEntity
    referencedEntity: newDecimalType(),
  });
}

export function newSimpleProperty(): SimpleProperty {
  return Object.assign(new SimpleProperty(), newSimplePropertyFields());
}
