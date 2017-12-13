// @flow
import type { MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, MetaEdTextBuilder, NamespaceInfoBuilder, CommonBuilder, DomainEntityBuilder, DomainEntityExtensionBuilder } from 'metaed-core';
import { xpathSelect, enhanceAndGenerate } from './IntegrationTestHelper';

describe('when generating xsd for common type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const coreProperty: string = 'CoreProperty';

  let coreResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const commonBuilder = new CommonBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartCommon(coreEntity)
    .withDocumentation('doc')
    .withIntegerProperty(coreProperty, 'doc', false, false)
    .withEndCommon()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(commonBuilder);

    ({ coreResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate common type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate common type property', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType/xs:sequence/xs:element[@name='CoreProperty']", coreResult);
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for domain entity in extension namespace with reference to core common type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const coreEntity: string = 'CoreEntity';
  const coreProperty: string = 'CoreProperty';
  const extensionName: string = 'extension';
  const extension: string = 'EXTENSION';
  const extensionEntity: string = 'ExtensionEntity';
  const extensionEntityPk: string = 'ExtensionEntityPk';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const commonBuilder = new CommonBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const domainEntityExtensionBuilder = new DomainEntityExtensionBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartCommon(coreEntity)
    .withDocumentation('doc')
    .withIntegerProperty(coreProperty, 'doc', true, false)
    .withEndCommon()

    .withEndNamespace()

    .withBeginNamespace(extensionName, extension)

    .withStartDomainEntity(extensionEntity)
    .withDocumentation('doc')
    .withIntegerIdentity(extensionEntityPk, 'doc')
    .withCommonProperty(coreEntity, 'doc', true, false)

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(commonBuilder)
    .sendToListener(domainEntityBuilder)
    .sendToListener(domainEntityExtensionBuilder);

    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core common type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });
});

describe('when generating xsd for common type in extension namespace with reference to core entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const coreEntity: string = 'CoreEntity';
  const coreEntityPk: string = 'CoreEntityPk';
  const extensionName: string = 'extension';
  const extension: string = 'EXTENSION';
  const extensionEntity: string = 'ExtensionEntity';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const commonBuilder = new CommonBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const domainEntityExtensionBuilder = new DomainEntityExtensionBuilder(metaEd, []);

    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartCommon(coreEntity)
    .withDocumentation('doc')
    .withIntegerIdentity(coreEntityPk, 'doc')
    .withEndCommon()

    .withEndNamespace()

    .withBeginNamespace(extensionName, extension)

    .withStartDomainEntity(extensionEntity)
    .withDocumentation('doc')
    .withDomainEntityProperty(coreEntity, 'doc', true, false)
    .withEndDomainEntity()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder)
    .sendToListener(domainEntityExtensionBuilder)
    .sendToListener(commonBuilder);

    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core domain entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension common type', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });
});
