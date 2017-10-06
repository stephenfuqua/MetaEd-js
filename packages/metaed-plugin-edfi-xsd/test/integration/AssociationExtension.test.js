// @flow
import { DOMParser } from 'xmldom';
import xpath from 'xpath';
import type { MetaEdEnvironment } from '../../../metaed-core/index';
import { newMetaEdEnvironment, MetaEdTextBuilder, DomainEntityBuilder, AssociationBuilder, AssociationExtensionBuilder, NamespaceInfoBuilder } from '../../../metaed-core/index';
import initializeUnifiedPlugin from './GetUnifiedPlugin';
import initializeXsdPlugin from '../../src/edfiXsd';
import { generate } from '../../src/generator/XsdGenerator';

const xpathSelect = xpath.useNamespaces({
  xs: 'http://www.w3.org/2001/XMLSchema',
  ann: 'http://ed-fi.org/annotation',
});

describe('when generating xsd for association extension in extension namespace based on core association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const namespace: string = 'extension';
  const projectExtension: string = 'EXTENSION';
  const coreEntity1: string = 'CoreEntity1';
  const coreEntity1Pk: string = 'CoreEntity1Pk';
  const coreEntity2: string = 'CoreEntity2';
  const coreEntity2Pk: string = 'CoreEntity2Pk';
  const coreAssociation: string = 'CoreAssociation';
  const extensionProperty: string = 'ExtensionProperty';

  let coreResult;
  let extensionResult;

  beforeAll(() => {
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const associationBuilder = new AssociationBuilder(metaEd, []);
    const associationExtensionBuilder = new AssociationExtensionBuilder(metaEd, []);
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
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
    .withBeginNamespace(namespace, projectExtension)

    .withStartAssociationExtension(coreAssociation)
    .withIntegerProperty(extensionProperty, 'doc', true, false)
    .withEndAssociationExtension()

    .withEndNamespace()
    .sendToListener(domainEntityBuilder)
    .sendToListener(associationBuilder)
    .sendToListener(associationExtensionBuilder)
    .sendToListener(namespaceInfoBuilder);

    initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(metaEd));
    initializeXsdPlugin().enhancer.forEach(enhance => enhance(metaEd));

    const generatorResult = generate(metaEd).generatedOutput;
    const coreResultString = generatorResult[0].resultString;
    const extensionResultString = generatorResult[1].resultString;
    coreResult = new DOMParser().parseFromString(coreResultString);
    extensionResult = new DOMParser().parseFromString(extensionResultString);
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
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-CoreAssociationExtension']/xs:complexContent/xs:extension[@base='CoreAssociation']", extensionResult);
    expect(elements).toHaveLength(1);
  });

  it('should generate extension association new property', () => {
    const elements = xpathSelect("/xs:schema/xs:complexType[@name='EXTENSION-CoreAssociationExtension']/xs:complexContent/xs:extension/xs:sequence/xs:element[@name='ExtensionProperty']", extensionResult);
    expect(elements).toHaveLength(1);
  });
});
