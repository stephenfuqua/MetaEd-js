// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  NamespaceBuilder,
  DomainEntityBuilder,
  DomainEntityExtensionBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { validate } from '../../../src/validator/AbstractEntity/AbstractEntityMustNotBeExtended';

describe('when validating domain entity additions', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName: string = 'DomainEntityName';
  let coreNamespace: Namespace;
  let extensionNamespace: Namespace;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const coreNamespaceName: string = 'edfi';
    const extensionNamespaceName: string = 'extension';

    MetaEdTextBuilder.build()
      .withBeginNamespace(coreNamespaceName)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName1', 'Documentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace(extensionNamespaceName)
      .withStartDomainEntityExtension(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName2', 'Documentation')
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = (metaEd.namespace.get(coreNamespaceName): any);
    extensionNamespace = (metaEd.namespace.get(extensionNamespaceName): any);
    extensionNamespace.dependencies = [coreNamespace];

    failures = validate(metaEd);
  });

  it('should build domain entity and domain entity extension', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating abstract entity additions', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName: string = 'DomainEntityName';
  let coreNamespace: Namespace;
  let extensionNamespace: Namespace;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const coreNamespaceName: string = 'edfi';
    const extensionNamespaceName: string = 'extension';

    MetaEdTextBuilder.build()
      .withBeginNamespace(coreNamespaceName)
      .withStartAbstractEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName1', 'Documentation')
      .withEndAbstractEntity()
      .withEndNamespace()

      .withBeginNamespace(extensionNamespaceName)
      .withStartDomainEntityExtension(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName2', 'Documentation')
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = (metaEd.namespace.get(coreNamespaceName): any);
    extensionNamespace = (metaEd.namespace.get(extensionNamespaceName): any);
    extensionNamespace.dependencies = [coreNamespace];

    failures = validate(metaEd);
  });

  it('should build abstract entity and domain entity extension', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have one validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures).toMatchSnapshot();
  });
});

describe('when validating abstract entity additions in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName2: string = 'DomainEntityName2';
  let coreNamespace: Namespace;
  let extensionNamespace: Namespace;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const coreNamespaceName: string = 'edfi';
    const extensionNamespaceName: string = 'extension';

    MetaEdTextBuilder.build()
      .withBeginNamespace(coreNamespaceName)
      .withStartAbstractEntity('DomainEntityName1')
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName1', 'Documentation')
      .withEndAbstractEntity()
      .withEndNamespace()

      .withBeginNamespace(extensionNamespaceName)
      .withStartAbstractEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName1', 'Documentation')
      .withEndAbstractEntity()

      .withStartDomainEntityExtension(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName2', 'Documentation')
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = (metaEd.namespace.get(coreNamespaceName): any);
    extensionNamespace = (metaEd.namespace.get(extensionNamespaceName): any);
    extensionNamespace.dependencies = [coreNamespace];

    failures = validate(metaEd);
  });

  it('should build domain entity, abstract entity and domain entity extension', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
    expect(extensionNamespace.entity.domainEntity.size).toBe(1);
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have one validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures).toMatchSnapshot();
  });
});
