// @flow
import { newMetaEdEnvironment, newDomainEntity, newStringProperty } from '../../../../packages/metaed-core/index';
import type { MetaEdEnvironment, DomainEntity } from '../../../../packages/metaed-core/index';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/CopyPropertiesEnhancer';

describe('when enhancing domainEntity with string properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const propertyName1: string = 'PropertyName1';
  const propertyName2: string = 'PropertyName2';

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      properties: [
        Object.assign(newStringProperty(), {
          metaEdName: propertyName1,
          isPartOfIdentity: false,
        }),
        Object.assign(newStringProperty(), {
          metaEdName: propertyName2,
          isPartOfIdentity: true,
        }),
      ],
      data: {
        edfiXsd: {
        },
      },
    });
    metaEd.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should add identity properties to domainEntity', () => {
    const domainEntity: any = metaEd.entity.domainEntity.get(entityName);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties.length).toBe(2);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties[0].metaEdName).toBe(propertyName1);
    expect(domainEntity.data.edfiXsd.xsd_IdentityProperties[1].metaEdName).toBe(propertyName2);
  });
});
