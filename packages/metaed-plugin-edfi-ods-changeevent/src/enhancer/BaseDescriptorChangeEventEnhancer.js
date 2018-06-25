// @flow

import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { Table } from 'metaed-plugin-edfi-ods';
import { tableEntities } from 'metaed-plugin-edfi-ods';
import { changeEventPossible } from './ChangeEventIndicator';
import { createDeleteTrackingTableFromTable } from './DeleteTrackingTableCreator';
import { createDeleteTrackingTriggerFromTable } from './DeleteTrackingTriggerCreator';

const enhancerName: string = 'BaseDescriptorChangeEventEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edfiNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (edfiNamespace == null) return { enhancerName, success: false };

  if (!changeEventPossible(metaEd)) return { enhancerName, success: true };

  const baseDescriptorTable: ?Table = tableEntities(metaEd, edfiNamespace).get('Descriptor');
  if (baseDescriptorTable == null) return { enhancerName, success: false };

  createDeleteTrackingTableFromTable(metaEd, edfiNamespace, baseDescriptorTable);
  createDeleteTrackingTriggerFromTable(metaEd, edfiNamespace, baseDescriptorTable);

  return {
    enhancerName,
    success: true,
  };
}
