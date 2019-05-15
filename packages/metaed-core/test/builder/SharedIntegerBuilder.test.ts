import { SharedIntegerBuilder } from '../../src/builder/SharedIntegerBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getSharedInteger } from '../TestHelper';
import { SharedIntegerSourceMap } from '../../src/model/SharedInteger';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building shared integer in extension namespace', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared integer', (): void => {
    expect(namespace.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getSharedInteger(namespace.entity, entityName)).toBeDefined();
    expect(getSharedInteger(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(false);
  });
});

describe('when building duplicate shared integers', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()

      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared integer', (): void => {
    expect(namespace.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getSharedInteger(namespace.entity, entityName)).toBeDefined();
    expect(getSharedInteger(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', (): void => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', (): void => {
    expect(validationFailures[0].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate shared integers should have validation failures for each entity -> SI 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate shared integers should have validation failures for each entity -> SI 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate shared integers should have validation failures for each entity -> SI 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate shared integers should have validation failures for each entity -> SI 2 sourceMap',
    );
  });
});

describe('when building shared short in extension namespace', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared short', (): void => {
    expect(namespace.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getSharedInteger(namespace.entity, entityName)).toBeDefined();
    expect(getSharedInteger(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(true);
  });
});

describe('when building shared integer with no shared integer name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build shared integer', (): void => {
    expect(namespace.entity.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with lowercase shared integer name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build no shared short', (): void => {
    expect(namespace.entity.sharedInteger.size).toBe(0);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no documentation', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(false);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no min value', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have a min value because max value token was ignored', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have max value because it was consumed by min value', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe('');
  });

  it('should not be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(false);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no max value', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe('');
  });

  it('should not be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(false);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withTrailingText(trailingText)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(false);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no shared short name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build shared short', (): void => {
    expect(namespace.entity.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with lowercase shared short name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build no shared short', (): void => {
    expect(namespace.entity.sharedInteger.size).toBe(0);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no documentation', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(true);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no min value', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have a min value because max value token was ignored', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have max value because it was consumed by min value', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe('');
  });

  it('should be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(true);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no max value', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe('');
  });

  it('should be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(true);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withTrailingText(trailingText)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have minValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).isShort).toBe(true);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer source map', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'documentation';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  // SharedSimpleSourceMap
  it('should have type', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have metaEdName', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();

    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  // SharedIntegerSourceMap
  it('should have isShort', (): void => {
    expect((getSharedInteger(namespace.entity, entityName).sourceMap as SharedIntegerSourceMap).isShort).toBeDefined();
  });

  it('should have minValue', (): void => {
    expect((getSharedInteger(namespace.entity, entityName).sourceMap as SharedIntegerSourceMap).minValue).toBeDefined();
  });

  it('should have maxValue', (): void => {
    expect((getSharedInteger(namespace.entity, entityName).sourceMap as SharedIntegerSourceMap).maxValue).toBeDefined();
  });

  it('should have line, column, text for each property', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});

describe('when building shared short source map', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'documentation';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  // SharedSimpleSourceMap
  it('should have type', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
    expect(getSharedInteger(namespace.entity, entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  // SharedIntegerSourceMap
  it('should have isShort', (): void => {
    expect((getSharedInteger(namespace.entity, entityName).sourceMap as SharedIntegerSourceMap).isShort).toBeDefined();
  });

  it('should have minValue', (): void => {
    expect((getSharedInteger(namespace.entity, entityName).sourceMap as SharedIntegerSourceMap).minValue).toBeDefined();
  });

  it('should have maxValue', (): void => {
    expect((getSharedInteger(namespace.entity, entityName).sourceMap as SharedIntegerSourceMap).maxValue).toBeDefined();
  });

  it('should have line, column, text for each property', (): void => {
    expect(getSharedInteger(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});
