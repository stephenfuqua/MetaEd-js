// @noflow
import NamespaceInfoBuilder from '../../../src/core/builder/NamespaceInfoBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

import { DefaultExtensionEntitySuffix } from '../../../src/core/model/NamespaceInfo';

describe('when building extension namespace info', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(entityRepository);

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
    expect(entityRepository.namespaceInfo.size).toBe(1);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.namespaceInfo.get(namespace)).toBeDefined();
    expect(entityRepository.namespaceInfo.get(namespace).namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.namespaceInfo.get(namespace).projectExtension).toBe(projectExtension);
  });

  it('should be an extension', () => {
    expect(entityRepository.namespaceInfo.get(namespace).isExtension).toBe(true);
  });

  it('should have correct extension suffix', () => {
    expect(entityRepository.namespaceInfo.get(namespace).extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building core namespace info', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(entityRepository);

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
    expect(entityRepository.namespaceInfo.size).toBe(1);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.namespaceInfo.get(namespace)).toBeDefined();
    expect(entityRepository.namespaceInfo.get(namespace).namespace).toBe(namespace);
  });

  it('should have a blank project extension', () => {
    expect(entityRepository.namespaceInfo.get(namespace).projectExtension).toBe('');
  });

  it('should not be an extension', () => {
    expect(entityRepository.namespaceInfo.get(namespace).isExtension).toBeFalsy();
  });

  it('should have correct extension suffix', () => {
    expect(entityRepository.namespaceInfo.get(namespace).extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});
