// @flow
import { newMetaEdEnvironment, newCommon, newCommonExtension, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Common, CommonExtension } from 'metaed-core';
import { enhance } from '../../src/enhancer/CommonExtenderEnhancer';

describe('when enhancing parent of common extension', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Common;
  let childEntity: CommonExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newCommon(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.common.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newCommonExtension(), {
      metaEdName: parentEntityName,
      baseEntity: parentEntity,
      namespace,
    });
    namespace.entity.commonExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(parentEntity.extender).toBe(childEntity);
  });
});

describe('when enhancing parent of common extension across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Common;
  let childEntity: CommonExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newCommon(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.common.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newCommonExtension(), {
      metaEdName: parentEntityName,
      baseEntity: parentEntity,
      namespace: extensionNamespace,
    });
    extensionNamespace.entity.commonExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(parentEntity.extender).toBe(childEntity);
  });
});
