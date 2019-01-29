import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';
import { DefaultExtensionEntitySuffix } from '../../src/model/Namespace';

describe('when building extension namespace info', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

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
    expect(metaEd.namespace.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.namespaceName).toBe(namespaceName);
  });

  it('should have correct project extension', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.projectExtension).toBe(projectExtension);
  });

  it('should be an extension', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.isExtension).toBe(true);
  });

  it('should have correct extension suffix', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});

describe('when building core namespace info', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'EdFi';

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
    expect(metaEd.namespace.size).toBe(1);
  });

  it('should have correct namespace', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.namespaceName).toBe(namespaceName);
  });

  it('should have a blank project extension', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.projectExtension).toBe('');
  });

  it('should not be an extension', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.isExtension).toBe(false);
  });

  it('should have correct extension suffix', () => {
    const namespace: any = metaEd.namespace.get(namespaceName);
    expect(namespace.extensionEntitySuffix).toBe(DefaultExtensionEntitySuffix);
  });
});
