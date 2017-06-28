// @noflow
import EnumerationBuilder from '../../../../../src/core/builder/EnumerationBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/Enumeration/EnumerationItemsMustBeUnique';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when enumeration items have different short descriptions', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartEnumeration('EntityName')
      .withDocumentation('EntityDocumentation')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new EnumerationBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one enumeration', () => {
    expect(repository.entity.enumeration.size).toBe(1);
  });


  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when enumeration items have duplicate short descriptions', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartEnumeration('EntityName')
      .withDocumentation('EntityDocumentation')
      .withEnumerationItem('ShortDescription', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription', 'EnumerationItemDocumentation2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new EnumerationBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one enumeration', () => {
    expect(repository.entity.enumeration.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('EnumerationItemsMustBeUnique');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when enumeration items have duplicate short descriptions should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when enumeration items have duplicate short descriptions should have validation failure -> sourceMap');
  });
});

describe('when enumeration items have multiple duplicate short descriptions', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartEnumeration('EntityName')
      .withDocumentation('EntityDocumentation')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation2')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new EnumerationBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one enumeration', () => {
    expect(repository.entity.enumeration.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('EnumerationItemsMustBeUnique');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when enumeration items have multiple duplicate short descriptions should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when enumeration items have multiple duplicate short descriptions should have validation failure -> sourceMap');
  });
});
