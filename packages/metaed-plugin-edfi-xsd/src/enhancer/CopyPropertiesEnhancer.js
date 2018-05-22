// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllTopLevelEntitiesForNamespaces } from 'metaed-core';
import type { TopLevelEntityEdfiXsd } from '../model/TopLevelEntity';

const enhancerName: string = 'CopyPropertiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntitiesForNamespaces(Array.from(metaEd.namespace.values())).forEach(entity => {
    ((entity.data.edfiXsd: any): TopLevelEntityEdfiXsd).xsd_IdentityProperties.push(...entity.identityProperties);
  });

  return {
    enhancerName,
    success: true,
  };
}
