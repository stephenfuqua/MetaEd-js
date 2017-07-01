// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { DomainEntity } from '../../../../src/core/model/DomainEntity';
import { domainEntityFactory } from '../../../../src/core/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../src/core/model/DomainEntitySubclass';
import { domainEntitySubclassFactory } from '../../../../src/core/model/DomainEntitySubclass';
import { enhance } from '../../../../src/plugin/unified/enhancer/DomainEntitySubclassBaseClassEnhancer';

describe('when enhancing domainEntity subclass referring to domainEntity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntitySubclass;

  beforeAll(() => {
    parentEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(domainEntitySubclassFactory(), {
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
    parentEntity = Object.assign(domainEntitySubclassFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(domainEntitySubclassFactory(), {
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
