// @flow
import { newMetaEdEnvironment, newNamespace, newStringType } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/DeleteExtraneousImplicitExtensionSimpleTypesEnhancer';

describe('when there are duplicate string types', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const coreOnlySimpleTypeName: string = 'CoreOnlySimpleTypeName';
  const coreDuplicatedSimpleTypeName: string = 'CoreDuplicatedSimpleTypeName';
  const extensionOnlySimpleTypeName: string = 'ExtensionOnlySimpleTypeName';

  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    isExtension: true,
    projectExtension: 'extension',
  });

  beforeAll(() => {
    metaEd.entity.stringType.set(
      coreOnlySimpleTypeName,
      Object.assign(newStringType(), { metaEdName: coreOnlySimpleTypeName }),
    );
    metaEd.entity.stringType.set(
      coreDuplicatedSimpleTypeName,
      Object.assign(newStringType(), { metaEdName: coreDuplicatedSimpleTypeName }),
    );
    metaEd.entity.stringType.set(
      `${extensionNamespace.projectExtension}-${coreDuplicatedSimpleTypeName}`,
      Object.assign(newStringType(), {
        metaEdName: coreDuplicatedSimpleTypeName,
        namespace: extensionNamespace,
      }),
    );
    metaEd.entity.stringType.set(
      `${extensionNamespace.projectExtension}-${extensionOnlySimpleTypeName}`,
      Object.assign(newStringType(), {
        metaEdName: extensionOnlySimpleTypeName,
        namespace: extensionNamespace,
      }),
    );

    enhance(metaEd);
  });

  it('should not have removed the core only type', () => {
    expect(metaEd.entity.stringType.get(coreOnlySimpleTypeName)).toBeDefined();
  });

  it('should not have removed the extension only type', () => {
    expect(
      metaEd.entity.stringType.get(`${extensionNamespace.projectExtension}-${extensionOnlySimpleTypeName}`),
    ).toBeDefined();
  });

  it('should not have removed the core duplicated type', () => {
    expect(metaEd.entity.stringType.get(coreDuplicatedSimpleTypeName)).toBeDefined();
  });

  it('should have removed the extension duplicated type', () => {
    expect(
      metaEd.entity.stringType.get(`${extensionNamespace.projectExtension}-${coreDuplicatedSimpleTypeName}`),
    ).toBeUndefined();
  });
});
