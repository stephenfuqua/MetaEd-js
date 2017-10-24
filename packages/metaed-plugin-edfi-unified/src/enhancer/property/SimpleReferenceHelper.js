// @flow
import type { EntityProperty } from '../../../../metaed-core/src/model/property/EntityProperty';

export function getReferencedEntity(propertyEntity: Map<string, any>, property: EntityProperty) {
  // Redefine Map key by converting to an Array and back to a Map.
  const propertyMap: Map<string, any> = Array.from(propertyEntity.values()).reduce((map, item) => map.set(item.metaEdName, item), new Map());
  return propertyMap.get(property.metaEdName);
}
