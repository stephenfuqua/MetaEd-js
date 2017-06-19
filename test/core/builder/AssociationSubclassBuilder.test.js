// @noflow
import AssociationSubclassBuilder from '../../../src/core/builder/AssociationSubclassBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building association subclass in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one association subclass', () => {
    expect(entityRepository.associationSubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.associationSubclass.get(entityName)).toBeDefined();
    expect(entityRepository.associationSubclass.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.associationSubclass.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.associationSubclass.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct base name', () => {
    expect(entityRepository.associationSubclass.get(entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have one property', () => {
    expect(entityRepository.associationSubclass.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = entityRepository.associationSubclass.get(entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building duplicate association subclasses', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()

      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one association subclass', () => {
    expect(entityRepository.associationSubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.associationSubclass.get(entityName)).toBeDefined();
    expect(entityRepository.associationSubclass.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  xit('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('AssociationSubclassBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate association subclasses should have validation failures for each entity -> Association 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate association subclasses should have validation failures for each entity -> Association 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('AssociationSubclassBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate association subclasses should have validation failures for each entity -> Association 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate association subclasses should have validation failures for each entity -> Association 2 sourceMap');
  });
});

describe('when building association subclass with missing association subclass name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association subclass with lowercase association subclass name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association subclass with missing based on name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = '';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association subclass with lowercase based on name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'baseEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association subclass with missing documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association subclass with missing property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const baseEntityName: string = 'BaseEntityName';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association subclass with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';
  const trailingText: string = 'TrailingText';

  beforeAll(() => {
    const builder = new AssociationSubclassBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociationSubclass(entityName, baseEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withTrailingText(trailingText)
      .withEndAssociationSubclass()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
