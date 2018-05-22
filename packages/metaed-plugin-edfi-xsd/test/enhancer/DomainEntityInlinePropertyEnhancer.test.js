// @flow
import {
  newMetaEdEnvironment,
  newDomainEntity,
  newInlineCommon,
  newInlineCommonProperty,
  newStringProperty,
  newNamespace,
} from 'metaed-core';
import type { MetaEdEnvironment, Common, DomainEntity, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/AddInlineIdentityEnhancer';

describe('when enhancing domainEntity with inline string property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const inlineName: string = 'InlineName';
  const entityName: string = 'EntityName';
  const propertyName1: string = 'PropertyName1';
  const propertyName2: string = 'PropertyName2';

  beforeAll(() => {
    const properties = [
      Object.assign(newStringProperty(), {
        metaEdName: propertyName1,
        namespace,
        isPartOfIdentity: false,
      }),
      Object.assign(newStringProperty(), {
        metaEdName: propertyName2,
        namespace,
        isPartOfIdentity: true,
      }),
    ];

    const inlineCommon: Common = Object.assign(newInlineCommon(), {
      metaEdName: inlineName,
      namespace,
      inlineInOds: true,
      properties,
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.common.set(inlineCommon.metaEdName, inlineCommon);

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      namespace,
      properties: [
        Object.assign(newInlineCommonProperty(), {
          metaEdName: inlineName,
          namespace,
          referencedEntity: inlineCommon,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should add identity properties to domainEntity', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(entityName);
    expect(domainEntity.properties[0].type).toBe('inlineCommon');
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties.length).toBe(1);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties[0].metaEdName).toBe(propertyName2);
  });
});

describe('when enhancing domainEntity with inline nested string property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const inline1Name: string = 'Inline1Name';
  const inline2Name: string = 'Inline2Name';
  const entityName: string = 'EntityName';
  const property1Name: string = 'Property1Name';
  const property2Name: string = 'Property2Name';

  beforeAll(() => {
    const inlineCommon2: Common = Object.assign(newInlineCommon(), {
      metaEdName: inline2Name,
      namespace,
      inlineInOds: true,
      properties: [
        Object.assign(newStringProperty(), {
          metaEdName: property1Name,
          namespace,
          isPartOfIdentity: true,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.common.set(inlineCommon2.metaEdName, inlineCommon2);

    const inlineCommon1: Common = Object.assign(newInlineCommon(), {
      metaEdName: inline1Name,
      namespace,
      inlineInOds: true,
      properties: [
        Object.assign(newInlineCommonProperty(), {
          metaEdName: inline2Name,
          namespace,
          referencedEntity: inlineCommon2,
        }),
        Object.assign(newStringProperty(), {
          metaEdName: property2Name,
          namespace,
          isPartOfIdentity: true,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.common.set(inlineCommon1.metaEdName, inlineCommon1);

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      namespace,
      properties: [
        Object.assign(newInlineCommonProperty(), {
          metaEdName: inline1Name,
          namespace,
          referencedEntity: inlineCommon1,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should add identity properties to domainEntity', () => {
    const domainEntity: any = namespace.entity.domainEntity.get(entityName);
    expect(domainEntity.properties[0].type).toBe('inlineCommon');
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties.length).toBe(2);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties[0].metaEdName).toBe(property2Name);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties[1].metaEdName).toBe(property1Name);
  });
});
