// @flow
import R from 'ramda';
import { getEntitiesOfTypeForNamespaces, newIntegerProperty } from 'metaed-core';
import type { EnhancerResult, EntityProperty, IntegerProperty, MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { addEntityPropertyEdfiOdsTo } from '../model/property/EntityProperty';

const enhancerName: string = 'CreateUsisFromUniqueIdsEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };

  getEntitiesOfTypeForNamespaces([coreNamespace], 'domainEntity').forEach((entity: ModelBase) => {
    const uniqueIdStrategy = x => x.metaEdName === 'UniqueId';
    const uniqueIdProperty: ?EntityProperty = entity.data.edfiOds.ods_IdentityProperties.find(uniqueIdStrategy);
    if (uniqueIdProperty == null) return;

    // UniqueId properties are unique indexes, but demoted from primary key
    entity.data.edfiOds.ods_Properties = R.reject(uniqueIdStrategy)(entity.data.edfiOds.ods_Properties);
    entity.data.edfiOds.ods_IdentityProperties = R.reject(uniqueIdStrategy)(entity.data.edfiOds.ods_IdentityProperties);

    const odsUniqueIdProperty: EntityProperty = (({ ...uniqueIdProperty }: any): EntityProperty);
    odsUniqueIdProperty.data.edfiOds.ods_IsUniqueIndex = true;
    odsUniqueIdProperty.isPartOfIdentity = false;
    entity.data.edfiOds.ods_Properties.push(odsUniqueIdProperty);

    // a UniqueId property gets a parallel USI identity column
    const usiProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'USI',
      withContext: odsUniqueIdProperty.withContext,
      shortenTo: odsUniqueIdProperty.shortenTo,
      documentation: odsUniqueIdProperty.documentation,
      isPartOfIdentity: true,
      parentEntityName: uniqueIdProperty.parentEntityName,
      parentEntity: uniqueIdProperty.parentEntity,
    });
    addEntityPropertyEdfiOdsTo(usiProperty);
    usiProperty.data.edfiOds.ods_IsIdentityDatabaseType = true;
    entity.data.edfiOds.ods_Properties.push(usiProperty);
    entity.data.edfiOds.ods_IdentityProperties.push(usiProperty);
  });

  return {
    enhancerName,
    success: true,
  };
}
