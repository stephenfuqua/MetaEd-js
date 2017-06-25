// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { DomainEntityProperty } from '../../../../../packages/metaed-core/src/model/property/DomainEntityProperty';
import { domainEntityPropertyFactory } from '../../../../../packages/metaed-core/src/model/property/DomainEntityProperty';
import type { DomainEntity } from '../../../../../packages/metaed-core/src/model/DomainEntity';
import { domainEntityFactory } from '../../../../../packages/metaed-core/src/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import { domainEntitySubclassFactory } from '../../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import { enhance } from '../../../src/enhancer/property/DomainEntityReferenceEnhancer';

describe('when enhancing domainEntity property referring to domainEntity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DomainEntityProperty = Object.assign(domainEntityPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.domainEntity.push(property);

    const parentEntity: DomainEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: DomainEntity = Object.assign(domainEntityFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.domainEntity.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing domainEntity property referring to subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DomainEntityProperty = Object.assign(domainEntityPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.domainEntity.push(property);

    const parentEntity: DomainEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: DomainEntitySubclass = Object.assign(domainEntitySubclassFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.domainEntitySubclass.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
