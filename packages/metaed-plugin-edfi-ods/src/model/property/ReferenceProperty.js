// @flow
import type { EnhancerResult, EntityProperty, MetaEdEnvironment } from 'metaed-core';
import { getPropertiesOfType } from 'metaed-core';

export type ReferencePropertyEdfiOds = {
  ods_DeleteCascadePrimaryKey: boolean,
  ods_CausesCyclicUpdateCascade: boolean,
  ods_IsReferenceToSuperclass: boolean,
  ods_IsReferenceToExtensionParent: boolean,
};

// Enhancer for object setup
const enhancerName: string = 'ReferencePropertySetupEnhancer';

export function addReferencePropertyEdfiOdsTo(property: EntityProperty) {
  if (property.data.edfiOds == null) property.data.edfiOds = {};

  Object.assign(property.data.edfiOds, {
    ods_DeleteCascadePrimaryKey: false,
    ods_CausesCyclicUpdateCascade: false,
    ods_IsReferenceToSuperclass: false,
    ods_IsReferenceToExtensionParent: false,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getPropertiesOfType(metaEd.propertyIndex, 'association', 'domainEntity').forEach((property: EntityProperty) => {
    addReferencePropertyEdfiOdsTo(property);
  });

  return {
    enhancerName,
    success: true,
  };
}

export const isOdsReferenceProperty = (property: EntityProperty): boolean =>
  ['association', 'domainEntity'].includes(property.type);

export const isOdsMergeableProperty = (property: EntityProperty): boolean =>
  ['association', 'domainEntity', 'sharedDecimal', 'sharedInteger', 'sharedShort', 'sharedString'].includes(property.type);
