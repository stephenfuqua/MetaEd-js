import { ChoiceBuilder } from '../../src/builder/ChoiceBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getChoice } from '../TestHelper';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building choice in extension namespace', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const propertyName = 'PropertyName';
  const propertyMetaEdId = '2';
  const propertyDocumentation = 'PropertyDocumentation';
  const entityDocumentation = 'EntityDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one choice', (): void => {
    expect(namespace.entity.choice.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getChoice(namespace.entity, entityName)).toBeDefined();
    expect(getChoice(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getChoice(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', (): void => {
    expect(getChoice(namespace.entity, entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', (): void => {
    expect(getChoice(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const property = getChoice(namespace.entity, entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });
});

describe('when building duplicate choices', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const propertyName = 'PropertyName';
  const propertyMetaEdId = '2';
  const propertyDocumentation = 'PropertyDocumentation';
  const entityDocumentation = 'EntityDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()

      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one choice', (): void => {
    expect(namespace.entity.choice.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getChoice(namespace.entity, entityName)).toBeDefined();
    expect(getChoice(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', (): void => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', (): void => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate choices should have validation failures for each entity -> Choice 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate choices should have validation failures for each entity -> Choice 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate choices should have validation failures for each entity -> Choice 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate choices should have validation failures for each entity -> Choice 2 sourceMap',
    );
  });
});

describe('when building choice with no choice name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const entityMetaEdId = '1';
  const entityDocumentation = 'EntityDocumentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const propertyMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build choice', (): void => {
    expect(namespace.entity.choice.size).toBe(0);
  });

  it('should have missing id error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with lowercase choice name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const entityMetaEdId = '1';
  const entityDocumentation = 'EntityDocumentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const propertyMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build no choice', (): void => {
    expect(namespace.entity.choice.size).toBe(0);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with no documentation', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const propertyMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should be found in entity repository', (): void => {
    expect(getChoice(namespace.entity, entityName)).toBeDefined();
    expect(getChoice(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getChoice(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', (): void => {
    expect(getChoice(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have one property', (): void => {
    expect(getChoice(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const property = getChoice(namespace.entity, entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with no property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const entityDocumentation = 'EntityDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should be found in entity repository', (): void => {
    expect(getChoice(namespace.entity, entityName)).toBeDefined();
    expect(getChoice(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getChoice(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', (): void => {
    expect(getChoice(namespace.entity, entityName).documentation).toBe(entityDocumentation);
  });

  it('should have no property', (): void => {
    expect(getChoice(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const entityDocumentation = 'EntityDocumentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const propertyMetaEdId = '2';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withTrailingText(trailingText)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should be found in entity repository', (): void => {
    expect(getChoice(namespace.entity, entityName)).toBeDefined();
    expect(getChoice(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getChoice(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getChoice(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', (): void => {
    expect(getChoice(namespace.entity, entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', (): void => {
    expect(getChoice(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const property = getChoice(namespace.entity, entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice source map', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const propertyName = 'PropertyName';
  const propertyMetaEdId = '2';
  const propertyDocumentation = 'PropertyDocumentation';
  const entityDocumentation = 'EntityDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have a documentation property', (): void => {
    expect(getChoice(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have a metaEdId property', (): void => {
    expect(getChoice(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have a metaEdName property', (): void => {
    expect(getChoice(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have a type property', (): void => {
    expect(getChoice(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have source map data', (): void => {
    expect(getChoice(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});
