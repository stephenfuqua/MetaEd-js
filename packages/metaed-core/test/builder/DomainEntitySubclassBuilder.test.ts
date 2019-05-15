import { DomainEntitySubclassBuilder } from '../../src/builder/DomainEntitySubclassBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getDomainEntitySubclass } from '../TestHelper';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building domain entity subclass in extension namespace', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'BaseEntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
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

  it('should build one domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have base name', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have base namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityNamespaceName).toBe(namespaceName);
  });

  it('should have one property', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building domain entity subclass in extension namespace subclassing core entity', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const coreNamespaceName = 'EdFi';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'BaseEntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntitySubclassBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntitySubclass(entityName, `${coreNamespaceName}.${baseEntityName}`)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have base name', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have base namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityNamespaceName).toBe(coreNamespaceName);
  });
});

describe('when building duplicate domain entity subclasses', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'BaseEntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
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

  it('should build one domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', (): void => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', (): void => {
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

describe('when building domain entity subclass with no domain entity subclass name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const baseEntityName = 'BaseEntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
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

  it('should not build domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase domain entity subclass name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const baseEntityName = 'BaseEntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
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

  it('should not build domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with lowercase based on name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'baseEntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
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

  it('should build one domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no base name', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe('');
  });

  it('should have one property', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no based on name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
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

  it('should build one domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no base name', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe('');
  });

  it('should have documentation', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have one property', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });

  it('should have error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no documentation', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'BaseEntityName';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
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

  it('should build one domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no base name', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have no documentation', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have no property', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with no property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'BaseEntityName';
  const documentation = 'Documentation';
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

  it('should build one domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have base name', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have documentation', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no property', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'BaseEntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const trailingText = '\r\nTrailingText';
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

  it('should build one domain entity subclass', (): void => {
    expect(namespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have base name', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).baseEntityName).toBe(baseEntityName);
  });

  it('should have documentation', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have one property', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const integerProperty = getDomainEntitySubclass(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity subclass source map', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const baseEntityName = 'BaseEntityName';
  const metaEdId = '1';
  const documentation = 'Doc';
  const propertyName = 'PropertyName';
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

  it('should have type', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have baseEntityName', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.baseEntityName).toBeDefined();
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap.baseEntityName.tokenText).toBe(baseEntityName);
  });

  it('should have isAbstract', (): void => {
    expect((getDomainEntitySubclass(namespace.entity, entityName).sourceMap as any).isAbstract).toBeUndefined();
  });

  it('should have line, column, text for each property', (): void => {
    expect(getDomainEntitySubclass(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});
