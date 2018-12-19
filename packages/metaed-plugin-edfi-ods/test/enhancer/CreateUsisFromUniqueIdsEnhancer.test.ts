import { newDomainEntity, newIntegerProperty, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { DomainEntity, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/CreateUsisFromUniqueIdsEnhancer';

describe('when enhancing entity with unique id property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'UniqueId',
      namespace,
      withContext: 'WithContextName',
      shortenTo: 'ShortenToName',
      documentation: 'IntegerPropertyDocumentation',
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [integerProperty],
          odsIdentityProperties: [integerProperty],
        },
      },
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should remove unique id property', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOds.odsProperties).not.toContain(integerProperty);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).not.toContain(integerProperty);
  });

  it('should add unique id copy as not part of identity', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    const property: any = domainEntity.data.edfiOds.odsProperties.find(x => x.metaEdName === integerProperty.metaEdName);
    expect(property).toBeDefined();
    expect(property.metaEdName).toBe(integerProperty.metaEdName);
    expect(property.withContext).toBe(integerProperty.withContext);
    expect(property.shortenTo).toBe(integerProperty.shortenTo);
    expect(property.documentation).toBe(integerProperty.documentation);
    expect(property.isPartOfIdentity).toBe(false);
    expect(property.data.edfiOds.odsIsIdentityDatabaseType).toBe(false);
    expect(property.data.edfiOds.odsIsUniqueIndex).toBe(true);
  });

  it('should add usi property', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    const property: any = domainEntity.data.edfiOds.odsProperties.find(x => x.metaEdName === 'USI');
    expect(property).toBeDefined();
    expect(property.metaEdName).toBe('USI');
    expect(property.withContext).toBe(integerProperty.withContext);
    expect(property.shortenTo).toBe(integerProperty.shortenTo);
    expect(property.documentation).toBe(integerProperty.documentation);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.parentEntityName).toBe(integerProperty.parentEntityName);
    expect(property.parentEntity).toBe(integerProperty.parentEntity);
    expect(property.data.edfiOds.odsName).toBe(`${integerProperty.withContext}USI`);
    expect(property.data.edfiOds.odsIsCollection).toBe(false);
    expect(property.data.edfiOds.odsContextPrefix).toBe(integerProperty.shortenTo);
    expect(property.data.edfiOds.odsIsIdentityDatabaseType).toBe(true);
    expect(property.data.edfiOds.odsIsUniqueIndex).toBe(false);
    expect(domainEntity.data.edfiOds.odsProperties).toContain(property);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toContain(property);
  });
});

describe('when enhancing entity with non unique id property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'UniqueID',
      namespace,
      withContext: 'WithContextName',
      shortenTo: 'ShortenToName',
      documentation: 'IntegerPropertyDocumentation',
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [integerProperty],
          odsIdentityProperties: [integerProperty],
        },
      },
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should not remove property', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOds.odsProperties).toContain(integerProperty);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toContain(integerProperty);
  });

  it('should not add additional properties', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOds.odsProperties).toHaveLength(1);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toHaveLength(1);
  });
});

describe('when enhancing entity with unique id property in extension namespace', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const domainEntityName = 'DomainEntityName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'UniqueID',
      withContext: 'WithContextName',
      shortenTo: 'ShortenToName',
      documentation: 'IntegerPropertyDocumentation',
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
        },
      },
    });

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          odsProperties: [integerProperty],
          odsIdentityProperties: [integerProperty],
        },
      },
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should not remove property', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOds.odsProperties).toContain(integerProperty);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toContain(integerProperty);
  });

  it('should not add additional properties', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName);
    expect(domainEntity.data.edfiOds.odsProperties).toHaveLength(1);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toHaveLength(1);
  });
});
