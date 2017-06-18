// @noflow
import ChoiceBuilder from '../../../src/core/builder/ChoiceBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building choice in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const propertyName: string = 'PropertyName';
  const propertyMetaEdId: string = '2';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new ChoiceBuilder(entityRepository, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one choice', () => {
    expect(entityRepository.choice.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.choice.get(entityName)).toBeDefined();
    expect(entityRepository.choice.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.choice.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(entityRepository.choice.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.choice.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct entity documentation', () => {
    expect(entityRepository.choice.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(entityRepository.choice.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = entityRepository.choice.get(entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });
});

describe('when building duplicate choices', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const propertyName: string = 'PropertyName';
  const propertyMetaEdId: string = '2';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new ChoiceBuilder(entityRepository, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()

      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one choice', () => {
    expect(entityRepository.choice.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.choice.get(entityName)).toBeDefined();
    expect(entityRepository.choice.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  xit('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('ChoiceBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('ChoiceBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 2 sourceMap');
  });
});

describe('when building choice with missing choice name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new ChoiceBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with lowercase choice name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new ChoiceBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with missing documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new ChoiceBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with missing property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new ChoiceBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new ChoiceBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withTrailingText(trailingText)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
