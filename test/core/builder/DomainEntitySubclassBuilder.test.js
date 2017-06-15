// @noflow
import DomainEntitySubclassBuilder from '../../../src/core/builder/DomainEntitySubclassBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building domain entity subclass in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const Documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(Documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain entity subclass', () => {
    expect(entityRepository.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName)).toBeDefined();
    expect(entityRepository.domainEntitySubclass.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct base name', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have one property', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = entityRepository.domainEntitySubclass.get(entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building domain entity subclass with missing domain entity subclass name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const baseEntityName: string = 'BaseEntityName';
  const Documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(Documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase domain entity subclass name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const baseEntityName: string = 'BaseEntityName';
  const Documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(Documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase based on name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'baseEntityName';
  const Documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(Documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with missing based on name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = '';
  const Documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(Documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with missing documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with missing property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const Documentation: string = 'Doc';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(Documentation)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const Documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(Documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withTrailingText(trailingText)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
