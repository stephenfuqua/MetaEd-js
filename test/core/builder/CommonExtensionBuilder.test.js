// @noflow
import CommonExtensionBuilder from '../../../src/core/builder/CommonExtensionBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building common extension in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommonExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common extension', () => {
    expect(entityRepository.commonExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.commonExtension.get(entityName)).toBeDefined();
    expect(entityRepository.commonExtension.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have extendee name', () => {
    expect(entityRepository.commonExtension.get(entityName).baseEntityName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.commonExtension.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.commonExtension.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have one property', () => {
    expect(entityRepository.commonExtension.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = entityRepository.commonExtension.get(entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building multiple common extensions', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommonExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndCommonExtension()

      .withStartCommonExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common extension', () => {
    expect(entityRepository.commonExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.commonExtension.get(entityName)).toBeDefined();
    expect(entityRepository.commonExtension.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  xit('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('CommonExtensionBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate common extensions should have validation failures for each entity -> Common Extension 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate common extensions should have validation failures for each entity -> Common 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('CommonExtensionBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate common extensions should have validation failures for each entity -> Common Extension 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate common extensions should have validation failures for each entity -> Common 2 sourceMap');
  });
});

describe('when building common extension with missing common extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommonExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building common extension with lowercase common extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommonExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building common extension with missing property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommonExtension(entityName, '1')
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building common extension with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommonExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withTrailingText(trailingText)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
