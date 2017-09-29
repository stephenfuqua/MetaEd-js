// @flow
import xmlParser from 'xml-js';
import type { MetaEdEnvironment } from '../../../metaed-core/index';
import { newMetaEdEnvironment, MetaEdTextBuilder, DomainEntityBuilder, AssociationBuilder, AssociationExtensionBuilder, NamespaceInfoBuilder } from '../../../metaed-core/index';
import initializeUnifiedPlugin from './GetUnifiedPlugin';
import initializeXsdPlugin from '../../src/edfiXsd';
import { generate } from '../../src/generator/XsdGenerator';

describe('when generating xsd for association extension in extension namespace based on core association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';
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
    coreResult = xmlParser.xml2js(generatorResult[0].resultString);
    extensionResult = xmlParser.xml2js(generatorResult[1].resultString);
  });

  it('should do something', () => {
    const xsSchema = coreResult.elements[1];

    const schemaDocumentationAnnotation = xsSchema.elements[1];
    expect(schemaDocumentationAnnotation.name).toBe('xs:annotation');
    expect(schemaDocumentationAnnotation.elements[0].name).toBe('xs:documentation');
  });

  it('should do something in extension', () => {
    const xsSchema = extensionResult.elements[1];

    const schemaDocumentationAnnotation = xsSchema.elements[1];
    expect(schemaDocumentationAnnotation.name).toBe('xs:annotation');
    expect(schemaDocumentationAnnotation.elements[0].name).toBe('xs:documentation');
  });
});
