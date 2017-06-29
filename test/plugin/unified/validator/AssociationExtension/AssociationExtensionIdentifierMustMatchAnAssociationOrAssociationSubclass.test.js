// @flow
import AssociationBuilder from '../../../../../src/core/builder/AssociationBuilder';
import AssociationExtensionBuilder from '../../../../../src/core/builder/AssociationExtensionBuilder';
import AssociationSubclassBuilder from '../../../../../src/core/builder/AssociationSubclassBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/AssociationExtension/AssociationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when association extension extends association', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('DomainEntity1', 'doc')
      .withAssociationDomainEntityProperty('DomainEntity2', 'doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one association extension', () => {
    expect(repository.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when association extension extends association subclass', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  const subclassName: string = 'SubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('DomainEntity1', 'doc')
      .withAssociationDomainEntityProperty('DomainEntity2', 'doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociation()

      .withStartAssociationSubclass(subclassName, entityName)
      .withDocumentation('because documentation is required')
      .withBooleanProperty('Property1', 'because a property is required', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(subclassName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationSubclassBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one association extension', () => {
    expect(repository.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when association extension extends an invalid identifier', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one association extension', () => {
    expect(repository.entity.associationExtension.size).toBe(1);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('AssociationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when association extension extends an invalid identifier should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when association extension extends an invalid identifier should have validation failure -> sourceMap');
  });
});
