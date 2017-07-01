// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { DomainEntity } from '../../../../src/core/model/DomainEntity';
import { domainEntityFactory } from '../../../../src/core/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../src/core/model/DomainEntitySubclass';
import { domainEntitySubclassFactory } from '../../../../src/core/model/DomainEntitySubclass';
import type { DomainEntityExtension } from '../../../../src/core/model/DomainEntityExtension';
import { domainEntityExtensionFactory } from '../../../../src/core/model/DomainEntityExtension';
import { enhance } from '../../../../src/plugin/unified/enhancer/DomainEntityExtensionBaseClassEnhancer';

describe('when enhancing domainEntity extension referring to domainEntity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntityExtension;

  beforeAll(() => {
    parentEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(domainEntityExtensionFactory(), {
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
    parentEntity = Object.assign(domainEntitySubclassFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(domainEntityExtensionFactory(), {
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
