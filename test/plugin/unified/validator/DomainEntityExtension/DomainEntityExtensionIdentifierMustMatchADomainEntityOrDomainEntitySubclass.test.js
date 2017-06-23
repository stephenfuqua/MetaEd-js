// @flow
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import DomainEntityExtensionBuilder from '../../../../../src/core/builder/DomainEntityExtensionBuilder';
import DomainEntitySubclassBuilder from '../../../../../src/core/builder/DomainEntitySubclassBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/DomainEntityExtension/DomainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when domain entity extension extends domain entity', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartDomainEntityExtension(entityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new DomainEntityExtensionBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity extension', () => {
    expect(repository.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity extension extends domain entity subclass', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  const subclassName: string = 'SubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(subclassName, entityName)
      .withDocumentation('because documentation is required')
      .withBooleanProperty('Property1', 'because a property is required', true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartDomainEntityExtension(subclassName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new DomainEntityExtensionBuilder(repository.entity, [], new Map()))
      .sendToListener(new DomainEntitySubclassBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity extension', () => {
    expect(repository.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity extension extends an invalid identifier', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartDomainEntityExtension(entityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new DomainEntityExtensionBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity extension', () => {
    expect(repository.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DomainEntityExtensionIdentifierMustMatchAnDomainEntityOrDomainEntitySubclass');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when domain entity extension extends an invalid identifier should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when domain entity extension extends an invalid identifier should have validation failure -> sourceMap');
  });
});
