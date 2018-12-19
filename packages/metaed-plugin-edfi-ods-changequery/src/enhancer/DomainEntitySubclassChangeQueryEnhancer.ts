import { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { Table, ForeignKey } from 'metaed-plugin-edfi-ods';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { createDeleteTrackingTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTrigger } from './DeleteTrackingTriggerCreator';

const enhancerName = 'DomainEntitySubclassChangeQueryEnhancer';

function domainEntitySuperclassForeignKeyFinder(mainTable: Table): ForeignKey | undefined {
  return mainTable.foreignKeys.find((foreignKey: ForeignKey) => foreignKey.sourceReference.isSubclassRelationship);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (changeQueryIndicated(metaEd)) {
    getAllEntitiesOfType(metaEd, 'domainEntitySubclass').forEach((modelBase: ModelBase) => {
      createDeleteTrackingTable(metaEd, modelBase);
      createDeleteTrackingTrigger(metaEd, modelBase, domainEntitySuperclassForeignKeyFinder);
    });
  }
  return {
    enhancerName,
    success: true,
  };
}
