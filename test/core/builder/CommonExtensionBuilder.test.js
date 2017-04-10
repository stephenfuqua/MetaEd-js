// @noflow
import CommonExtensionBuilder from '../../../src/core/builder/CommonExtensionBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { repositoryFactory } from '../../../src/core/model/Repository';
import type { Repository } from '../../../src/core/model/Repository';

describe('when building common extension in extension namespace', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommonExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common extension', () => {
    expect(repository.commonExtension.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.commonExtension.get(entityName)).toBeDefined();
    expect(repository.commonExtension.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have extendee name', () => {
    expect(repository.commonExtension.get(entityName).baseEntityName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.commonExtension.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(repository.commonExtension.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have one property', () => {
    expect(repository.commonExtension.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = repository.commonExtension.get(entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building common extension with missing common extension name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(repository);

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
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(repository);

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
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(repository);

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
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new CommonExtensionBuilder(repository);

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
