// @flow
import DomainBuilder from '../../../../../src/core/builder/DomainBuilder';
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import DomainEntitySubclassBuilder from '../../../../../src/core/builder/DomainEntitySubclassBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/Domain/DomainEntityDomainItemMustMatchTopLevelEntity';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when validating domain entity domain item matches top level entity', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const domainEntityName: string = 'DomainEntityName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem(domainEntityName)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating domain entity domain item matches top level entity subclass', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const domainEntityName = 'DomainEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem(domainEntitySubclassName)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, domainEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('Property1', 'because a property is required', true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new DomainEntitySubclassBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating domain entity domain item does not match top level entity', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainEntityDomainItemName')
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, domainEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('Property1', 'because a property is required', true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have one validation failure()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DomainEntityDomainItemMustMatchTopLevelEntity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when domain entity domain item has no matching top level entity should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when domain entity domain item has no matching top level entity should have validation failure -> sourceMap');
  });
});
