// @flow
import type { MetaEdEnvironment } from 'metaed-core';
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  NamespaceBuilder,
  DescriptorBuilder,
  DomainEntityBuilder,
} from 'metaed-core';
import { xpathSelect, enhanceAndGenerate } from './IntegrationTestHelper';

describe('when generating xsd for descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const descriptorProperty: string = 'CoreProperty';

  let coreResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const descriptorBuilder = new DescriptorBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartDescriptor(coreEntity)
      .withDocumentation('doc')
      .withIntegerProperty(descriptorProperty, 'doc', true, false)
      .withEndDescriptor()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(descriptorBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate descriptor', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntityDescriptor']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate descriptor reference', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntityDescriptorReferenceType']", coreResult);
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for domain entity in extension namespace with reference to core descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const descriptorProperty: string = 'CoreProperty';
  const extentionNamespace: string = 'extension';
  const extension: string = 'EXTENSION';
  const extensionEntity: string = 'ExtensionEntity';
  const extensionEntityPk: string = 'ExtensionEntityPk';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const descriptorBuilder = new DescriptorBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartDescriptor(coreEntity)
      .withDocumentation('doc')
      .withIntegerProperty(descriptorProperty, 'doc', true, false)
      .withEndDescriptor()

      .withEndNamespace()
      .withBeginNamespace(extentionNamespace, extension)

      .withStartDomainEntity(extensionEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(extensionEntityPk, 'doc')
      .withDescriptorProperty(coreEntity, 'doc', true, false)
      .withEndDomainEntity()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(domainEntityBuilder)
      .sendToListener(descriptorBuilder);

    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core descriptor', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntityDescriptor']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate core domain entity reference', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntityDescriptorReferenceType']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core entity', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='CoreEntity'][@type='CoreEntityDescriptorReferenceType']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for domain entity in extension namespace with reference to extension descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const coreDescriptorProperty: string = 'CoreDescriptorProperty';
  const extentionNamespace: string = 'extension';
  const extension: string = 'EXTENSION';
  const extensionEntity: string = 'ExtensionEntity';
  const extensionEntityPk: string = 'ExtensionEntityPk';
  const extentionDescriptorProperty: string = 'Extention Descriptor Property';

  let extensionResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const descriptorBuilder = new DescriptorBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartDescriptor(coreEntity)
      .withDocumentation('doc')
      .withIntegerProperty(coreDescriptorProperty, 'doc', true, false)
      .withEndDescriptor()

      .withEndNamespace()
      .withBeginNamespace(extentionNamespace, extension)

      .withStartDomainEntity(extensionEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(extensionEntityPk, 'doc')
      .withDescriptorProperty(extensionEntity, 'doc', true, false)
      .withEndDomainEntity()

      .withStartDescriptor(extensionEntity)
      .withDocumentation('doc')
      .withIntegerProperty(extentionDescriptorProperty, 'doc', true, false)
      .withEndDescriptor()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(domainEntityBuilder)
      .sendToListener(descriptorBuilder);

    ({ extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate extension descriptor', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntityDescriptor']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to extension descriptor', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core entity', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='ExtensionEntity'][@type='EXTENSION-ExtensionEntityDescriptorReferenceType']/xs:annotation/xs:appinfo/ann:Descriptor",
      extensionResult,
    );
    expect(elements[0].childNodes[0].toString()).toEqual('EXTENSION-ExtensionEntityDescriptor');
  });
});

describe('when generating xsd for descriptor in extension namespace with reference to core entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const coreEntityPk: string = 'CoreEntityPk';
  const extentionNamespace: string = 'extension';
  const extension: string = 'EXTENSION';
  const extensionEntity: string = 'ExtensionEntity';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const descriptorBuilder = new DescriptorBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('edfi')

      .withStartDomainEntity(coreEntity)
      .withDocumentation('doc')
      .withIntegerIdentity(coreEntityPk, 'doc')
      .withEndDomainEntity()

      .withEndNamespace()
      .withBeginNamespace(extentionNamespace, extension)

      .withStartDescriptor(extensionEntity)
      .withDocumentation('doc')
      .withDomainEntityProperty(coreEntity, 'doc', true, false)
      .withStartMapType(true)
      .withDocumentation('doc')
      .withEnumerationItem('DescriptorItem')
      .withEndMapType()
      .withEndDescriptor()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(domainEntityBuilder)
      .sendToListener(descriptorBuilder);

    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension descriptor', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntityDescriptor']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to extension descriptor', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntityDescriptor']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='CoreEntityReference'][@type='CoreEntityReferenceType']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core entity', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntityDescriptor']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='ExtensionEntityMap'][@type='EXTENSION-ExtensionEntityMapType']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core entity', () => {
    const elements = xpathSelect("/xs:schema/xs:simpleType[@name='EXTENSION-ExtensionEntityMapType']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity reference to core entity', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:simpleType/xs:restriction/xs:enumeration[@value='DescriptorItem']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });
});
