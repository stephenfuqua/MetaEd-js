// @flow
import { DomainEntitySubclassBuilder } from '../../src/builder/DomainEntitySubclassBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getDomainEntitySubclass } from '../TestHelper';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building domain entity subclass in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have base name', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have one property', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building duplicate domain entity subclasses', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()

      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate domain entity subclasses should have validation failures for each entity -> DES 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate domain entity subclasses should have validation failures for each entity -> DES 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate domain entity subclasses should have validation failures for each entity -> DES 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate domain entity subclasses should have validation failures for each entity -> DES 2 sourceMap',
    );
  });
});

describe('when building domain entity subclass with no domain entity subclass name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase domain entity subclass name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase based on name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'baseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have base name but with lowercase prefix ignored', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe('EntityName');
  });

  it('should have one property', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no based on name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, '')
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no base name', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe('');
  });

  it('should have documentation', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no base name', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have no documentation', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have no property', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have base name', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have documentation', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no property', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const trailingText: string = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withTrailingText(trailingText)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity subclass', () => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have base name', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have documentation', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const baseEntityName: string = 'BaseEntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, baseEntityName, metaEdId)
      .withDocumentation(documentation)
      .withCascadeUpdate()
      .withIntegerProperty(propertyName, 'Doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have type', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have baseEntity', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.baseEntity).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.baseEntity.tokenText).toBe(baseEntityName);
  });

  it('should have baseEntityName', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.baseEntityName).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.baseEntityName.tokenText).toBe(baseEntityName);
  });

  it('should have isAbstract', () => {
    // $FlowIgnore - isAbstract could be null
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.isAbstract).toBeUndefined();
  });

  it('should have line, column, text for each property', () => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});
