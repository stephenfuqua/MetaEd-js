// @flow
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/DomainEntity/DomainEntityMustContainNoMoreThanOneUniqueIdColumn';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when validating domain entity with no UniqueId fields', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringIdentity('Property1', 'doc', '100')
      .withStringProperty('Property2', 'doc', true, false, '50')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when validating domain entity with one UniqueId field', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringIdentity('UniqueId', 'doc', '100', 'Student')
      .withStringProperty('Property', 'doc', true, false, '50')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating domain entity with two UniqueId fields', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringIdentity('UniqueId', 'doc', '100', null, 'Student')
      .withStringIdentity('UniqueId', 'doc', '100', null, 'Staff')
      .withStringProperty('Property', 'doc', true, false, '50')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DomainEntityMustContainNoMoreThanOneUniqueIdColumn');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating domain entity with two UniqueId fields -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating domain entity with two UniqueId fields -> sourceMap');
  });
});

describe('when validating domain entity with two UniqueId fields in extension namespace', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringIdentity('UniqueId', 'doc', '100', null, 'Student')
      .withStringIdentity('UniqueId', 'doc', '100', null, 'Staff')
      .withStringProperty('Property', 'doc', true, false, '50')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});
