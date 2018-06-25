// @flow

import type { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { changeEventPossible } from './ChangeEventIndicator';
import { createDeleteTrackingTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTrigger } from './DeleteTrackingTriggerCreator';

const enhancerName: string = 'SchoolYearEnumerationChangeEventEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!changeEventPossible(metaEd)) return { enhancerName, success: true };
  getAllEntitiesOfType(metaEd, 'schoolYearEnumeration').forEach((modelBase: ModelBase) => {
    createDeleteTrackingTable(metaEd, modelBase);
    createDeleteTrackingTrigger(metaEd, modelBase);
  });

  return {
    enhancerName,
    success: true,
  };
}
