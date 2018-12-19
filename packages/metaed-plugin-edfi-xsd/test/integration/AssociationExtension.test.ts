import {
  MetaEdEnvironment,
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  DomainEntityBuilder,
  AssociationBuilder,
  AssociationExtensionBuilder,
  NamespaceBuilder,
} from 'metaed-core';
import { xpathSelect, enhanceAndGenerate, initializeNamespaceDependencies } from './IntegrationTestHelper';

describe('when generating xsd for association extension in extension namespace based on core association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const namespaceName = 'extension';
  const projectExtension = 'EXTENSION';
  const coreEntity1 = 'CoreEntity1';
  const coreEntity1Pk = 'CoreEntity1Pk';
  const coreEntity2 = 'CoreEntity2';
  const coreEntity2Pk = 'CoreEntity2Pk';
  const coreAssociation = 'CoreAssociation';
  const extensionProperty = 'ExtensionProperty';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const associationBuilder = new AssociationBuilder(metaEd, []);
    const associationExtensionBuilder = new AssociationExtensionBuilder(metaEd, []);
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')

      .withStartDomainEntity(coreEntity1)
      .withDocumentation('doc')
      .withIntegerIdentity(coreEntity1Pk, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity(coreEntity2)
      .withDocumentation('doc')
      .withIntegerIdentity(coreEntity2Pk, 'doc')
      .withEndDomainEntity()

      .withStartAssociation(coreAssociation)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty(coreEntity1, 'doc')
      .withAssociationDomainEntityProperty(coreEntity2, 'doc')
      .withEndAssociation()

      .withEndNamespace()
      .withBeginNamespace(namespaceName, projectExtension)

      .withStartAssociationExtension(coreAssociation)
      .withIntegerProperty(extensionProperty, 'doc', true, false)
      .withEndAssociationExtension()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(domainEntityBuilder)
      .sendToListener(associationBuilder)
      .sendToListener(associationExtensionBuilder);

    initializeNamespaceDependencies(metaEd, 'edfi', namespaceName);
    ({ coreResult, extensionResult } = await enhanceAndGenerate(metaEd));
  });

  it('should generate core domain entity1', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity1']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate core domain entity2', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreEntity2']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate core association', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='CoreAssociation']", coreResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension association', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-CoreAssociationExtension']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension association as extending core association', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-CoreAssociationExtension']/xs:complexContent/xs:extension[@base='CoreAssociation']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });

  it('should generate extension association new property', () => {
    const elements = xpathSelect(
      "/xs:schema/xs:complexType[@name='EXTENSION-CoreAssociationExtension']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='ExtensionProperty']",
      extensionResult,
    );
    expect(elements).toHaveLength(1);
  });
});
