import { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { Table, ForeignKey } from 'metaed-plugin-edfi-ods-relational';
import { getAllEntitiesOfType } from 'metaed-core';
import {
  changeQueryIndicated,
  applyCreateDeleteTrackingTriggerEnhancements,
  tableForModel,
} from 'metaed-plugin-edfi-ods-changequery';
import { applyCreateDeleteTrackingTableEnhancement } from 'metaed-plugin-edfi-ods-changequery';
import { TARGET_DATABASE_PLUGIN_NAME, versionSatisfiesForPostgresChangeQuerySupport } from './EnhancerHelper';
import { createDeleteTrackingTableModel } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTriggerModel } from './DeleteTrackingTriggerCreator';
import { PLUGIN_NAME } from '../PluginHelper';

const enhancerName = 'AssociationSubclassChangeQueryEnhancer';

function associationSuperclassForeignKeyFinder(mainTable: Table): ForeignKey | undefined {
  return mainTable.foreignKeys.find((foreignKey: ForeignKey) => foreignKey.sourceReference.isSubclassRelationship);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (versionSatisfiesForPostgresChangeQuerySupport(metaEd) && changeQueryIndicated(metaEd)) {
    getAllEntitiesOfType(metaEd, 'associationSubclass').forEach((modelBase: ModelBase) => {
      applyCreateDeleteTrackingTableEnhancement(
        metaEd,
        modelBase.namespace,
        PLUGIN_NAME,
        tableForModel(modelBase),
        createDeleteTrackingTableModel,
      );
      applyCreateDeleteTrackingTriggerEnhancements(
        metaEd,
        modelBase.namespace,
        PLUGIN_NAME,
        tableForModel(modelBase),
        createDeleteTrackingTriggerModel,
        TARGET_DATABASE_PLUGIN_NAME,
        associationSuperclassForeignKeyFinder,
      );
    });
  }
  return {
    enhancerName,
    success: true,
  };
}
