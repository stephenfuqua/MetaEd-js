// @flow
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import DomainEntitySubclassBuilder from '../../../../../src/core/builder/DomainEntitySubclassBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/DomainEntityProperty/DomainEntityPropertyMustMatchADomainEntity';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when domain entity property has identifier of domain entity', () => {
  const repository: Repository = repositoryFactory();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], repository.property));

    failures = validate(repository, repository.property);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity property has identifier of domain entity subclass', () => {
  const repository: Repository = repositoryFactory();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntitySubclass(entityName, 'BaseDomainEntity')
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndDomainEntitySubclass()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], repository.property))
      .sendToListener(new DomainEntitySubclassBuilder(repository.entity, [], repository.property));

    failures = validate(repository, repository.property);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity property has invalid identifier', () => {
  const repository: Repository = repositoryFactory();
  const domainEntityName: string = 'DomainEntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withDomainEntityProperty('UndefinedEntityName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], repository.property));

    failures = validate(repository, repository.property);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
  });

  it('should have validation failure for property', () => {
    expect(failures[0].validatorName).toBe('DomainEntityPropertyMustMatchADomainEntity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when domain entity property has invalid identifier should have validation failures for each property -> message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when domain entity property has invalid identifier should have validation failures for each property -> sourceMap');
  });
});
