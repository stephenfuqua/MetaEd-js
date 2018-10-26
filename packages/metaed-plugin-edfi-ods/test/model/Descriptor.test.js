// @flow
import {
  DescriptorBuilder,
  DomainEntityBuilder,
  MetaEdTextBuilder,
  NamespaceBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { initialize as initializeUnifiedPlugin } from 'metaed-plugin-edfi-unified';
import { initialize as initializeOdsPlugin } from '../../index';

describe('when descriptor is required property of domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const extensionNamespace: string = 'extension';
  const descriptorName: string = 'DescriptorName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity('DummyCoreEntity')
      .withDocumentation('doc')
      .withIntegerIdentity('DummyCoreInteger', 'doc')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace(extensionNamespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('doc')
      .withEndDescriptor()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(integerPropertyName, 'doc')
      .withDescriptorProperty(descriptorName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []));

    metaEd.dataStandardVersion = '3.0.0';
    initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(metaEd));
    initializeOdsPlugin().enhancer.forEach(enhance => enhance(metaEd));
  });

  it('should not crash', () => {
    expect(true).toBe(true);
  });
});
