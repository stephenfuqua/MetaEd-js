// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { DomainEntity } from '../../../../packages/metaed-core/src/model/DomainEntity';
import { newDomainEntity } from '../../../../packages/metaed-core/src/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import { newDomainEntitySubclass } from '../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import type { DomainEntityExtension } from '../../../../packages/metaed-core/src/model/DomainEntityExtension';
import { newDomainEntityExtension } from '../../../../packages/metaed-core/src/model/DomainEntityExtension';
import { enhance } from '../../src/enhancer/DomainEntityExtensionBaseClassEnhancer';

describe('when enhancing domainEntity extension referring to domainEntity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntityExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntityExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.domainEntityExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity extension referring to domainEntity subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: DomainEntitySubclass;
  let childEntity: DomainEntityExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntityExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.domainEntityExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
