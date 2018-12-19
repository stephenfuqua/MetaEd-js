import R from 'ramda';
import { getEntitiesOfTypeForNamespaces, newIntegerProperty } from 'metaed-core';
import { EnhancerResult, EntityProperty, IntegerProperty, MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { addEntityPropertyEdfiOdsTo } from '../model/property/EntityProperty';

const enhancerName = 'CreateUsisFromUniqueIdsEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };

  getEntitiesOfTypeForNamespaces([coreNamespace], 'domainEntity').forEach((entity: ModelBase) => {
    const uniqueIdStrategy = x => x.metaEdName === 'UniqueId';
    const uniqueIdProperty: EntityProperty | null = entity.data.edfiOds.odsIdentityProperties.find(uniqueIdStrategy);
    if (uniqueIdProperty == null) return;

    // UniqueId properties are unique indexes, but demoted from primary key
    entity.data.edfiOds.odsProperties = R.reject(uniqueIdStrategy)(entity.data.edfiOds.odsProperties);
    entity.data.edfiOds.odsIdentityProperties = R.reject(uniqueIdStrategy)(entity.data.edfiOds.odsIdentityProperties);

    const odsUniqueIdProperty: EntityProperty = { ...uniqueIdProperty } as EntityProperty;
    odsUniqueIdProperty.data.edfiOds.odsIsUniqueIndex = true;
    odsUniqueIdProperty.isPartOfIdentity = false;
    entity.data.edfiOds.odsProperties.push(odsUniqueIdProperty);

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
    usiProperty.data.edfiOds.odsIsIdentityDatabaseType = true;
    entity.data.edfiOds.odsProperties.push(usiProperty);
    entity.data.edfiOds.odsIdentityProperties.push(usiProperty);
  });

  return {
    enhancerName,
    success: true,
  };
}
