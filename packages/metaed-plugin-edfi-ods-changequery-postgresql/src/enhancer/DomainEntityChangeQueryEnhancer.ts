import { MetaEdEnvironment, ModelBase, EnhancerResult, getAllEntitiesOfType } from 'metaed-core';
import {
  changeQueryIndicated,
  tableForModel,
  applyCreateDeleteTrackingTableEnhancement,
  applyCreateDeleteTrackingTriggerEnhancements,
} from 'metaed-plugin-edfi-ods-changequery';
import { createDeleteTrackingTriggerModel } from './DeleteTrackingTriggerCreator';
import { createDeleteTrackingTableModel } from './DeleteTrackingTableCreator';
import { TARGET_DATABASE_PLUGIN_NAME, versionSatisfiesForPostgresChangeQuerySupport } from './EnhancerHelper';
import { PLUGIN_NAME } from '../PluginHelper';

const enhancerName = 'DomainEntityChangeQueryEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (versionSatisfiesForPostgresChangeQuerySupport(metaEd) && changeQueryIndicated(metaEd)) {
    getAllEntitiesOfType(metaEd, 'domainEntity').forEach((modelBase: ModelBase) => {
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
      );
    });
  }
  return {
    enhancerName,
    success: true,
  };
}
