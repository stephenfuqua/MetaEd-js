// @noflow
import SharedIntegerBuilder from '../../../src/core/builder/SharedIntegerBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building shared integer in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);
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
    expect(entityRepository.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.sharedInteger.get(entityName)).toBeDefined();
    expect(entityRepository.sharedInteger.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(false);
  });
});

describe('when building shared short in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);
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
    expect(entityRepository.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.sharedInteger.get(entityName)).toBeDefined();
    expect(entityRepository.sharedInteger.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(true);
  });
});


describe('when building shared integer with no shared integer name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with lowercase shared integer name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(entityRepository.sharedInteger.get('Name')).toBeDefined();
    expect(entityRepository.sharedInteger.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedInteger.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get('Name').documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get('Name').minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get('Name').maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(entityRepository.sharedInteger.get('Name').isShort).toBe(false);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe('');
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no min value', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have a min value because max value token was ignored', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have max value because it was consumed by min value', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should not be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with no max value', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should not be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared integer with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(false);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no shared short name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with lowercase shared short name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(entityRepository.sharedInteger.get('Name')).toBeDefined();
    expect(entityRepository.sharedInteger.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedInteger.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get('Name').documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get('Name').minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get('Name').maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(entityRepository.sharedInteger.get('Name').isShort).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe('');
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no min value', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have a min value because max value token was ignored', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have max value because it was consumed by min value', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with no max value', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '';

  beforeAll(() => {
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe('');
  });

  it('should be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared short with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedIntegerBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedInteger.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedInteger.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(entityRepository.sharedInteger.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedInteger.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a short', () => {
    expect(entityRepository.sharedInteger.get(entityName).isShort).toBe(true);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
