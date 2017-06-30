// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { DomainEntityProperty } from '../../../../../src/core/model/property/DomainEntityProperty';
import { domainEntityPropertyFactory } from '../../../../../src/core/model/property/DomainEntityProperty';
import type { DomainEntity } from '../../../../../src/core/model/DomainEntity';
import { domainEntityFactory } from '../../../../../src/core/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../../src/core/model/DomainEntitySubclass';
import { domainEntitySubclassFactory } from '../../../../../src/core/model/DomainEntitySubclass';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/DomainEntityReferenceEnhancer';

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
