import { MetaEdEnvironment, EnhancerResult, EnumerationProperty } from 'metaed-core';
import { normalizeEnumerationSuffix } from 'metaed-core';
import { prependroleNameToMetaEdName } from '../../shared/Utility';
import { EntityPropertyEdfiOds } from './EntityProperty';

export type EnumerationPropertyEdfiOds = EntityPropertyEdfiOds & {
  odsTypeifiedBaseName: string;
};

// Enhancer for object setup
const enhancerName = 'EnumerationPropertySetupEnhancer';

export function odsTypeifiedBaseName(property: EnumerationProperty) {
  return normalizeEnumerationSuffix(property.metaEdName);
}

export function odsEnumerationName(property: EnumerationProperty) {
  return normalizeEnumerationSuffix(prependroleNameToMetaEdName(property.metaEdName, property.roleName));
}

export function addEnumerationPropertyEdfiOdsTo(property: EnumerationProperty) {
  if (property.data.edfiOds == null) property.data.edfiOds = {};

  Object.assign(property.data.edfiOds, {
    odsTypeifiedBaseName: odsTypeifiedBaseName(property),
    odsName: odsEnumerationName(property),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.enumeration.forEach((property: EnumerationProperty) => {
    addEnumerationPropertyEdfiOdsTo(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
