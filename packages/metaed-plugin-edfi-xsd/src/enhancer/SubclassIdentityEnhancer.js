// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, TopLevelEntity } from 'metaed-core';
import { getAllTopLevelEntitiesForNamespaces } from 'metaed-core';
import type { TopLevelEntityEdfiXsd } from '../model/TopLevelEntity';

const enhancerName: string = 'SubclassIdentityEnhancer';

function addBaseIdentityProperties(topLevelEntity: TopLevelEntity) {
  if (!topLevelEntity.baseEntity) return;
  addBaseIdentityProperties(topLevelEntity.baseEntity);
  const identityRenames = topLevelEntity.identityProperties.filter(x => x.isIdentityRename);
  if (!topLevelEntity.baseEntity) return; // makes Flow happy
  const baseIdentities = ((topLevelEntity.baseEntity.data.edfiXsd: any): TopLevelEntityEdfiXsd).xsd_IdentityProperties;
  const identitiesWithoutRenamed = baseIdentities.filter(x => identityRenames.every(y => y.baseKeyName !== x.metaEdName));
  // Only add properties that haven't been previously added
  const entityEdfiXsd = ((topLevelEntity.data.edfiXsd: any): TopLevelEntityEdfiXsd);
  entityEdfiXsd.xsd_IdentityProperties = R.union(entityEdfiXsd.xsd_IdentityProperties, identitiesWithoutRenamed);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntitiesForNamespaces(Array.from(metaEd.namespace.values())).forEach(entity => {
    addBaseIdentityProperties(entity);
  });

  return {
    enhancerName,
    success: true,
  };
}
