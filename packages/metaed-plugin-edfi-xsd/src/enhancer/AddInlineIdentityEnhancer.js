// @flow
import type { MetaEdEnvironment, EnhancerResult, TopLevelEntity, EntityProperty, Namespace, Common } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';
import type { TopLevelEntityEdfiXsd } from '../model/TopLevelEntity';

// This enhancer covers both the original AssociationBaseInlineIdentityEnhancer and DomainEntityBaseInlineIdentityEnhancer

const enhancerName: string = 'AddInlineIdentityEnhancer';

function addInlineIdentities(topLevelEntity: TopLevelEntity, properties: Array<EntityProperty>, namespace: Namespace) {
  properties.filter(p => p.type === 'inlineCommon').forEach(commonProperty => {
    const common: Common = (getEntityForNamespaces(
      commonProperty.metaEdName,
      [namespace, ...namespace.dependencies],
      'common',
    ): any);
    if (common == null || common.inlineInOds == null) return;
    common.properties.filter(p => p.isPartOfIdentity).forEach(identityProperty => {
      const topLevelEntityEdfiXsd: TopLevelEntityEdfiXsd = ((topLevelEntity.data.edfiXsd: any): TopLevelEntityEdfiXsd);
      topLevelEntityEdfiXsd.xsd_IdentityProperties.push(identityProperty);
    });
    addInlineIdentities(topLevelEntity, common.properties, namespace);
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(
    metaEd,
    'association',
    'associationExtension',
    'associationSubclass',
    'domainEntity',
    'domainEntityExtension',
    'domainEntitySubclass',
  ).forEach(entity => {
    const topLevelEntity: TopLevelEntity = (entity: any);
    addInlineIdentities(topLevelEntity, topLevelEntity.properties, topLevelEntity.namespace);
  });

  return {
    enhancerName,
    success: true,
  };
}
