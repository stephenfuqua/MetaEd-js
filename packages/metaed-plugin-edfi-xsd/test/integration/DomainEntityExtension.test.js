// @flow
import type { MetaEdEnvironment } from 'metaed-core';
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  NamespaceInfoBuilder,
  DomainEntityBuilder,
  DomainEntityExtensionBuilder,
} from 'metaed-core';
import { xpathSelect, enhanceAndGenerate } from './IntegrationTestHelper';

describe('when generating xsd for descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const coreEntityPk: string = 'CoreEntityPk';
  const extensionProperty: string = 'ExtensionProperty';
  const extensionNamespace: string = 'extension';
  const extension: string = 'EXTENSION';

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

      .withStartDomainEntityExtension(coreEntity)
      .withIntegerProperty(extensionProperty, 'doc', true, false)
      .withEndDomainEntityExtension()

      .withEndNamespace()

      .sendToListener(namespaceInfoBuilder)
      .sendToListener(domainEntityBuilder)
      .sendToListener(domainEntityExtensionBuilder);

    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate descriptor', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate descriptor reference', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-CoreEntityExtension']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate descriptor reference', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-CoreEntityExtension']/xs:complexContent/xs:extension[@base='CoreEntity']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate descriptor reference', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-CoreEntityExtension']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='ExtensionProperty']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });
});
