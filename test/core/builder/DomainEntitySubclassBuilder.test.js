// @noflow
import DomainEntitySubclassBuilder from '../../../src/core/builder/DomainEntitySubclassBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building domain entity subclass in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
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

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have base name', () => {
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

describe('when building duplicate domain entity subclasses', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()

      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
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

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate domain entity subclasses should have validation failures for each entity -> DES 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate domain entity subclasses should have validation failures for each entity -> DES 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate domain entity subclasses should have validation failures for each entity -> DES 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate domain entity subclasses should have validation failures for each entity -> DES 2 sourceMap');
  });
});

describe('when building domain entity subclass with no domain entity subclass name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build domain entity subclass', () => {
    expect(entityRepository.domainEntitySubclass.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase domain entity subclass name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build domain entity subclass', () => {
    expect(entityRepository.domainEntitySubclass.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase based on name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'baseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
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

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have base name but with lowercase prefix ignored', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).baseEntityName).toBe('EntityName');
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

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no based on name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, '')
      .withDocumentation(documentation)
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

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no base name', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).baseEntityName).toBe('');
  });

  it('should have documentation', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).documentation).toBe(documentation);
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

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
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

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no base name', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have no documentation', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).documentation).toBe('');
  });

  it('should have no property', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
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

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have base name', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have documentation', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).documentation).toBe(documentation);
  });

  it('should have no property', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withTrailingText(trailingText)
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

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have base name', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have documentation', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).documentation).toBe(documentation);
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

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass source map', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName, metaEdId)
      .withDocumentation(documentation)
      .withCascadeUpdate()
      .withIntegerProperty(propertyName, 'Doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have type', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.metaEdName).toBeDefined();
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.metaEdId).toBeDefined();
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have namespaceInfo', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.namespaceInfo).toBeDefined();
  });

  it('should have baseEntity', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.baseEntity).toBeDefined();
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.baseEntity.tokenText).toBe(baseEntityName);
  });

  it('should have baseEntityName', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.baseEntityName).toBeDefined();
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.baseEntityName.tokenText).toBe(baseEntityName);
  });

  it('should have isAbstract', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap.isAbstract).toBeUndefined();
  });

  it('should have line, column, text for each property', () => {
    expect(entityRepository.domainEntitySubclass.get(entityName).sourceMap).toMatchSnapshot();
  });
});
