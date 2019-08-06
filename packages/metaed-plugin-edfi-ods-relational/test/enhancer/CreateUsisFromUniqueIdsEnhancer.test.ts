import { newDomainEntity, newIntegerProperty, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { DomainEntity, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/CreateUsisFromUniqueIdsEnhancer';

describe('when enhancing entity with unique id property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'UniqueId',
      namespace,
      roleName: 'roleNameName',
      shortenTo: 'ShortenToName',
      documentation: 'IntegerPropertyDocumentation',
      isPartOfIdentity: true,
      data: {
        edfiOdsRelational: {
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsProperties: [integerProperty],
          odsIdentityProperties: [integerProperty],
        },
      },
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should remove unique id property', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOdsRelational.odsProperties).not.toContain(integerProperty);
    expect(domainEntity.data.edfiOdsRelational.odsIdentityProperties).not.toContain(integerProperty);
  });

  it('should add unique id copy as not part of identity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    const property: any = domainEntity.data.edfiOdsRelational.odsProperties.find(
      x => x.metaEdName === integerProperty.metaEdName,
    );
    expect(property).toBeDefined();
    expect(property.metaEdName).toBe(integerProperty.metaEdName);
    expect(property.roleName).toBe(integerProperty.roleName);
    expect(property.shortenTo).toBe(integerProperty.shortenTo);
    expect(property.documentation).toBe(integerProperty.documentation);
    expect(property.isPartOfIdentity).toBe(false);
    expect(property.data.edfiOdsRelational.odsIsIdentityDatabaseType).toBe(false);
    expect(property.data.edfiOdsRelational.odsIsUniqueIndex).toBe(true);
  });

  it('should add usi property', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    const property: any = domainEntity.data.edfiOdsRelational.odsProperties.find(x => x.metaEdName === 'USI');
    expect(property).toBeDefined();
    expect(property.metaEdName).toBe('USI');
    expect(property.roleName).toBe(integerProperty.roleName);
    expect(property.shortenTo).toBe(integerProperty.shortenTo);
    expect(property.documentation).toBe(integerProperty.documentation);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.parentEntityName).toBe(integerProperty.parentEntityName);
    expect(property.parentEntity).toBe(integerProperty.parentEntity);
    expect(property.data.edfiOdsRelational.odsName).toBe(`${integerProperty.roleName}USI`);
    expect(property.data.edfiOdsRelational.odsIsCollection).toBe(false);
    expect(property.data.edfiOdsRelational.odsContextPrefix).toBe(integerProperty.shortenTo);
    expect(property.data.edfiOdsRelational.odsIsIdentityDatabaseType).toBe(true);
    expect(property.data.edfiOdsRelational.odsIsUniqueIndex).toBe(false);
    expect(domainEntity.data.edfiOdsRelational.odsProperties).toContain(property);
    expect(domainEntity.data.edfiOdsRelational.odsIdentityProperties).toContain(property);
  });
});

describe('when enhancing entity with non unique id property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'UniqueID',
      namespace,
      roleName: 'roleNameName',
      shortenTo: 'ShortenToName',
      documentation: 'IntegerPropertyDocumentation',
      isPartOfIdentity: true,
      data: {
        edfiOdsRelational: {
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsProperties: [integerProperty],
          odsIdentityProperties: [integerProperty],
        },
      },
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should not remove property', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOdsRelational.odsProperties).toContain(integerProperty);
    expect(domainEntity.data.edfiOdsRelational.odsIdentityProperties).toContain(integerProperty);
  });

  it('should not add additional properties', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOdsRelational.odsProperties).toHaveLength(1);
    expect(domainEntity.data.edfiOdsRelational.odsIdentityProperties).toHaveLength(1);
  });
});

describe('when enhancing entity with unique id property in extension namespace', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const domainEntityName = 'DomainEntityName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'UniqueID',
      roleName: 'roleNameName',
      shortenTo: 'ShortenToName',
      documentation: 'IntegerPropertyDocumentation',
      isPartOfIdentity: true,
      data: {
        edfiOdsRelational: {
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace: extensionNamespace,
      data: {
        edfiOdsRelational: {
          odsProperties: [integerProperty],
          odsIdentityProperties: [integerProperty],
        },
      },
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should not remove property', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOdsRelational.odsProperties).toContain(integerProperty);
    expect(domainEntity.data.edfiOdsRelational.odsIdentityProperties).toContain(integerProperty);
  });

  it('should not add additional properties', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOdsRelational.odsProperties).toHaveLength(1);
    expect(domainEntity.data.edfiOdsRelational.odsIdentityProperties).toHaveLength(1);
  });
});
