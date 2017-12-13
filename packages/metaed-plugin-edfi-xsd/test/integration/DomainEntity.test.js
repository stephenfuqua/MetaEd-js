// @flow
import type { MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, MetaEdTextBuilder, NamespaceInfoBuilder, DomainEntityBuilder, DomainEntityExtensionBuilder, SharedStringBuilder, StringTypeBuilder } from 'metaed-core';
import { xpathSelect, enhanceAndGenerate } from './IntegrationTestHelper';

describe('when generating xsd for domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const sample: string = 'Sample';
  const property1: string = 'Property1';

  let coreResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartDomainEntity(sample)
    .withDocumentation('doc')
    .withIntegerIdentity(property1, 'doc')
    .withEndDomainEntity()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='Sample']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity reference', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='SampleReferenceType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity identity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='SampleIdentityType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should not generate domain entity lookup', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='SampleLookupType']", coreResult);
    expect(elements).toHaveLength(0);
  });
});

describe('when generating xsd for domain entity with inline common type as part of primary key', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const sample: string = 'Sample';
  const property1: string = 'Property1';
  const foo: string = 'Foo';
  const property2: string = 'Property2';

  let coreResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartDomainEntity(sample)
    .withDocumentation('doc')
    .withIntegerIdentity(property1, 'doc')
    .withInlineCommonProperty(foo, 'doc', true, false)
    .withEndDomainEntity()

    .withStartInlineCommon(foo)
    .withDocumentation('doc')
    .withIntegerIdentity(property2, 'doc')
    .withEndInlineCommon()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='Sample']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity reference', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='SampleReferenceType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity identity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='SampleIdentityType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should include inline common type in identity type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='SampleIdentityType']/xs:sequence/xs:element[@name='Property2']", coreResult);
    expect(elements).toHaveLength(0);
  });
});

describe('when generating xsd for domain entity in extension namespace with reference to core domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const coreEntityPk: string = 'CoreEntityPk';
  const extensionEntity: string = 'ExtensionEntity';
  const extensionEntityPk: string = 'ExtensionEntityPk';

  const extensionNamespace: string = 'EXTENSION';
  const extension: string = 'Extension';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const domainEntityExtensionBuilder = new DomainEntityExtensionBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartDomainEntity(coreEntity)
    .withDocumentation('doc')
    .withIntegerIdentity(coreEntityPk, 'doc')
    .withEndDomainEntity()

    .withEndNamespace()
    .withBeginNamespace(extensionNamespace, extension)

    .withStartDomainEntity(extensionEntity)
    .withDocumentation('doc')
    .withIntegerIdentity(extensionEntityPk, 'doc')
    .withDomainEntityProperty(coreEntity, 'doc', true, false)
    .withEndDomainEntity()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder)
    .sendToListener(domainEntityExtensionBuilder);

    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate core domain entity reference', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntityReferenceType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate core domain entity identity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntityIdentityType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should include core domain entity primary key', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='CoreEntityPk']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate extension domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate extension domain entity reference', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntityReferenceType']", extensionResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate extension domain entity identity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntityIdentityType']", extensionResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate extention domain entity primary key', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='ExtensionEntityPk']", extensionResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate extenion domain entity reference to core entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='CoreEntityReference'][@type='CoreEntityReferenceType']", extensionResult);
    expect(elements).toHaveLength(1);
  });
});
describe('when generating xsd for domain entity with queryable only field', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const assessment: string = 'Assessment';
  const property1: string = 'Property1';
  const foo: string = 'Foo';
  const property2: string = 'Property2';

  let coreResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartDomainEntity(assessment)
    .withDocumentation('doc')
    .withIntegerIdentity(property1, 'doc')
    .withQueryableOnlyDomainEntityProperty(foo, 'doc')
    .withEndDomainEntity()

    .withStartDomainEntity(foo)
    .withDocumentation('doc')
    .withIntegerIdentity(property2, 'doc')
    .withEndDomainEntity()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='Assessment']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity identity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentIdentityType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity lookup', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentLookupType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity lookup in reference type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentReferenceType']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='AssessmentLookup']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity reference in lookup type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentLookupType']/xs:sequence/xs:element[@name='FooReference']", coreResult);
    expect(elements).toHaveLength(1);
  });
});
describe('when generating xsd for domain entity with queryable field', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const assessment: string = 'Assessment';
  const property1: string = 'Property1';
  const foo: string = 'Foo';

  let coreResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartDomainEntity(assessment)
    .withDocumentation('doc')
    .withIntegerIdentity(property1, 'doc')
    .withIntegerProperty(foo, 'doc', true, false)
    .withQueryableFieldPropertyIndicator()
    .withEndDomainEntity()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='Assessment']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity identity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentIdentityType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity lookup', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentLookupType']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate domain entity lookup in reference type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentReferenceType']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='AssessmentLookup']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate field reference in lookup type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='AssessmentLookupType']/xs:sequence/xs:element[@name='Foo']", coreResult);
    expect(elements).toHaveLength(1);
  });
});
describe('when generating xsd for domain entity with queryable field', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const commonStringReference: string = 'CommonStringReference';
  const pkProperty: string = 'PkProperty';
  const sharedProperty: string = 'SharedProperty';
  const sample: string = 'Sample';

  let coreResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const sharedStringBuilder = new SharedStringBuilder(metaEd, []);
    const stringTypeBuilder = new StringTypeBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartSharedString(commonStringReference)
    .withDocumentation('doc')
    .withMinLength('10')
    .withMaxLength('100')
    .withEndSharedString()

    .withStartDomainEntity(sample)
    .withDocumentation('doc')
    .withIntegerIdentity(pkProperty, 'doc')
    .withSharedStringProperty(commonStringReference, sharedProperty, 'doc', true, false)
    .withEndDomainEntity()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder)
    .sendToListener(stringTypeBuilder)
    .sendToListener(sharedStringBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='Sample']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate shared property', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='Sample']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='SharedProperty' and @type='CommonStringReference']", coreResult);
    expect(elements).toHaveLength(1);
  });
  it('should generate correct simple type for common string', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='CommonStringReference']/xs:annotation/xs:appinfo/ann:TypeGroup", coreResult);
    expect(elements).toHaveLength(1);
  });
});
