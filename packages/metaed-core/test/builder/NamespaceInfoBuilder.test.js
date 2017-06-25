// @flow
import NamespaceInfoBuilder from '../../src/builder/NamespaceInfoBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

import { DefaultExtensionEntitySuffix } from '../../src/model/NamespaceInfo';

describe('when building extension namespace info', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(metaEd, validationFailures);

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
    expect(metaEd.entity.namespaceInfo).toHaveLength(1);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    expect(metaEd.entity.namespaceInfo[0]).toBeDefined();
    expect(metaEd.entity.namespaceInfo[0].namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(metaEd.entity.namespaceInfo[0].projectExtension).toBe(projectExtension);
  });

  it('should be an extension', () => {
    expect(metaEd.entity.namespaceInfo[0].isExtension).toBe(true);
  });

  it('should have correct extension suffix', () => {
    expect(metaEd.entity.namespaceInfo[0].extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building duplicate extension namespace info', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(metaEd, validationFailures);

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

  it('should build two namespace info', () => {
    expect(metaEd.entity.namespaceInfo).toHaveLength(2);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    expect(metaEd.entity.namespaceInfo[0].namespace).toBe(namespace);
    expect(metaEd.entity.namespaceInfo[1].namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(metaEd.entity.namespaceInfo[0].projectExtension).toBe(projectExtension);
    expect(metaEd.entity.namespaceInfo[1].projectExtension).toBe(projectExtension);
  });

  it('should be an extension', () => {
    expect(metaEd.entity.namespaceInfo[0].isExtension).toBe(true);
    expect(metaEd.entity.namespaceInfo[1].isExtension).toBe(true);
  });

  it('should have correct extension suffix', () => {
    expect(metaEd.entity.namespaceInfo[0].extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
    expect(metaEd.entity.namespaceInfo[1].extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building core namespace info', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(metaEd, validationFailures);

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
    expect(metaEd.entity.namespaceInfo).toHaveLength(1);
  });

  it('should have correct namespace', () => {
    expect(metaEd.entity.namespaceInfo[0]).toBeDefined();
    expect(metaEd.entity.namespaceInfo[0].namespace).toBe(namespace);
  });

  it('should have a blank project extension', () => {
    expect(metaEd.entity.namespaceInfo[0].projectExtension).toBe('');
  });

  it('should not be an extension', () => {
    expect(metaEd.entity.namespaceInfo[0].isExtension).toBeFalsy();
  });

  it('should have correct extension suffix', () => {
    expect(metaEd.entity.namespaceInfo[0].extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building extension namespace info source map', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceInfoBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartCommon('Dummy')
      .withDocumentation('Dummy')
      .withIntegerProperty('Dummy', 'Dummy', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have type', () => {
    expect(metaEd.entity.namespaceInfo[0].sourceMap.type).toBeDefined();
  });

  it('should have namespace', () => {
    expect(metaEd.entity.namespaceInfo[0].sourceMap.namespace).toBeDefined();
  });

  it('should have isExtension', () => {
    expect(metaEd.entity.namespaceInfo[0].sourceMap.isExtension).toBeDefined();
  });

  it('should have projectExtension', () => {
    expect(metaEd.entity.namespaceInfo[0].sourceMap.projectExtension).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(metaEd.entity.namespaceInfo[0].sourceMap).toMatchSnapshot();
  });
});
