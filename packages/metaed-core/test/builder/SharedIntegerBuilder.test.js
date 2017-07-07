// @noflow
import { SharedIntegerBuilder } from '../../src/builder/SharedIntegerBuilder';
import { MetaEdTextBuilder } from '../MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building shared integer in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared integer', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.sharedInteger.get(entityName)).toBeDefined();
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(false);
  });
});

describe('when building duplicate shared integers', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()

      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared integer', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.sharedInteger.get(entityName)).toBeDefined();
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate shared integers should have validation failures for each entity -> SI 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared integers should have validation failures for each entity -> SI 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared integers should have validation failures for each entity -> SI 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared integers should have validation failures for each entity -> SI 2 sourceMap');
  });
});

describe('when building shared short in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared short', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.sharedInteger.get(entityName)).toBeDefined();
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(true);
  });
});


describe('when building shared integer with no shared integer name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build shared integer', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with lowercase shared integer name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared short', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(metaEd.entity.sharedInteger.get('Name')).toBeDefined();
    expect(metaEd.entity.sharedInteger.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get('Name').documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get('Name').minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get('Name').maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(metaEd.entity.sharedInteger.get('Name').isShort).toBe(false);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe('');
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no min value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have a min value because max value token was ignored', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have max value because it was consumed by min value', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should not be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no max value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should not be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withTrailingText(trailingText)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no shared short name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build shared short', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with lowercase shared short name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared short', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(metaEd.entity.sharedInteger.get('Name')).toBeDefined();
    expect(metaEd.entity.sharedInteger.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get('Name').documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get('Name').minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get('Name').maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(metaEd.entity.sharedInteger.get('Name').isShort).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe('');
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no min value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have a min value because max value token was ignored', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have max value because it was consumed by min value', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no max value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withTrailingText(trailingText)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'documentation';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  // SharedSimpleSourceMap
  it('should have type', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdName).toBeDefined();
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdId).toBeDefined();
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have namespaceInfo', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.namespaceInfo).toBeDefined();
  });

  // SharedIntegerSourceMap
  it('should have isShort', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.isShort).toBeUndefined();
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.minValue).toBeDefined();
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.maxValue).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap).toMatchSnapshot();
  });
});

describe('when building shared short source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'documentation';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  // SharedSimpleSourceMap
  it('should have type', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdName).toBeDefined();
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdId).toBeDefined();
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have namespaceInfo', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.namespaceInfo).toBeDefined();
  });

  // SharedIntegerSourceMap
  it('should have isShort', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.isShort).toBeDefined();
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.minValue).toBeDefined();
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap.maxValue).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(metaEd.entity.sharedInteger.get(entityName).sourceMap).toMatchSnapshot();
  });
});
