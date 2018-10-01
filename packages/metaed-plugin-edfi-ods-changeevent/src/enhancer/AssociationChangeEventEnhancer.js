// @flow

import type { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { changeEventIndicated } from './ChangeEventIndicator';
import { createDeleteTrackingTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTrigger } from './DeleteTrackingTriggerCreator';

const enhancerName: string = 'AssociationChangeEventEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (changeEventIndicated(metaEd)) {
    getAllEntitiesOfType(metaEd, 'association').forEach((modelBase: ModelBase) => {
      createDeleteTrackingTable(metaEd, modelBase);
      createDeleteTrackingTrigger(metaEd, modelBase);
    });
  }
  return {
    enhancerName,
    success: true,
  };
}
