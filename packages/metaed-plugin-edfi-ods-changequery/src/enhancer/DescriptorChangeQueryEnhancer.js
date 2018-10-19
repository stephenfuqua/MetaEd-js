// @flow

import type { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import type { Table, ForeignKey } from 'metaed-plugin-edfi-ods';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { createDeleteTrackingTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTrigger } from './DeleteTrackingTriggerCreator';

const enhancerName: string = 'DescriptorChangeQueryEnhancer';

function descriptorBaseDescriptorForeignKeyFinder(mainTable: Table): ?ForeignKey {
  return mainTable.foreignKeys.find((foreignKey: ForeignKey) => foreignKey.sourceReference.isSubclassRelationship);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (changeQueryIndicated(metaEd)) {
    getAllEntitiesOfType(metaEd, 'descriptor').forEach((modelBase: ModelBase) => {
      createDeleteTrackingTable(metaEd, modelBase);
      createDeleteTrackingTrigger(metaEd, modelBase, descriptorBaseDescriptorForeignKeyFinder);
    });
  }
  return {
    enhancerName,
    success: true,
  };
}
