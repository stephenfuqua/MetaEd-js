import {
  addEntityForNamespace,
  newMetaEdEnvironment,
  newAssociation,
  newInlineCommon,
  newInlineCommonProperty,
  newStringProperty,
  newNamespace,
} from 'metaed-core';
import { MetaEdEnvironment, Common, Association, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/AddInlineIdentityEnhancer';

describe('when enhancing association with inline string property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const inlineName = 'InlineName';
  const entityName = 'EntityName';
  const propertyName1 = 'PropertyName1';
  const propertyName2 = 'PropertyName2';
  let association: Association;

  beforeAll(() => {
    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName: 'EdFi',
    });
    metaEd.namespace.set(namespace.namespaceName, namespace);

    const properties = [
      Object.assign(newStringProperty(), {
        metaEdName: propertyName1,
        isPartOfIdentity: false,
      }),
      Object.assign(newStringProperty(), {
        metaEdName: propertyName2,
        isPartOfIdentity: true,
      }),
    ];

    const inlineCommon: Common = Object.assign(newInlineCommon(), {
      namespace,
      metaEdName: inlineName,
      inlineInOds: true,
      properties,
      data: {
        edfiXsd: {},
      },
    });
    addEntityForNamespace(inlineCommon);

    association = Object.assign(newAssociation(), {
      namespace,
      metaEdName: entityName,
      properties: [
        Object.assign(newInlineCommonProperty(), {
          metaEdName: inlineName,
          referencedNamespaceName: namespace.namespaceName,
          referencedEntity: inlineCommon,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addEntityForNamespace(association);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should add identity properties to association', (): void => {
    expect(association.properties[0].type).toBe('inlineCommon');
    expect(association.data.edfiXsd.xsdIdentityProperties.length).toBe(1);
    expect(association.data.edfiXsd.xsdIdentityProperties[0].metaEdName).toBe(propertyName2);
  });
});

describe('when enhancing association with inline nested string property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const inline1Name = 'Inline1Name';
  const inline2Name = 'Inline2Name';
  const entityName = 'EntityName';
  const propertyName = 'PropertyName';
  let association: Association;

  beforeAll(() => {
    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName: 'EdFi',
    });
    metaEd.namespace.set(namespace.namespaceName, namespace);

    const inlineCommon2: Common = Object.assign(newInlineCommon(), {
      namespace,
      metaEdName: inline2Name,
      inlineInOds: true,
      properties: [
        Object.assign(newStringProperty(), {
          metaEdName: propertyName,
          isPartOfIdentity: true,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addEntityForNamespace(inlineCommon2);

    const inlineCommon1: Common = Object.assign(newInlineCommon(), {
      namespace,
      metaEdName: inline1Name,
      inlineInOds: true,
      properties: [
        Object.assign(newInlineCommonProperty(), {
          metaEdName: inline2Name,
          referencedNamespaceName: namespace.namespaceName,
          referencedEntity: inlineCommon2,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addEntityForNamespace(inlineCommon1);

    association = Object.assign(newAssociation(), {
      namespace,
      metaEdName: entityName,
      properties: [
        Object.assign(newInlineCommonProperty(), {
          metaEdName: inline1Name,
          referencedNamespaceName: namespace.namespaceName,
          referencedEntity: inlineCommon1,
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addEntityForNamespace(association);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should add identity properties to association', (): void => {
    expect(association.properties[0].type).toBe('inlineCommon');
    expect(association.data.edfiXsd.xsdIdentityProperties.length).toBe(1);
    expect(association.data.edfiXsd.xsdIdentityProperties[0].metaEdName).toBe(propertyName);
  });
});
