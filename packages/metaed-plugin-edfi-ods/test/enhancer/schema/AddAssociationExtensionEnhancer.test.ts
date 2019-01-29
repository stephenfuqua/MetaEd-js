import { newAssociationExtension, newNamespace, newMetaEdEnvironment } from 'metaed-core';
import { AssociationExtension, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/model/AssociationExtension';

describe('when AssociationExtension enhances association extension entity', () => {
  const associationExtensionName = 'AssociationExtensionName';
  const extensionEntitySuffix = 'Extension';
  let associationExtension: AssociationExtension;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi', extensionEntitySuffix };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    associationExtension = Object.assign(newAssociationExtension(), {
      metaEdName: associationExtensionName,
      namespace,
    });
    namespace.entity.associationExtension.set(associationExtensionName, associationExtension);
    enhance(metaEd);
  });

  it('should have ods extension name with extension entity suffix', () => {
    expect(associationExtension.data.edfiOds.odsExtensionName).toBe(associationExtensionName + extensionEntitySuffix);
  });
});
