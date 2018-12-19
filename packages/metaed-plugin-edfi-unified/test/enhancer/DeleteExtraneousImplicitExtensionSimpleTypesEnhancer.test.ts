import { newMetaEdEnvironment, newNamespace, newStringType } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/DeleteExtraneousImplicitExtensionSimpleTypesEnhancer';

describe('when there are duplicate string types', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = {
    ...newNamespace(),
    namespaceName: 'extension',
    isExtension: true,
    dependencies: [namespace],
  };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const coreOnlySimpleTypeName = 'CoreOnlySimpleTypeName';
  const coreDuplicatedSimpleTypeName = 'CoreDuplicatedSimpleTypeName';
  const extensionOnlySimpleTypeName = 'ExtensionOnlySimpleTypeName';

  beforeAll(() => {
    namespace.entity.stringType.set(
      coreOnlySimpleTypeName,
      Object.assign(newStringType(), { metaEdName: coreOnlySimpleTypeName, namespace }),
    );
    namespace.entity.stringType.set(
      coreDuplicatedSimpleTypeName,
      Object.assign(newStringType(), { metaEdName: coreDuplicatedSimpleTypeName, namespace }),
    );
    extensionNamespace.entity.stringType.set(
      `${extensionNamespace.projectExtension}-${coreDuplicatedSimpleTypeName}`,
      Object.assign(newStringType(), {
        metaEdName: coreDuplicatedSimpleTypeName,
        namespace: extensionNamespace,
      }),
    );
    extensionNamespace.entity.stringType.set(
      `${extensionNamespace.projectExtension}-${extensionOnlySimpleTypeName}`,
      Object.assign(newStringType(), {
        metaEdName: extensionOnlySimpleTypeName,
        namespace: extensionNamespace,
      }),
    );

    enhance(metaEd);
  });

  it('should not have removed the core only type', () => {
    expect(namespace.entity.stringType.get(coreOnlySimpleTypeName)).toBeDefined();
  });

  it('should not have removed the extension only type', () => {
    expect(
      extensionNamespace.entity.stringType.get(`${extensionNamespace.projectExtension}-${extensionOnlySimpleTypeName}`),
    ).toBeDefined();
  });

  it('should not have removed the core duplicated type', () => {
    expect(namespace.entity.stringType.get(coreDuplicatedSimpleTypeName)).toBeDefined();
  });

  it('should have removed the extension duplicated type', () => {
    expect(
      extensionNamespace.entity.stringType.get(`${extensionNamespace.projectExtension}-${coreDuplicatedSimpleTypeName}`),
    ).toBeUndefined();
  });
});
