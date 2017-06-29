// @noflow
import DescriptorBuilder from '../../../../../src/core/builder/DescriptorBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/Descriptor/DescriptorMapTypeItemsMustBeUnique';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when map type enumeration items have different short descriptions', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDescriptor('EntityName')
      .withDocumentation('EntityDocumentation')
      .withStartMapType()
      .withDocumentation('MapTypeDocumentation')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation2')
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new DescriptorBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one descriptor', () => {
    expect(repository.entity.descriptor.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when map type enumeration items have duplicate short descriptions', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDescriptor('EntityName')
      .withDocumentation('EntityDocumentation')
      .withStartMapType()
      .withDocumentation('MapTypeDocumentation')
      .withEnumerationItem('ShortDescription', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription', 'EnumerationItemDocumentation2')
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new DescriptorBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one descriptor', () => {
    expect(repository.entity.descriptor.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DescriptorMapTypeItemsMustBeUnique');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when map type enumeration items have duplicate short descriptions should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when map type enumeration items have duplicate short descriptions should have validation failure -> sourceMap');
  });
});

describe('when map type enumeration items have multiple duplicate short descriptions', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDescriptor('EntityName')
      .withDocumentation('EntityDocumentation')
      .withStartMapType()
      .withDocumentation('MapTypeDocumentation')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation2')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation2')
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new DescriptorBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one descriptor', () => {
    expect(repository.entity.descriptor.size).toBe(1);
  });

  it('should have multiple validation failure', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('DescriptorMapTypeItemsMustBeUnique');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when map type enumeration items have multiple duplicate short descriptions should have validation failure-> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when map type enumeration items have multiple duplicate short descriptions should have validation failure-> sourceMap');
    expect(failures[1].validatorName).toBe('DescriptorMapTypeItemsMustBeUnique');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot('when map type enumeration items have multiple duplicate short descriptions should have validation failure-> message');
    expect(failures[1].sourceMap).toMatchSnapshot('when map type enumeration items have multiple duplicate short descriptions should have validation failure-> sourceMap');
  });
});
