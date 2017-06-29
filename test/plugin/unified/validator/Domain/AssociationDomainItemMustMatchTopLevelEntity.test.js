// @flow
import DomainBuilder from '../../../../../src/core/builder/DomainBuilder';
import AssociationBuilder from '../../../../../src/core/builder/AssociationBuilder';
import AssociationSubclassBuilder from '../../../../../src/core/builder/AssociationSubclassBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/Domain/AssociationDomainItemMustMatchTopLevelEntity';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when validating association domain item matches top level entity', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const associationName: string = 'AssociationName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withAssociationDomainItem(associationName)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartAssociation(associationName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating association domain item matches top level entity subclass', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const associationName = 'AssociationName';
  const associationSubclassName: string = 'AssociationSubclassName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withAssociationDomainItem(associationSubclassName)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartAssociation(associationName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociation()

      .withStartAssociationSubclass(associationSubclassName, associationName)
      .withDocumentation('doc')
      .withBooleanProperty('Property1', 'because a property is required', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property))
      .sendToListener(new AssociationSubclassBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating association domain item does not match top level entity', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const associationName: string = 'AssociationName';
  const associationSubclassName: string = 'AssociationSubclassName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withAssociationDomainItem('AssociationDomainItemName')
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartAssociation(associationName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociation()

      .withStartAssociationSubclass(associationSubclassName, associationName)
      .withDocumentation('doc')
      .withBooleanProperty('Property1', 'because a property is required', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new AssociationBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have one validation failure()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('AssociationDomainItemMustMatchTopLevelEntity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when association domain item has no matching top level entity should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when association domain item has no matching top level entity should have validation failure -> sourceMap');
  });
});

