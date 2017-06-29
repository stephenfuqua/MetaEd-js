// @noflow
import CommonBuilder from '../../../src/core/builder/CommonBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../src/core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building common in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(false);
  });

  it('should have entity documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.common.get(entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });
});

describe('when building duplicate commons', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndCommon()

      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate commons should have validation failures for each entity -> Common 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate commons should have validation failures for each entity -> Common 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate commons should have validation failures for each entity -> Common 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate commons should have validation failures for each entity -> Common 2 sourceMap');
  });
});

describe('when building inline common in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartInlineCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndInlineCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(true);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.common.get(entityName).properties[0];

    expect(property.metaEdName).toBe(propertyName);
    expect(property.type).toBe('integer');
    expect(property.metaEdId).toBe(propertyMetaEdId);
    expect(property.isRequired).toBe(true);
    expect(property.documentation).toBe(propertyDocumentation);
  });
});

describe('when building common with no common name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
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
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build common', () => {
    expect(metaEd.entity.common.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building common with lowercase common name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
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
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build common', () => {
    expect(metaEd.entity.common.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building common with no documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
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
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(false);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe('');
  });

  it('should have one property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.common.get(entityName).properties[0];

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

describe('when building common with no property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(false);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have no property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building common with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
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
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withTrailingText(trailingText)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(false);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.common.get(entityName).properties[0];

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

describe('when building inline common with no inline common name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const entityMetaEdId: string = '1';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInlineCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndInlineCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build inline common', () => {
    expect(metaEd.entity.common.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building inline common with lowercase inline common name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const entityMetaEdId: string = '1';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInlineCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndInlineCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one inline common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(metaEd.entity.common.get('Name')).toBeDefined();
    expect(metaEd.entity.common.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get('Name').metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get('Name').inlineInOds).toBe(true);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.common.get('Name').documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.common.get('Name').properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.common.get('Name').properties[0];

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

describe('when building inline common with no documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
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
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInlineCommon(entityName, entityMetaEdId)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndInlineCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one inline common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(true);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe('');
  });

  it('should have one property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.common.get(entityName).properties[0];

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

describe('when building inline common with no property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInlineCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one inline common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(true);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have no property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building inline common with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
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
    const builder = new CommonBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInlineCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withTrailingText(trailingText)
      .withEndInlineCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one inline common', () => {
    expect(metaEd.entity.common.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.common.get(entityName)).toBeDefined();
    expect(metaEd.entity.common.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.common.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.common.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be inlined in ODS', () => {
    expect(metaEd.entity.common.get(entityName).inlineInOds).toBe(true);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.common.get(entityName).documentation).toBe(entityDocumentation);
  });

  it('should have one property', () => {
    expect(metaEd.entity.common.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const property = metaEd.entity.common.get(entityName).properties[0];

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

describe('when building common source map', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have a documentation property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have a metaEdId property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have a metaEdName property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have a type property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have source map data', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap).toMatchSnapshot();
  });
});

describe('when building inline common source map', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new CommonBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartInlineCommon(entityName, entityMetaEdId)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, null, null, null, propertyMetaEdId)
      .withEndInlineCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have a documentation property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have a metaEdId property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have a metaEdName property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have a type property', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have source map data', () => {
    expect(metaEd.entity.common.get(entityName).sourceMap).toMatchSnapshot();
  });
});
