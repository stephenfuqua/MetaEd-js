// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';
import { getAllTopLevelEntities } from '../../../../packages/metaed-core/index';
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
