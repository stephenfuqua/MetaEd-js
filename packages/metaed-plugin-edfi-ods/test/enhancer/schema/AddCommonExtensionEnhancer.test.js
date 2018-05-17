// @flow
import { newCommonExtension, newNamespace, newMetaEdEnvironment } from 'metaed-core';
import type { CommonExtension, MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../../src/model/CommonExtension';

describe('when CommonExtension enhances common extension entity', () => {
  const commonExtensionName: string = 'CommonExtensionName';
  const extensionEntitySuffix: string = 'Extension';
  let commonExtension: CommonExtension;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi', extensionEntitySuffix };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    commonExtension = Object.assign(newCommonExtension(), {
      metaEdName: commonExtensionName,
      namespace,
    });
    namespace.entity.commonExtension.set(commonExtensionName, commonExtension);
    enhance(metaEd);
  });

  it('should have ods extension name with extension entity suffix', () => {
    expect(commonExtension.data.edfiOds.ods_ExtensionName).toBe(commonExtensionName + extensionEntitySuffix);
  });
});
