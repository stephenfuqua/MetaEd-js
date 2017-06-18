// @noflow
import NamespaceInfoBuilder from '../../../src/core/builder/NamespaceInfoBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

import { DefaultExtensionEntitySuffix } from '../../../src/core/model/NamespaceInfo';

describe('when building extension namespace info', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(entityRepository, validationFailures);

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

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
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

describe('when building duplicate extension namespace info', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(entityRepository, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon('Dummy')
      .withDocumentation('Dummy')
      .withIntegerProperty('Dummy', 'Dummy', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon('Dummy2')
      .withDocumentation('Dummy2')
      .withIntegerProperty('Dummy2', 'Dummy2', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one namespace info', () => {
    expect(entityRepository.namespaceInfo.size).toBe(1);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  xit('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('NamespaceInfoBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate extension namespace info should have validation failures for each entity -> NI 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate extension namespace info should have validation failures for each entity -> NI 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('NamespaceInfoBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate extension namespace info should have validation failures for each entity -> NI 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate extension namespace info should have validation failures for each entity -> NI 2 sourceMap');
  });
});

describe('when building core namespace info', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(entityRepository, validationFailures);

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
