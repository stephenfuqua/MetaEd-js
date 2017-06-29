// @flow
import DomainBuilder from '../../../../../src/core/builder/DomainBuilder';
import DescriptorBuilder from '../../../../../src/core/builder/DescriptorBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/Domain/DescriptorDomainItemMustMatchTopLevelEntity';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when validating descriptor domain item matches top level entity', () => {
  const repository: Repository = repositoryFactory();
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
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new DescriptorBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating descriptor domain item does not match top level entity', () => {
  const repository: Repository = repositoryFactory();
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
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new DescriptorBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have one validation failure()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DescriptorDomainItemMustMatchTopLevelEntity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when descriptor domain item has no matching top level entity should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when descriptor domain item has no matching top level entity should have validation failure -> sourceMap');
  });
});

