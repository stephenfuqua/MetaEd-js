// @noflow
import SharedStringBuilder from '../../../src/core/builder/SharedStringBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building shared string in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  beforeAll(() => {
    const builder = new SharedStringBuilder(entityRepository);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared string', () => {
    expect(entityRepository.sharedString.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.sharedString.get(entityName)).toBeDefined();
    expect(entityRepository.sharedString.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedString.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedString.get(entityName).documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(entityRepository.sharedString.get(entityName).minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(entityRepository.sharedString.get(entityName).maxLength).toBe(maxLength);
  });
});

describe('when building shared string with no shared string name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  beforeAll(() => {
    const builder = new SharedStringBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build shared string', () => {
    expect(entityRepository.sharedString.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with lowercase shared string name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  beforeAll(() => {
    const builder = new SharedStringBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared string', () => {
    expect(entityRepository.sharedString.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(entityRepository.sharedString.get('Name')).toBeDefined();
    expect(entityRepository.sharedString.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedString.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedString.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedString.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedString.get('Name').documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(entityRepository.sharedString.get('Name').minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(entityRepository.sharedString.get('Name').maxLength).toBe(maxLength);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with no documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const minLength = '2';
  const maxLength = '100';

  beforeAll(() => {
    const builder = new SharedStringBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedString.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(entityRepository.sharedString.get(entityName).documentation).toBe('');
  });

  it('should have min length', () => {
    expect(entityRepository.sharedString.get(entityName).minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(entityRepository.sharedString.get(entityName).maxLength).toBe(maxLength);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with no min length', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '';
  const maxLength = '100';

  beforeAll(() => {
    const builder = new SharedStringBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedString.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedString.get(entityName).documentation).toBe(documentation);
  });

  it('should have a min length because max length token was ignored', () => {
    expect(entityRepository.sharedString.get(entityName).minLength).toBe(maxLength);
  });

  it('should not have max length', () => {
    expect(entityRepository.sharedString.get(entityName).maxLength).toBe('');
  });

  it('should have extraneous input and mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with no max length', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '';

  beforeAll(() => {
    const builder = new SharedStringBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedString.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedString.get(entityName).documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(entityRepository.sharedString.get(entityName).minLength).toBe(minLength);
  });

  it('should no max length', () => {
    expect(entityRepository.sharedString.get(entityName).maxLength).toBe('');
  });

  it('should have missing unsigned int error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new SharedStringBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withTrailingText(trailingText)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedString.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedString.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedString.get(entityName).documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(entityRepository.sharedString.get(entityName).minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(entityRepository.sharedString.get(entityName).maxLength).toBe(maxLength);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
