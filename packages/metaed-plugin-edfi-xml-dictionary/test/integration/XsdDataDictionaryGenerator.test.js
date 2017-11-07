// @flow
import type { MetaEdEnvironment } from '../../../metaed-core/index';
import { generate } from '../../src/generator/XmlDataDictionaryGenerator';
import { newMetaEdEnvironment, MetaEdTextBuilder, NamespaceInfoBuilder, DomainEntityBuilder, EnumerationBuilder } from '../../../metaed-core/index';
import { enhanceAndGenerateXsdForTests } from './IntegrationTestHelper';

describe('when generating xsd for domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const sampleDomainEntity: string = 'SampleDomainEntity';
  const property1: string = 'Property1';
  const property2: string = 'Property2';
  const enumerationName: string = 'EnumerationName';

  let results;

  beforeAll(() => {
    const namespaceInfoBuilder = new NamespaceInfoBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const enumerationBuilder = new EnumerationBuilder(metaEd, []);
    MetaEdTextBuilder.build()

    .withBeginNamespace('edfi')

    .withStartDomainEntity(sampleDomainEntity)
    .withDocumentation('doc')
    .withIntegerIdentity(property1, 'doc')
    .withStringProperty(property2, 'doc', true, false, '0', '100')
    .withEndDomainEntity()

    .withStartEnumeration(enumerationName)
    .withDocumentation('doc')
    .withEnumerationItem('EnumerationItem1')
    .withEnumerationItem('EnumerationItem2')
    .withEnumerationItem('EnumerationItem3')
    .withEndEnumeration()

    .withEndNamespace()

    .sendToListener(namespaceInfoBuilder)
    .sendToListener(enumerationBuilder)
    .sendToListener(domainEntityBuilder);

    enhanceAndGenerateXsdForTests(metaEd);
    results = generate(metaEd);
  });

  it('should generate excel sheet', () => {
    expect(results).toBeDefined();
  });
});
