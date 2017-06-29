// @flow
import CommonBuilder from '../../../../../src/core/builder/CommonBuilder';
import CommonExtensionBuilder from '../../../../../src/core/builder/CommonExtensionBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/CommonExtension/CommonExtensionMustNotRedeclareProperties';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when common extension correctly has different property names', () => {
  const repository: Repository = repositoryFactory();
  const commonName: string = 'CommonName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(commonName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(new CommonBuilder(repository.entity, [], repository.property))
      .sendToListener(new CommonExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one common extension', () => {
    expect(repository.entity.commonExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when common extension has duplicate property name', () => {
  const repository: Repository = repositoryFactory();
  const commonName: string = 'CommonName';
  const duplicatePropertyName: string = 'DuplicatePropertyName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(commonName)
      .withDocumentation('doc')
      .withBooleanProperty(duplicatePropertyName, 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName)
      .withBooleanProperty(duplicatePropertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(new CommonBuilder(repository.entity, [], repository.property))
      .sendToListener(new CommonExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should build one common extension', () => {
    expect(repository.entity.commonExtension.size).toBe(1);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('CommonExtensionMustNotRedeclareProperties');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when common extension has duplicate property name should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when common extension has duplicate property name should have validation failure -> sourceMap');
  });
});

describe('when common extension has multiple duplicates', () => {
  const repository: Repository = repositoryFactory();
  const commonName: string = 'CommonName';
  const notDuplicatePropertyName: string = 'NotDuplicatePropertyName';
  const duplicatePropertyName1: string = 'DuplicatePropertyName1';
  const duplicatePropertyName2: string = 'DuplicatePropertyName2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(commonName)
      .withDocumentation('doc')
      .withBooleanProperty(duplicatePropertyName1, 'doc', true, false)
      .withBooleanProperty(duplicatePropertyName2, 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName)
      .withBooleanProperty(duplicatePropertyName1, 'doc', true, false)
      .withBooleanProperty(duplicatePropertyName2, 'doc', true, false)
      .withBooleanProperty(notDuplicatePropertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(new CommonBuilder(repository.entity, [], repository.property))
      .sendToListener(new CommonExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('CommonExtensionMustNotRedeclareProperties');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).not.toMatch(new RegExp(notDuplicatePropertyName));
    expect(failures[0].message).toMatchSnapshot('when common extension has multiple duplicates should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when common extension has multiple duplicates should have validation failure -> sourceMap');

    expect(failures[1].validatorName).toBe('CommonExtensionMustNotRedeclareProperties');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).not.toMatch(new RegExp(notDuplicatePropertyName));
    expect(failures[1].message).toMatchSnapshot('when common extension has multiple duplicates should have validation failure -> message');
    expect(failures[1].sourceMap).toMatchSnapshot('when common extension has multiple duplicates should have validation failure -> sourceMap');
  });
});

describe('when common extension has duplicate common property', () => {
  const repository: Repository = repositoryFactory();
  const commonName: string = 'CommonName';
  const duplicatePropertyName: string = 'DuplicatePropertyName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(commonName)
      .withDocumentation('doc')
      .withCommonProperty(duplicatePropertyName, 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName)
      .withCommonProperty(duplicatePropertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(new CommonBuilder(repository.entity, [], repository.property))
      .sendToListener(new CommonExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('CommonExtensionMustNotRedeclareProperties');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when common extension has duplicate common property should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when common extension has duplicate common property should have validation failure -> sourceMap');
  });
});

describe('when common extension has duplicate common extension override property', () => {
  const repository: Repository = repositoryFactory();
  const commonName: string = 'CommonName';
  const duplicatePropertyName: string = 'DuplicatePropertyName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(commonName)
      .withDocumentation('doc')
      .withCommonProperty(duplicatePropertyName, 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName)
      .withCommonExtensionOverrideProperty(duplicatePropertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(new CommonBuilder(repository.entity, [], repository.property))
      .sendToListener(new CommonExtensionBuilder(repository.entity, [], repository.property));

    failures = validate(repository);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

