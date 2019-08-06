import R from 'ramda';
import { getEntitiesOfTypeForNamespaces, newIntegerProperty } from 'metaed-core';
import { EnhancerResult, EntityProperty, IntegerProperty, MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { addEntityPropertyEdfiOdsTo } from '../model/property/EntityProperty';

const enhancerName = 'CreateUsisFromUniqueIdsEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  if (coreNamespace == null) return { enhancerName, success: false };

  getEntitiesOfTypeForNamespaces([coreNamespace], 'domainEntity').forEach((entity: ModelBase) => {
    const uniqueIdStrategy = x => x.metaEdName === 'UniqueId';
    const uniqueIdProperty: EntityProperty | null = entity.data.edfiOdsRelational.odsIdentityProperties.find(
      uniqueIdStrategy,
    );
    if (uniqueIdProperty == null) return;

    // UniqueId properties are unique indexes, but demoted from primary key
    entity.data.edfiOdsRelational.odsProperties = R.reject(uniqueIdStrategy)(entity.data.edfiOdsRelational.odsProperties);
    entity.data.edfiOdsRelational.odsIdentityProperties = R.reject(uniqueIdStrategy)(
      entity.data.edfiOdsRelational.odsIdentityProperties,
    );

    const odsUniqueIdProperty: EntityProperty = { ...uniqueIdProperty } as EntityProperty;
    odsUniqueIdProperty.data.edfiOdsRelational.odsIsUniqueIndex = true;
    odsUniqueIdProperty.isPartOfIdentity = false;
    entity.data.edfiOdsRelational.odsProperties.push(odsUniqueIdProperty);

    // a UniqueId property gets a parallel USI identity column
    const usiProperty: IntegerProperty = {
      ...newIntegerProperty(),
      metaEdName: 'USI',
      roleName: odsUniqueIdProperty.roleName,
      shortenTo: odsUniqueIdProperty.shortenTo,
      documentation: odsUniqueIdProperty.documentation,
      isPartOfIdentity: true,
      parentEntityName: uniqueIdProperty.parentEntityName,
      parentEntity: uniqueIdProperty.parentEntity,
    };
    addEntityPropertyEdfiOdsTo(usiProperty);
    usiProperty.data.edfiOdsRelational.odsIsIdentityDatabaseType = true;
    entity.data.edfiOdsRelational.odsProperties.push(usiProperty);
    entity.data.edfiOdsRelational.odsIdentityProperties.push(usiProperty);
  });

  return {
    enhancerName,
    success: true,
  };
}
