import { newMetaEdEnvironment, newDomainEntity, newStringProperty, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, DomainEntity, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/CopyPropertiesEnhancer';

describe('when enhancing domainEntity with string properties', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName = 'EntityName';
  const identityProperty = Object.assign(newStringProperty(), {
    metaEdName: 'IdentityPropertyName',
    isPartOfIdentity: true,
  });
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'EdFi',
  });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      namespace,
      properties: [
        identityProperty,
        Object.assign(newStringProperty(), {
          metaEdName: 'NotIdentityPropertyName',
          isPartOfIdentity: false,
        }),
      ],
      identityProperties: [identityProperty],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should add identity property only to domainEntity xsdIdentityProperties', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(entityName);
    expect(domainEntity.data.edfiXsd.xsdIdentityProperties.length).toBe(1);
    expect(domainEntity.data.edfiXsd.xsdIdentityProperties[0]).toBe(identityProperty);
  });
});
