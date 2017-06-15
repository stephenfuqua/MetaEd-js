// @noflow
import DomainEntityExtensionBuilder from '../../../src/core/builder/DomainEntityExtensionBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building domain entity extension in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntityExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain entity extension', () => {
    expect(entityRepository.domainEntityExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.domainEntityExtension.get(entityName)).toBeDefined();
    expect(entityRepository.domainEntityExtension.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have extendee name', () => {
    expect(entityRepository.domainEntityExtension.get(entityName).baseEntityName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.domainEntityExtension.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.domainEntityExtension.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have one property', () => {
    expect(entityRepository.domainEntityExtension.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = entityRepository.domainEntityExtension.get(entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building domain entity extension with missing domain entity extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const MetaEdId: string = '10';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withIntegerProperty(propertyName, documentation, true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});


describe('when building domain entity extension with missing domain entity extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const MetaEdId: string = '10';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withIntegerProperty(propertyName, documentation, true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity extension with lowercase domain entity extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const MetaEdId: string = '10';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withIntegerProperty(propertyName, documentation, true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity extension with missing property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const MetaEdId: string = '10';

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity extension with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const MetaEdId: string = '10';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withIntegerProperty(propertyName, documentation, true, false)
      .withTrailingText(trailingText)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
