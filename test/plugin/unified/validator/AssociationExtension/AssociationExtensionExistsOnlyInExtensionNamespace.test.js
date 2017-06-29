// @flow
import AssociationExtensionBuilder from '../../../../../src/core/builder/AssociationExtensionBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/AssociationExtension/AssociationExtensionExistsOnlyInExtensionNamespace';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when association extension is in correct namespace', () => {
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

describe('when association extension is in core namespace', () => {
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

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('AssociationExtensionExistsOnlyInExtensionNamespace');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when association extension is in core namespace should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when association extension is in core namespace should have validation failure -> sourceMap');
  });
});
