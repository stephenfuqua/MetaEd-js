// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  AssociationBuilder,
  AssociationExtensionBuilder,
  AssociationSubclassBuilder,
  CommonBuilder,
  CommonExtensionBuilder,
  DomainEntityBuilder,
  DomainEntityExtensionBuilder,
  DomainEntitySubclassBuilder,
  NamespaceBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/CommonProperty/CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality';

describe('when validating common property does not have extension override', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon('EntityName1')
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartDomainEntity('EntityName2')
      .withDocumentation('EntityDocumentation')
      .withCommonIdentity('PropertyName2', 'PropertyDocumentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating common property has extension override on non domain entity or association extensions', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName1';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartDomainEntity('EntityName2')
      .withDocumentation('EntityDocumentation')
      .withCommonExtensionOverrideProperty(entityName, 'PropertyDocumentation', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures[0].validatorName).toBe(
      'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
    );
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when validating common property has extension override on domain entity extension without include on extendee', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartDomainEntity(entityName2)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName2', 'PropertyDocumentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntityExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should build one domain entity extension', () => {
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures[0].validatorName).toBe(
      'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
    );
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when validating common property has extension override on association extension without include on extendee', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartAssociation(entityName2)
      .withDocumentation('EntityDocumentation')
      .withAssociationDomainEntityProperty('PropertyName2', 'PropertyDocumentation')
      .withAssociationDomainEntityProperty('PropertyName3', 'PropertyDocumentation')
      .withBooleanProperty('PropertyName4', 'PropertyDocumentation', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one association', () => {
    expect(coreNamespace.entity.association.size).toBe(1);
  });

  it('should build one association extension', () => {
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures[0].validatorName).toBe(
      'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
    );
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when validating common property has extension override on domain entity extension with include on extendee and matching cardinality', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartDomainEntity(entityName2)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName2', 'PropertyDocumentation', true, false)
      .withCommonProperty(entityName1, 'doc', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntityExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should build one domain entity extension', () => {
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating common property has extension override on domain entity extension of subclass with include on extendee and matching cardinality', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartDomainEntity(entityName2)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName2', 'PropertyDocumentation', true, false)
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, entityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentityRename('DummyName1', 'DummyName2', 'Documentation')
      .withCommonProperty(entityName1, 'doc', true, true)
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntityExtension(domainEntitySubclassName)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should build one domain entity subclass', () => {
    expect(coreNamespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should build one domain entity extension', () => {
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating common property has extension override on association extension with include on extendee and matching cardinality', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartAssociation(entityName2)
      .withDocumentation('EntityDocumentation')
      .withAssociationDomainEntityProperty('PropertyName2', 'PropertyDocumentation')
      .withAssociationDomainEntityProperty('PropertyName3', 'PropertyDocumentation')
      .withBooleanProperty('PropertyName4', 'PropertyDocumentation', true, false)
      .withCommonProperty(entityName1, 'doc', true, true)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one association', () => {
    expect(coreNamespace.entity.association.size).toBe(1);
  });

  it('should build one association extension', () => {
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating common property has extension override on association extension of subclass with include on extendee and matching cardinality', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  const associationSubclassName: string = 'AssociationSubclassName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartAssociation(entityName2)
      .withDocumentation('EntityDocumentation')
      .withAssociationDomainEntityProperty('PropertyName2', 'PropertyDocumentation')
      .withAssociationDomainEntityProperty('PropertyName3', 'PropertyDocumentation')
      .withBooleanProperty('PropertyName4', 'PropertyDocumentation', true, false)
      .withEndAssociation()

      .withStartAssociationSubclass(associationSubclassName, entityName2)
      .withDocumentation('doc')
      .withIntegerProperty('PropertyNameX', 'doc', true, false)
      .withCommonProperty(entityName1, 'doc', true, true)
      .withEndAssociationSubclass()

      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationExtension(associationSubclassName)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one association', () => {
    expect(coreNamespace.entity.association.size).toBe(1);
  });

  it('should build one association subclass', () => {
    expect(coreNamespace.entity.associationSubclass.size).toBe(1);
  });

  it('should build one association extension', () => {
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating common property has extension override on domain entity extension with include on extendee not matching collection cardinality', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartDomainEntity(entityName2)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName2', 'PropertyDocumentation', true, false)
      .withCommonProperty(entityName1, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntityExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should build one domain entity extension', () => {
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe(
      'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
    );
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when validating common property has extension override on association extension with include on extendee not matching collection cardinality', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartAssociation(entityName2)
      .withDocumentation('EntityDocumentation')
      .withAssociationDomainEntityProperty('PropertyName2', 'PropertyDocumentation')
      .withAssociationDomainEntityProperty('PropertyName3', 'PropertyDocumentation')
      .withBooleanProperty('PropertyName4', 'PropertyDocumentation', true, false)
      .withCommonProperty(entityName1, 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one association', () => {
    expect(coreNamespace.entity.association.size).toBe(1);
  });

  it('should build one association extension', () => {
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe(
      'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
    );
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when validating common property has extension override on domain entity extension with include on extendee not matching nullablility', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartDomainEntity(entityName2)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName2', 'PropertyDocumentation', true, false)
      .withCommonProperty(entityName1, 'doc', false, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntityExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should build one domain entity extension', () => {
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe(
      'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
    );
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when validating common property has extension override on association extension with include on extendee not matching nullablility', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName1: string = 'EntityName1';
  const entityName2: string = 'EntityName2';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName1)
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName1', 'PropertyDocumentation', true, false)
      .withEndCommon()

      .withStartAssociation(entityName2)
      .withDocumentation('EntityDocumentation')
      .withAssociationDomainEntityProperty('PropertyName2', 'PropertyDocumentation')
      .withAssociationDomainEntityProperty('PropertyName3', 'PropertyDocumentation')
      .withBooleanProperty('PropertyName4', 'PropertyDocumentation', true, false)
      .withCommonProperty(entityName1, 'doc', false, true)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationExtension(entityName2)
      .withCommonExtensionOverrideProperty(entityName1, 'PropertyDocumentation', true, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one association', () => {
    expect(coreNamespace.entity.association.size).toBe(1);
  });

  it('should build one association extension', () => {
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe(
      'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
    );
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});
