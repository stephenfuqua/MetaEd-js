// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { DomainEntity } from '../../../../packages/metaed-core/src/model/DomainEntity';
import { newDomainEntity } from '../../../../packages/metaed-core/src/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import { newDomainEntitySubclass } from '../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import { enhance } from '../../src/enhancer/DomainEntitySubclassBaseClassEnhancer';

describe('when enhancing domainEntity subclass referring to domainEntity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntitySubclass;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.domainEntitySubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity subclass referring to domainEntity subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: DomainEntitySubclass;
  let childEntity: DomainEntitySubclass;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.domainEntitySubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
