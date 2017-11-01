// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllTopLevelEntities } from 'metaed-core';
import type { TopLevelEntityEdfiXsd } from '../model/TopLevelEntity';

const enhancerName: string = 'CopyPropertiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntities(metaEd.entity).forEach(entity => {
    ((entity.data.edfiXsd: any): TopLevelEntityEdfiXsd).xsd_IdentityProperties.push(...entity.identityProperties);
  });

  return {
    enhancerName,
    success: true,
  };
}
