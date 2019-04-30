import R from 'ramda';
import { getAllProperties, getAllTopLevelEntitiesForNamespaces } from 'metaed-core';
import { MetaEdEnvironment, EnhancerResult, EntityProperty } from 'metaed-core';
import { prependroleNameToMetaEdName } from '../../shared/Utility';

export type EntityPropertyEdfiOds = {
  odsName: string;
  odsIsCollection: boolean;
  odsIsIdentityDatabaseType: boolean;
  odsIsUniqueIndex: boolean;
  odsContextPrefix: string;
};

// Enhancer for object setup
const enhancerName = 'EntityPropertySetupEnhancer';

export function odsName(property: EntityProperty): string {
  return prependroleNameToMetaEdName(property.metaEdName, property.roleName);
}

export function odsIsCollection(property: EntityProperty): boolean {
  return property.isRequiredCollection || property.isOptionalCollection;
}

export function odsContextPrefix(property: EntityProperty): string {
  return R.isEmpty(property.shortenTo) || property.shortenTo == null ? property.roleName : property.shortenTo;
}

export function addEntityPropertyEdfiOdsTo(property: EntityProperty) {
  if (property.data.edfiOds == null) property.data.edfiOds = {};

  Object.assign(property.data.edfiOds, {
    odsName: odsName(property),
    odsIsCollection: odsIsCollection(property),
    odsContextPrefix: odsContextPrefix(property),
    odsIsIdentityDatabaseType: false,
    odsIsUniqueIndex: false,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  [
    ...getAllProperties(metaEd.propertyIndex),
    ...R.chain(x => x.queryableFields, getAllTopLevelEntitiesForNamespaces(Array.from(metaEd.namespace.values()))),
  ].forEach((property: EntityProperty) => {
    addEntityPropertyEdfiOdsTo(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
