// @flow
import { newMetaEdEnvironment, newAssociation, newCommon, newCommonProperty, newStringProperty } from '../../../../packages/metaed-core/index';
import type { MetaEdEnvironment, Common, Association } from '../../../../packages/metaed-core/index';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/AddInlineIdentityEnhancer';

describe('when enhancing association with inline string property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const inlineName: string = 'InlineName';
  const entityName: string = 'EntityName';
  const propertyName1: string = 'PropertyName1';
  const propertyName2: string = 'PropertyName2';

  beforeAll(() => {
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

    const inlineCommon: Common = Object.assign(newCommon(), {
      metaEdName: inlineName,
      inlineInOds: true,
      properties,
    });
    metaEd.entity.common.set(inlineCommon.metaEdName, inlineCommon);

    const association: Association = Object.assign(newAssociation(), {
      metaEdName: entityName,
      properties: [
        Object.assign(newCommonProperty(), {
          metaEdName: inlineName,
          referencedEntity: inlineCommon,
        }),
      ],
      data: {
        edfiXsd: {
        },
      },
    });
    metaEd.entity.association.set(association.metaEdName, association);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should add identity properties to association', () => {
    const association: any = metaEd.entity.association.get(entityName);
    expect(association.properties[0].type).toBe('common');
    expect(association.data.edfiXsd.xsd_IdentityProperties.length).toBe(1);
    expect(association.data.edfiXsd.xsd_IdentityProperties[0].xsd_Name).toBe(propertyName2);
  });
});
