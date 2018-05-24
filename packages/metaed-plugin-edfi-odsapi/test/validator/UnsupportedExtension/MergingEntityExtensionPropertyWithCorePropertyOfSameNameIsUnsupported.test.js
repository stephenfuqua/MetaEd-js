// @flow
import {
  AssociationBuilder,
  AssociationExtensionBuilder,
  DomainEntityBuilder,
  MetaEdTextBuilder,
  NamespaceBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { initialize as initializeUnifiedPlugin } from 'metaed-plugin-edfi-unified';
import { initializeNamespaceDependencies } from '../ValidationTestHelper';
import { validate } from '../../../src/validator/UnsupportedExtension/MergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported';
import { newPluginEnvironment } from '../../../../metaed-core/src/plugin/PluginEnvironment';

describe('when merging property of an extension entity with a core property of the same name', () => {
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntityName3: string = 'DomainEntityName3';
    const integerPropertyName2: string = 'IntegerPropertyName2';
    const integerPropertyName3: string = 'IntegerPropertyName3';
    const baseEntityName: string = 'BaseEntityName';

    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity('IntegerPropertyName1', 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(baseEntityName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntity(domainEntityName3)
      .withDocumentation('Documentation')
      .withDomainEntityIdentity(domainEntityName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociationExtension(baseEntityName)
      .withDomainEntityProperty(domainEntityName3, 'Documentation', false, false)
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    initializeNamespaceDependencies(metaEd, 'edfi', 'extension');
    initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(metaEd));
    metaEd.plugin.set(
      'edfiOdsApi',
      Object.assign(newPluginEnvironment(), {
        targetTechnologyVersion: '2.0.0',
      }),
    );
    failures = validate(metaEd);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('MergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported');
    expect(failures[0].category).toBe('warning');
    expect(failures[0].message).toMatchSnapshot(
      'when merging property of an extension entity with a core property of the same name should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when merging property of an extension entity with a core property of the same name should have validation failure -> sourceMap',
    );
  });
});

describe('when merging property of an extension entity with a core property of the same name with different context name', () => {
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntityName3: string = 'DomainEntityName3';
    const integerPropertyName2: string = 'IntegerPropertyName2';
    const integerPropertyName3: string = 'IntegerPropertyName3';
    const baseEntityName: string = 'BaseEntityName';

    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity('IntegerPropertyName1', 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(baseEntityName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntity(domainEntityName3)
      .withDocumentation('Documentation')
      .withDomainEntityIdentity(domainEntityName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociationExtension(baseEntityName)
      .withDomainEntityProperty(domainEntityName3, 'Documentation', false, false, false, 'ContextName')
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    initializeNamespaceDependencies(metaEd, 'edfi', 'extension');
    initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(metaEd));
    metaEd.plugin.set(
      'edfiOdsApi',
      Object.assign(newPluginEnvironment(), {
        targetTechnologyVersion: '2.0.0',
      }),
    );
    failures = validate(metaEd);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when merging property of an extension entity with a core property of the same name and same context name', () => {
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const contextName: string = 'ContextName';
    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntityName3: string = 'DomainEntityName3';
    const integerPropertyName2: string = 'IntegerPropertyName2';
    const integerPropertyName3: string = 'IntegerPropertyName3';
    const baseEntityName: string = 'BaseEntityName';

    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity('IntegerPropertyName1', 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(baseEntityName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation', contextName)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntity(domainEntityName3)
      .withDocumentation('Documentation')
      .withDomainEntityIdentity(domainEntityName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociationExtension(baseEntityName)
      .withDomainEntityProperty(domainEntityName3, 'Documentation', false, false, false, contextName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));
    initializeNamespaceDependencies(metaEd, 'edfi', 'extension');
    initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(metaEd));
    metaEd.plugin.set(
      'edfiOdsApi',
      Object.assign(newPluginEnvironment(), {
        targetTechnologyVersion: '2.0.0',
      }),
    );
    failures = validate(metaEd);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('MergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported');
    expect(failures[0].category).toBe('warning');
    expect(failures[0].message).toMatchSnapshot(
      'when merging property of an extension entity with a core property of the same name and same context name should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when merging property of an extension entity with a core property of the same name and same context name should have validation failure -> sourceMap',
    );
  });
});
