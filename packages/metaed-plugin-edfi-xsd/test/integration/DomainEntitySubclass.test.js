// @flow
import type { MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, MetaEdTextBuilder, NamespaceInfoBuilder, DomainEntityBuilder, DomainEntitySubclassBuilder } from 'metaed-core';
import { xpathSelect, enhanceAndGenerate } from './IntegrationTestHelper';

describe('when generating xsd for descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreEntity: string = 'CoreEntity';
  const coreEntityPk: string = 'CoreEntityPk';
  const extensionEntity: string = 'ExtensionEntity';
  const extensionEntityProperty: string = 'ExtensionEntityProperty';
  const extensionNamespace: string = 'EXTENSION';
  const extension: string = 'Extension';

  let coreResult;
  let extensionResult;

  beforeAll(async () => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const domainEntitySubclassBuilder = new DomainEntitySubclassBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartDomainEntity(coreEntity)
    .withDocumentation('doc')
    .withIntegerIdentity(coreEntityPk, 'doc')
    .withEndDomainEntity()

    .withEndNamespace()

    .withBeginNamespace(extensionNamespace, extension)

    .withStartDomainEntitySubclass(extensionEntity, coreEntity)
    .withIntegerProperty(extensionEntityProperty, 'doc', true, false)
    .withEndDomainEntitySubclass()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(domainEntityBuilder)
    .sendToListener(domainEntitySubclassBuilder);

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

  it('should generate extension domain entity as extending core entity', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-ExtensionEntity']/xs:complexContent/xs:extension[@base='CoreEntity']", extensionResult);
    expect(elements).toHaveLength(1);
  });
});
