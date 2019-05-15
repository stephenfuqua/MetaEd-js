import { newDomainEntityExtension, newNamespace, newMetaEdEnvironment } from 'metaed-core';
import { DomainEntityExtension, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/model/DomainEntityExtension';

describe('when DomainEntityExtension enhances domain entity extension entity', (): void => {
  const domainEntityExtensionName = 'DomainEntityExtensionName';
  const extensionEntitySuffix = 'Extension';
  let domainEntityExtension: DomainEntityExtension;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi', extensionEntitySuffix };
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

  it('should have ods extension name with extension entity suffix', (): void => {
    expect(domainEntityExtension.data.edfiOds.odsExtensionName).toBe(domainEntityExtensionName + extensionEntitySuffix);
  });
});
