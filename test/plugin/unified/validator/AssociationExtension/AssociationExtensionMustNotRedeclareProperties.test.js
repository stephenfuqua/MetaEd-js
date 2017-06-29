// @flow
import AssociationBuilder from '../../../../../src/core/builder/AssociationBuilder';
import AssociationExtensionBuilder from '../../../../../src/core/builder/AssociationExtensionBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/AssociationExtension/AssociationExtensionMustNotRedeclareProperties';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when association extension correctly has different property names', () => {
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

describe('when association extension has duplicate property name', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  const duplicatePropertyName: string = 'DuplicatePropertyName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('DomainEntity1', 'doc')
      .withAssociationDomainEntityProperty('DomainEntity2', 'doc')
      .withBooleanProperty(duplicatePropertyName, 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty(duplicatePropertyName, 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one association extension', () => {
    expect(repository.entity.associationExtension.size).toBe(1);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('AssociationExtensionMustNotRedeclareProperties');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when association extension has duplicate property name should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when association extension has duplicate property name should have validation failure -> sourceMap');
  });
});

describe('when association extension has multiple duplicates', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  const notDuplicatePropertyName: string = 'NotDuplicatePropertyName';
  const duplicatePropertyName1: string = 'DuplicatePropertyName1';
  const duplicatePropertyName2: string = 'DuplicatePropertyName2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('DomainEntity1', 'doc')
      .withAssociationDomainEntityProperty('DomainEntity2', 'doc')
      .withBooleanProperty(duplicatePropertyName1, 'doc', true, false)
      .withBooleanProperty(duplicatePropertyName2, 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty(duplicatePropertyName1, 'doc', true, false)
      .withBooleanProperty(duplicatePropertyName2, 'doc', true, false)
      .withBooleanProperty(notDuplicatePropertyName, 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('AssociationExtensionMustNotRedeclareProperties');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).not.toMatch(new RegExp(notDuplicatePropertyName));
    expect(failures[0].message).toMatchSnapshot('when association extension has multiple duplicates should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when association extension has multiple duplicates should have validation failure -> sourceMap');

    expect(failures[1].validatorName).toBe('AssociationExtensionMustNotRedeclareProperties');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).not.toMatch(new RegExp(notDuplicatePropertyName));
    expect(failures[1].message).toMatchSnapshot('when association extension has multiple duplicates should have validation failure -> message');
    expect(failures[1].sourceMap).toMatchSnapshot('when association extension has multiple duplicates should have validation failure -> sourceMap');
  });
});

describe('when association extension has duplicate common property', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  const duplicatePropertyName: string = 'DuplicatePropertyName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('DomainEntity1', 'doc')
      .withAssociationDomainEntityProperty('DomainEntity2', 'doc')
      .withCommonProperty(duplicatePropertyName, 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(entityName)
      .withCommonProperty(duplicatePropertyName, 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
  });
});

describe('when association extension has duplicate common extension override property', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  const duplicatePropertyName: string = 'DuplicatePropertyName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('DomainEntity1', 'doc')
      .withAssociationDomainEntityProperty('DomainEntity2', 'doc')
      .withCommonProperty(duplicatePropertyName, 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(entityName)
      .withCommonExtensionOverrideProperty(duplicatePropertyName, 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});
