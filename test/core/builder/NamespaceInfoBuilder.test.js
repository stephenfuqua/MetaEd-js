// @noflow
import NamespaceInfoBuilder from '../../../src/core/builder/NamespaceInfoBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { repositoryFactory } from '../../../src/core/model/Repository';
import type { Repository } from '../../../src/core/model/Repository';

import { DefaultExtensionEntitySuffix } from '../../../src/core/model/NamespaceInfo';

describe('when building extension namespace info', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon('Dummy')
      .withDocumentation('Dummy')
      .withIntegerProperty('Dummy', 'Dummy', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one namespace info', () => {
    expect(repository.namespaceInfo.size).toBe(1);
  });

  it('should have correct namespace', () => {
    expect(repository.namespaceInfo.get(namespace)).toBeDefined();
    expect(repository.namespaceInfo.get(namespace).namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(repository.namespaceInfo.get(namespace).projectExtension).toBe(projectExtension);
  });

  it('should be an extension', () => {
    expect(repository.namespaceInfo.get(namespace).isExtension).toBe(true);
  });

  it('should have correct extension suffix', () => {
    expect(repository.namespaceInfo.get(namespace).extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building core namespace info', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon('Dummy')
      .withDocumentation('Dummy')
      .withIntegerProperty('Dummy', 'Dummy', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one namespace info', () => {
    expect(repository.namespaceInfo.size).toBe(1);
  });

  it('should have correct namespace', () => {
    expect(repository.namespaceInfo.get(namespace)).toBeDefined();
    expect(repository.namespaceInfo.get(namespace).namespace).toBe(namespace);
  });

  it('should have a blank project extension', () => {
    expect(repository.namespaceInfo.get(namespace).projectExtension).toBe('');
  });

  it('should not be an extension', () => {
    expect(repository.namespaceInfo.get(namespace).isExtension).toBeFalsy();
  });

  it('should have correct extension suffix', () => {
    expect(repository.namespaceInfo.get(namespace).extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});
