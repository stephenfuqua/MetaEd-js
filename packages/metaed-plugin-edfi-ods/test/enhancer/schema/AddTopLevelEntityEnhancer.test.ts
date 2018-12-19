import { newDomainEntity, newIntegerProperty, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { DomainEntity, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/model/TopLevelEntity';
import { NoTable } from '../../../src/model/database/Table';

describe('when enhancing domainEntity with string properties', () => {
  let domainEntity: DomainEntity;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);
    const domainEntityName = 'DomainEntityName';

    domainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should have ods table name', () => {
    expect(domainEntity.data.edfiOds.odsTableName).toBeDefined();
    expect(domainEntity.data.edfiOds.odsTableName).toBe('');
  });

  it('should have ods cascade primary key updates', () => {
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBeDefined();
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(false);
  });

  it('should have ods entity table', () => {
    expect(domainEntity.data.edfiOds.odsEntityTable).toBeDefined();
    expect(domainEntity.data.edfiOds.odsEntityTable).toBe(NoTable);
  });

  it('should have ods tables', () => {
    expect(domainEntity.data.edfiOds.odsTables).toBeDefined();
    expect(domainEntity.data.edfiOds.odsTables).toHaveLength(0);
  });
});

describe('when enhancing domainEntity with string properties', () => {
  let domainEntity: DomainEntity;
  let integerIdentityProperty: IntegerProperty;
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);
    const domainEntityName = 'DomainEntityName';

    integerIdentityProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'integerIdentityPropertyName',
      isPartOfIdentity: true,
    });
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'IntegerPropertyName',
      isPartOfIdentity: false,
    });
    domainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      properties: [integerIdentityProperty, integerProperty],
      identityProperties: [integerIdentityProperty],
    });

    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    enhance(metaEd);
  });

  it('should add identity property to ods identity properties', () => {
    expect(domainEntity.data.edfiOds.odsIdentityProperties.length).toBe(1);
    expect(domainEntity.data.edfiOds.odsIdentityProperties[0]).toBe(integerIdentityProperty);
  });

  it('should add properties to ods properties', () => {
    expect(domainEntity.data.edfiOds.odsProperties.length).toBe(2);
    expect(domainEntity.data.edfiOds.odsProperties[0]).toBe(integerIdentityProperty);
    expect(domainEntity.data.edfiOds.odsProperties[1]).toBe(integerProperty);
  });
});
