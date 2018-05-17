// @flow
import { newDomainEntityExtension, newNamespace, newMetaEdEnvironment } from 'metaed-core';
import type { DomainEntityExtension, MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../../src/model/DomainEntityExtension';

describe('when DomainEntityExtension enhances domain entity extension entity', () => {
  const domainEntityExtensionName: string = 'DomainEntityExtensionName';
  const extensionEntitySuffix: string = 'Extension';
  let domainEntityExtension: DomainEntityExtension;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi', extensionEntitySuffix };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    domainEntityExtension = Object.assign(newDomainEntityExtension(), {
      metaEdName: domainEntityExtensionName,
      namespace,
    });
    namespace.entity.domainEntityExtension.set(domainEntityExtensionName, domainEntityExtension);
    enhance(metaEd);
  });

  it('should have ods extension name with extension entity suffix', () => {
    expect(domainEntityExtension.data.edfiOds.ods_ExtensionName).toBe(domainEntityExtensionName + extensionEntitySuffix);
  });
});
