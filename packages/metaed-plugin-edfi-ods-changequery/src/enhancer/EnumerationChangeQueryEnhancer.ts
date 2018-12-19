import { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { createDeleteTrackingTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTrigger } from './DeleteTrackingTriggerCreator';

const enhancerName = 'EnumerationChangeQueryEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (changeQueryIndicated(metaEd)) {
    getAllEntitiesOfType(metaEd, 'enumeration').forEach((modelBase: ModelBase) => {
      createDeleteTrackingTable(metaEd, modelBase);
      createDeleteTrackingTrigger(metaEd, modelBase);
    });
  }

  return {
    enhancerName,
    success: true,
  };
}
