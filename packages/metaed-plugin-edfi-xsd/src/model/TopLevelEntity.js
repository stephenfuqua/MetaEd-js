// @flow
import type { MetaEdEnvironment, EnhancerResult, EntityProperty, TopLevelEntity, CommonProperty } from 'metaed-core';
import { getAllTopLevelEntities } from 'metaed-core';
import { NoComplexType } from './schema/ComplexType';
import type { ComplexType } from './schema/ComplexType';

export type TopLevelEntityEdfiXsd = {
  xsd_ComplexTypes: Array<ComplexType>,
  xsd_ReferenceType: ComplexType,
  xsd_IdentityType: ComplexType,
  xsd_LookupType: ComplexType,
  xsd_IdentityProperties: Array<EntityProperty>,
  xsd_HasQueryableField: boolean,
  xsd_Properties: () => Array<EntityProperty>,
  xsd_HasExtensionOverrideProperties: () => boolean,
};

const enhancerName: string = 'TopLevelEntitySetupEnhancer';

function xsdProperties(topLevelEntity: TopLevelEntity): () => Array<EntityProperty> {
  return () => topLevelEntity.properties;
}

function xsdHasExtensionOverrideProperties(topLevelEntity: TopLevelEntity): () => boolean {
  return () =>
    topLevelEntity.properties.filter(p => p.type === 'common').some(p => ((p: any): CommonProperty).isExtensionOverride);
}

export function addTopLevelEntityEdfiXsdTo(topLevelEntity: TopLevelEntity) {
  if (topLevelEntity.data.edfiXsd == null) topLevelEntity.data.edfiXsd = {};

  Object.assign(topLevelEntity.data.edfiXsd, {
    xsd_ComplexTypes: [],
    xsd_ReferenceType: NoComplexType,
    xsd_IdentityType: NoComplexType,
    xsd_LookupType: NoComplexType,
    xsd_IdentityProperties: [],
    xsd_HasQueryableField: false,
    xsd_Properties: xsdProperties(topLevelEntity),
    xsd_HasExtensionOverrideProperties: xsdHasExtensionOverrideProperties(topLevelEntity),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntities(metaEd.entity).forEach(entity => {
    addTopLevelEntityEdfiXsdTo(entity);
  });

  return {
    enhancerName,
    success: true,
  };
}
