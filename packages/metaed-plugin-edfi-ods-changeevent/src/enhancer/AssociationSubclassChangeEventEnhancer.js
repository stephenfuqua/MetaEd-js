// @flow

import type { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import type { Table, ForeignKey } from 'metaed-plugin-edfi-ods';
import { getAllEntitiesOfType } from 'metaed-core';
import { changeEventPossible } from './ChangeEventIndicator';
import { createDeleteTrackingTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTrigger } from './DeleteTrackingTriggerCreator';

const enhancerName: string = 'AssociationSubclassChangeEventEnhancer';

function associationSuperclassForeignKeyFinder(mainTable: Table): ?ForeignKey {
  return mainTable.foreignKeys.find((foreignKey: ForeignKey) => foreignKey.sourceReference.isSubclassRelationship);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!changeEventPossible(metaEd)) return { enhancerName, success: true };
  getAllEntitiesOfType(metaEd, 'associationSubclass').forEach((modelBase: ModelBase) => {
    createDeleteTrackingTable(metaEd, modelBase);
    createDeleteTrackingTrigger(metaEd, modelBase, associationSuperclassForeignKeyFinder);
  });

  return {
    enhancerName,
    success: true,
  };
}
