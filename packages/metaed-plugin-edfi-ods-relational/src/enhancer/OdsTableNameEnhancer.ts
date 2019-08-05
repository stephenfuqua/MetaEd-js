import { getAllTopLevelEntitiesForNamespaces, normalizeEnumerationSuffix } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, ModelBase } from 'metaed-core';
import { DescriptorEdfiOds } from '../model/Descriptor';

const enhancerName = 'OdsTableNameEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntitiesForNamespaces(Array.from(metaEd.namespace.values())).forEach((entity: ModelBase) => {
    if (entity.type === 'descriptor') {
      entity.data.edfiOds.odsTableName = (entity.data.edfiOds as DescriptorEdfiOds).odsDescriptorName;
    } else if (entity.type === 'enumeration' || entity.type === 'schoolYearEnumeration') {
      entity.data.edfiOds.odsTableName = normalizeEnumerationSuffix(entity.metaEdName);
    } else {
      entity.data.edfiOds.odsTableName = entity.metaEdName;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
