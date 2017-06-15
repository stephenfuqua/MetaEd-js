// @noflow
import DomainEntityBuilder from '../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { repositoryFactory } from '../../../src/core/model/Repository';
import type { Repository } from '../../../src/core/model/Repository';
import { validate } from '../../../src/core/validator/DomainEntityMustContainAnIdentity';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when validating domain entity with identity fields', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc1')
      .withStringIdentity('Property1', 'doc2', 100)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when validating domain entity with no identity fields', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc1')
      .withStringProperty('Property1', 'doc2', true, false, 100)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures.length).toBe(1);
    expect(failures[0].validatorName).toBe('DomainEntityMustContainAnIdentity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('message');
    expect(failures[0].sourceMap).toMatchSnapshot('sourceMap');
  });
});
