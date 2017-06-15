// @noflow
import AssociationExtensionBuilder from '../../../src/core/builder/AssociationExtensionBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building association extension in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationExtensionBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one association extension', () => {
    expect(entityRepository.associationExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.associationExtension.get(entityName)).toBeDefined();
    expect(entityRepository.associationExtension.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have extendee name', () => {
    expect(entityRepository.associationExtension.get(entityName).baseEntityName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.associationExtension.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.associationExtension.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have one property', () => {
    expect(entityRepository.associationExtension.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = entityRepository.associationExtension.get(entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building association extension with missing association extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association extension with lowercase association extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association extension with missing property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';

  beforeAll(() => {
    const builder = new AssociationExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationExtension(entityName, '1')
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association extension with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new AssociationExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withTrailingText(trailingText)
      .withEndAssociationExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extranous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
