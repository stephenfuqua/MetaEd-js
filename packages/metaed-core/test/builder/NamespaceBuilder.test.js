// @flow
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';
import { DefaultExtensionEntitySuffix } from '../../src/model/Namespace';

describe('when building extension namespace info', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartCommon('Dummy')
      .withDocumentation('Dummy')
      .withIntegerProperty('Dummy', 'Dummy', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one namespace info', () => {
    expect(metaEd.entity.namespace.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.namespaceName).toBe(namespaceName);
  });

  it('should have correct project extension', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.projectExtension).toBe(projectExtension);
  });

  it('should be an extension', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.isExtension).toBe(true);
  });

  it('should have correct extension suffix', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building core namespace info', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'edfi';

  beforeAll(() => {
    const builder = new NamespaceBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartCommon('Dummy')
      .withDocumentation('Dummy')
      .withIntegerProperty('Dummy', 'Dummy', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one namespace info', () => {
    expect(metaEd.entity.namespace.size).toBe(1);
  });

  it('should have correct namespace', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.namespaceName).toBe(namespaceName);
  });

  it('should have a blank project extension', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.projectExtension).toBe('');
  });

  it('should not be an extension', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.isExtension).toBe(false);
  });

  it('should have correct extension suffix', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building extension namespace info source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  beforeAll(() => {
    const builder = new NamespaceBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartCommon('Dummy')
      .withDocumentation('Dummy')
      .withIntegerProperty('Dummy', 'Dummy', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have type', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.sourceMap.type).toBeDefined();
  });

  it('should have namespace', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.sourceMap.namespaceName).toBeDefined();
  });

  it('should have isExtension', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.sourceMap.isExtension).toBeDefined();
  });

  it('should have projectExtension', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.sourceMap.projectExtension).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    const namespace: any = metaEd.entity.namespace.get(namespaceName);
    expect(namespace.sourceMap).toMatchSnapshot();
  });
});
