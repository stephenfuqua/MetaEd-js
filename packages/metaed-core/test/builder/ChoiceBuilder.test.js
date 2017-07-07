// @noflow
import { ChoiceBuilder } from '../../src/builder/ChoiceBuilder';
import { MetaEdTextBuilder } from '../MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building choice in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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
    const builder = new ChoiceBuilder(metaEd, validationFailures);

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
    expect(metaEd.entity.choice.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.choice.get(entityName)).toBeDefined();
    expect(metaEd.entity.choice.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.choice.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.choice.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.choice.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.choice.get(entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });
});

describe('when building duplicate choices', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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
    const builder = new ChoiceBuilder(metaEd, validationFailures);

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
    expect(metaEd.entity.choice.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.choice.get(entityName)).toBeDefined();
    expect(metaEd.entity.choice.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate choices should have validation failures for each entity -> Choice 2 sourceMap');
  });
});

describe('when building choice with no choice name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build choice', () => {
    expect(metaEd.entity.choice.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with lowercase choice name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one choice', () => {
    expect(metaEd.entity.choice.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(metaEd.entity.choice.get('Name')).toBeDefined();
    expect(metaEd.entity.choice.get('Name').metaEdName).toBe('Name');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.choice.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.choice.get('Name').metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.choice.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.choice.get('Name').documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.choice.get('Name').properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.choice.get('Name').properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.choice.get(entityName)).toBeDefined();
    expect(metaEd.entity.choice.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.choice.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(metaEd.entity.choice.get(entityName).documentation).toBe('');
  });

  it('should have one property', () => {
    expect(metaEd.entity.choice.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.choice.get(entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with no property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.choice.get(entityName)).toBeDefined();
    expect(metaEd.entity.choice.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.choice.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.choice.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have no property', () => {
    expect(metaEd.entity.choice.get(entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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
    const builder = new ChoiceBuilder(metaEd, validationFailures);

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

  it('should be found in entity repository', () => {
    expect(metaEd.entity.choice.get(entityName)).toBeDefined();
    expect(metaEd.entity.choice.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.choice.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.choice.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(metaEd.entity.choice.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.choice.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.choice.get(entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building choice source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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
    const builder = new ChoiceBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartChoice(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndChoice()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have a documentation property', () => {
    expect(metaEd.entity.choice.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have a metaEdId property', () => {
    expect(metaEd.entity.choice.get(entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have a metaEdName property', () => {
    expect(metaEd.entity.choice.get(entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have a type property', () => {
    expect(metaEd.entity.choice.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have source map data', () => {
    expect(metaEd.entity.choice.get(entityName).sourceMap).toMatchSnapshot();
  });
});
