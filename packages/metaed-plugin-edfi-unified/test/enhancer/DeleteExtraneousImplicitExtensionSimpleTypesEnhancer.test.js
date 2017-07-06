// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { NamespaceInfo } from '../../../../packages/metaed-core/src/model/NamespaceInfo';
import { newNamespaceInfo } from '../../../../packages/metaed-core/src/model/NamespaceInfo';
import { stringTypeFactory } from '../../../../packages/metaed-core/src/model/StringType';
import { enhance } from '../../src/enhancer/DeleteExtraneousImplicitExtensionSimpleTypesEnhancer';

describe('when there are duplicate string types', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const coreOnlySimpleTypeName: string = 'CoreOnlySimpleTypeName';
  const coreDuplicatedSimpleTypeName: string = 'CoreDuplicatedSimpleTypeName';
  const extensionOnlySimpleTypeName: string = 'ExtensionOnlySimpleTypeName';

  const extensionNamespaceInfo : NamespaceInfo = Object.assign(newNamespaceInfo(), { isExtension: true, projectExtension: 'extension' });

  beforeAll(() => {
    metaEd.entity.stringType.set(coreOnlySimpleTypeName, Object.assign(stringTypeFactory(), { metaEdName: coreOnlySimpleTypeName }));
    metaEd.entity.stringType.set(coreDuplicatedSimpleTypeName, Object.assign(stringTypeFactory(), { metaEdName: coreDuplicatedSimpleTypeName }));
    metaEd.entity.stringType.set(`${extensionNamespaceInfo.projectExtension}-${coreDuplicatedSimpleTypeName}`, Object.assign(stringTypeFactory(), {
      metaEdName: coreDuplicatedSimpleTypeName,
      namespaceInfo: extensionNamespaceInfo,
    }));
    metaEd.entity.stringType.set(`${extensionNamespaceInfo.projectExtension}-${extensionOnlySimpleTypeName}`, Object.assign(stringTypeFactory(), {
      metaEdName: extensionOnlySimpleTypeName,
      namespaceInfo: extensionNamespaceInfo,
    }));

    enhance(metaEd);
  });

  it('should not have removed the core only type', () => {
    expect(metaEd.entity.stringType.get(coreOnlySimpleTypeName)).toBeDefined();
  });

  it('should not have removed the extension only type', () => {
    expect(metaEd.entity.stringType.get(`${extensionNamespaceInfo.projectExtension}-${extensionOnlySimpleTypeName}`)).toBeDefined();
  });

  it('should not have removed the core duplicated type', () => {
    expect(metaEd.entity.stringType.get(coreDuplicatedSimpleTypeName)).toBeDefined();
  });

  it('should have removed the extension duplicated type', () => {
    expect(metaEd.entity.stringType.get(`${extensionNamespaceInfo.projectExtension}-${coreDuplicatedSimpleTypeName}`)).toBeUndefined();
  });
});
