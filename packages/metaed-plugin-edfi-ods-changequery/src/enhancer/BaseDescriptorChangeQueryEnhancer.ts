import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { Table } from 'metaed-plugin-edfi-ods-relational';
import { tableEntities } from 'metaed-plugin-edfi-ods-relational';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { createDeleteTrackingTableFromTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTriggerFromTable } from './DeleteTrackingTriggerCreator';

const enhancerName = 'BaseDescriptorChangeQueryEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (changeQueryIndicated(metaEd)) {
    const edfiNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
    if (edfiNamespace == null) return { enhancerName, success: false };

    const baseDescriptorTable: Table | undefined = tableEntities(metaEd, edfiNamespace).get('Descriptor');
    if (baseDescriptorTable == null) return { enhancerName, success: false };

    createDeleteTrackingTableFromTable(metaEd, edfiNamespace, baseDescriptorTable);
    createDeleteTrackingTriggerFromTable(metaEd, edfiNamespace, baseDescriptorTable);
  }
  return {
    enhancerName,
    success: true,
  };
}
