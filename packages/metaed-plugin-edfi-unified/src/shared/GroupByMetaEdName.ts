import { ModelBase, EntityProperty } from 'metaed-core';

export function groupByMetaEdName<T extends ModelBase | EntityProperty>(modelItems: Array<T>): Map<string, Array<T>> {
  return modelItems.reduce((structure: Map<string, Array<T>>, modelItem: T) => {
    if (!structure.has(modelItem.metaEdName)) structure.set(modelItem.metaEdName, []);
    // @ts-ignore: previous line guarantees get will not be undefined
    structure.get(modelItem.metaEdName).push(modelItem);
    return structure;
  }, new Map());
}
