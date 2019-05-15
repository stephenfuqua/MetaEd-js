import { DomainEntityExtensionBuilder } from '../../src/builder/DomainEntityExtensionBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getDomainEntityExtension } from '../TestHelper';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building domain entity extension in extension namespace', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity extension', (): void => {
    expect(namespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntityExtension(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have extendee name', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).baseEntityName).toBe(entityName);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have base entity namespace', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).baseEntityNamespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have one property', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const integerProperty = getDomainEntityExtension(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });
});

describe('when building domain entity extension in extension namespace extending core entity', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const coreNamespaceName = 'EdFi';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(`${coreNamespaceName}.${entityName}`, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });
  it('should have extendee name', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).baseEntityName).toBe(entityName);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have base entity namespace', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).baseEntityNamespaceName).toBe(coreNamespaceName);
  });
});

describe('when building duplicate domain entity extensions', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDomainEntityExtension()

      .withStartDomainEntityExtension(entityName, '1')
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity extension', (): void => {
    expect(namespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntityExtension(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', (): void => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', (): void => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate domain entity extensions should have validation failures for each entity -> DEX 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate domain entity extensions should have validation failures for each entity -> DEX 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate domain entity extensions should have validation failures for each entity -> DEX 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate domain entity extensions should have validation failures for each entity -> DEX 2 sourceMap',
    );
  });
});

describe('when building domain entity extension with no domain entity extension name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const MetaEdId = '10';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withIntegerProperty(propertyName, documentation, true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build domain entity extension', (): void => {
    expect(namespace.entity.domainEntityExtension.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity extension with lowercase domain entity extension name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const MetaEdId = '10';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withIntegerProperty(propertyName, documentation, true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build domain entity extension', (): void => {
    expect(namespace.entity.domainEntityExtension.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity extension with no property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const MetaEdId = '10';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one domain entity extension', (): void => {
    expect(namespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntityExtension(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have extendee name', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).baseEntityName).toBe(entityName);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no property', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity extension with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const MetaEdId = '10';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(entityName, MetaEdId)
      .withIntegerProperty(propertyName, documentation, true, false)
      .withTrailingText(trailingText)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });
  it('should build one domain entity extension', (): void => {
    expect(namespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName)).toBeDefined();
    expect(getDomainEntityExtension(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have extendee name', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).baseEntityName).toBe(entityName);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have one property', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', (): void => {
    const integerProperty = getDomainEntityExtension(namespace.entity, entityName).properties[0];

    expect(integerProperty.metaEdName).toBe(propertyName);
    expect(integerProperty.type).toBe('integer');
    expect(integerProperty.isRequired).toBe(true);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity extension source map', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '10';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityExtensionBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntityExtension(entityName, metaEdId)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have type property', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have metaEdName', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have baseEntityName', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap.baseEntityName).toBeDefined();
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap.baseEntityName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have correct line, column, text', (): void => {
    expect(getDomainEntityExtension(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});
