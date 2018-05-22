// @flow
import { newMetaEdEnvironment, newDomainEntity, newStringProperty, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, DomainEntity, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/CopyPropertiesEnhancer';

describe('when enhancing domainEntity with string properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const identityProperty = Object.assign(newStringProperty(), {
    metaEdName: 'IdentityPropertyName',
    isPartOfIdentity: true,
  });
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'edfi',
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

  it('should add identity property only to domainEntity xsd_IdentityProperties', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(entityName);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties.length).toBe(1);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties[0]).toBe(identityProperty);
  });
});
