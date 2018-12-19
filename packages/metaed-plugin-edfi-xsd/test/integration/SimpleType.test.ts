import {
  MetaEdEnvironment,
  DecimalTypeBuilder,
  DomainEntityBuilder,
  DomainEntityExtensionBuilder,
  IntegerTypeBuilder,
  MetaEdTextBuilder,
  NamespaceBuilder,
  newMetaEdEnvironment,
  SharedStringBuilder,
  StringTypeBuilder,
} from 'metaed-core';
import { enhanceAndGenerate, xpathSelect, initializeNamespaceDependencies } from './IntegrationTestHelper';

describe('when generating xsd for domain entity in extension namespace with a simple type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity = 'CoreEntity';
  const coreEntityPk = 'CoreEntityPk';

  const extensionEntity = 'ExtensionEntity';
  const extensionEntityPk = 'ExtensionEntityPk';
  const extensionEntityString = 'ExtensionEntityString';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const stringTypeBuilder = new StringTypeBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')
      .withStartDomainEntity(coreEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(coreEntityPk, 'doc')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartDomainEntity(extensionEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(extensionEntityPk, 'doc')
      .withStringProperty(extensionEntityString, 'doc', true, false, '10')
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(stringTypeBuilder)
      .sendToListener(domainEntityBuilder);

    initializeNamespaceDependencies(metaEd, 'edfi', 'extension');
    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity string property', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='ExtensionEntityString'][@type='EXTENSION-ExtensionEntityString']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate extension string type', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='EXTENSION-ExtensionEntityString']", extensionResult);
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for common string', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const simpleTypeEntity = 'SimpleTypeEntity';

  let coreResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const stringTypeBuilder = new StringTypeBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartSharedString(simpleTypeEntity)
      .withDocumentation('doc')
      .withMinLength('10')
      .withMaxLength('100')
      .withEndSharedString()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(stringTypeBuilder)
      .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate simple type entity', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='SimpleTypeEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate correct type annotation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:appinfo/ann:TypeGroup",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct documentation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:documentation",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate restriction of corrext xsd base type', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:string']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct min length', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:string']/xs:minLength[@value='10']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct max length', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:string']/xs:maxLength[@value='100']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for common decimal', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const simpleTypeEntity = 'SimpleTypeEntity';

  let coreResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const decimalTypeBuilder = new DecimalTypeBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartSharedDecimal(simpleTypeEntity)
      .withDocumentation('doc')
      .withTotalDigits('5')
      .withDecimalPlaces('4')
      .withMinValue('10')
      .withMaxValue('100')
      .withEndSharedDecimal()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(decimalTypeBuilder)
      .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate simple type entity', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='SimpleTypeEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate correct type annotation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:appinfo/ann:TypeGroup",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct documentation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:documentation",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate restriction of correct xsd base type', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:decimal']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate restriction of correct total digits', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:decimal']/xs:totalDigits[@value='5']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate restriction of correct decimal places', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:decimal']/xs:fractionDigits[@value='4']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct min value', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:decimal']/xs:minInclusive[@value='10']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct max value', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:decimal']/xs:maxInclusive[@value='100']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for common integer', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const simpleTypeEntity = 'SimpleTypeEntity';

  let coreResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const integerTypeBuilder = new IntegerTypeBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartSharedInteger(simpleTypeEntity)
      .withDocumentation('doc')
      .withMinValue('10')
      .withMaxValue('100')
      .withEndSharedInteger()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(integerTypeBuilder)
      .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate simple type entity', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='SimpleTypeEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate correct type annotation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:appinfo/ann:TypeGroup",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct documentation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:documentation",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate restriction of correct xsd base type', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:int']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct min value', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:int']/xs:minInclusive[@value='10']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct max value', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:int']/xs:maxInclusive[@value='100']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for common short', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const simpleTypeEntity = 'SimpleTypeEntity';

  let coreResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const integerTypeBuilder = new IntegerTypeBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartSharedShort(simpleTypeEntity)
      .withDocumentation('doc')
      .withMinValue('10')
      .withMaxValue('100')
      .withEndSharedShort()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(integerTypeBuilder)
      .sendToListener(domainEntityBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate simple type entity', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='SimpleTypeEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate correct type annotation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:appinfo/ann:TypeGroup",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct documentation', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:annotation/xs:documentation",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate restriction of correct xsd base type', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:short']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct min value', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:short']/xs:minInclusive[@value='10']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate correct max value', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType[@name='SimpleTypeEntity']/xs:restriction[@base='xs:short']/xs:maxInclusive[@value='100']",
      coreResult,
    );
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for shared simpel property in extension namespace with reference to core simple common type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreSharedString = 'CoreSharedString';
  const extensionEntity = 'ExtensionEntity';
  const coreEntityPk = 'CoreEntityPk';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const stringTypeBuilder = new StringTypeBuilder(metaEd, []);
    const sharedStringBuilder = new SharedStringBuilder(metaEd, []);

    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartSharedString(coreSharedString)
      .withDocumentation('doc')
      .withMaxLength('20')
      .withEndSharedString()

      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')

      .withStartDomainEntity(extensionEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(coreEntityPk, 'doc')
      .withSharedStringProperty(coreSharedString, coreSharedString, 'doc', true, false)

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(stringTypeBuilder)
      .sendToListener(sharedStringBuilder)
      .sendToListener(domainEntityBuilder);

    initializeNamespaceDependencies(metaEd, 'edfi', 'extension');
    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core shared string', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='CoreSharedString']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core shared type', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='CoreSharedString'][@type='CoreSharedString']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for renamed shared simple property in extension namespace with reference to core simple common type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreSharedString = 'CoreSharedString';
  const extensionEntity = 'ExtensionEntity';
  const coreEntityPk = 'CoreEntityPk';
  const differentName = 'DifferentName';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const stringTypeBuilder = new StringTypeBuilder(metaEd, []);
    const sharedStringBuilder = new SharedStringBuilder(metaEd, []);

    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartSharedString(coreSharedString)
      .withDocumentation('doc')
      .withMaxLength('20')
      .withEndSharedString()

      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')

      .withStartDomainEntity(extensionEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(coreEntityPk, 'doc')
      .withSharedStringProperty(coreSharedString, differentName, 'doc', true, false)

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(stringTypeBuilder)
      .sendToListener(sharedStringBuilder)
      .sendToListener(domainEntityBuilder);

    initializeNamespaceDependencies(metaEd, 'edfi', 'extension');
    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core shared string', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='CoreSharedString']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core shared type', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='DifferentName'][@type='CoreSharedString']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for shared simple property in extension namespace with reference to extension simple common type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreSharedString = 'CoreSharedString';
  const extensionEntity = 'ExtensionEntity';
  const coreEntityPk = 'CoreEntityPk';
  const dummy = 'Dummy';

  let extensionResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityExtensionBuilder = new DomainEntityExtensionBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const stringTypeBuilder = new StringTypeBuilder(metaEd, []);
    const sharedStringBuilder = new SharedStringBuilder(metaEd, []);

    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartSharedString(dummy)
      .withDocumentation('doc')
      .withMaxLength('1')
      .withEndSharedString()

      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')

      .withStartDomainEntity(extensionEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(coreEntityPk, 'doc')
      .withSharedStringProperty(coreSharedString, coreSharedString, 'doc', true, false)
      .withEndDomainEntity()

      .withStartSharedString(coreSharedString)
      .withDocumentation('doc')
      .withMaxLength('20')
      .withEndSharedString()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(stringTypeBuilder)
      .sendToListener(sharedStringBuilder)
      .sendToListener(domainEntityBuilder)
      .sendToListener(domainEntityExtensionBuilder);

    initializeNamespaceDependencies(metaEd, 'edfi', 'extension');
    ({ extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate extension shared string', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='EXTENSION-CoreSharedString']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core shared type', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='CoreSharedString'][@type='EXTENSION-CoreSharedString']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });
});
