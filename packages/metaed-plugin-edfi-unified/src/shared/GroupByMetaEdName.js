// @flow
import type { ModelBase, EntityProperty } from '../../../../packages/metaed-core/index';

export function groupByMetaEdName<T: ModelBase | EntityProperty>(modelItems: Array<T>): Map<string, Array<T>> {
  return modelItems.reduce((structure: Map<string, Array<T>>, modelItem: T) => {
    if (!structure.has(modelItem.metaEdName)) structure.set(modelItem.metaEdName, []);
    // $FlowIgnore - we ensure the key is in the map above
    structure.get(modelItem.metaEdName).push(modelItem);
    return structure;
  }, new Map());
}
