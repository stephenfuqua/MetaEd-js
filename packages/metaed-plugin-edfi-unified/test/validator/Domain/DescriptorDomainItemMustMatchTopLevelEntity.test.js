// @flow
import DomainBuilder from '../../../../../packages/metaed-core/src/builder/DomainBuilder';
import DescriptorBuilder from '../../../../../packages/metaed-core/src/builder/DescriptorBuilder';
import MetaEdTextBuilder from '../../../../../packages/metaed-core/test/MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import { validate } from '../../../src/validator/Domain/DescriptorDomainItemMustMatchTopLevelEntity';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

describe('when validating descriptor domain item matches top level entity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainName: string = 'DomainName';
  const descriptorName: string = 'DescriptorName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withDescriptorDomainItem(descriptorName)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartDescriptor(descriptorName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one domain entity', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating descriptor domain item does not match top level entity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainName: string = 'DomainName';
  const descriptorName: string = 'DescriptorName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withDescriptorDomainItem('DescriptorDomainItemName')
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartDescriptor(descriptorName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one domain entity', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should have one validation failure()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DescriptorDomainItemMustMatchTopLevelEntity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when descriptor domain item has no matching top level entity should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when descriptor domain item has no matching top level entity should have validation failure -> sourceMap');
  });
});

