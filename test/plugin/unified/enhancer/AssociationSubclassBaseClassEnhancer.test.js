// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { Association } from '../../../../src/core/model/Association';
import { associationFactory } from '../../../../src/core/model/Association';
import type { AssociationSubclass } from '../../../../src/core/model/AssociationSubclass';
import { associationSubclassFactory } from '../../../../src/core/model/AssociationSubclass';
import { enhance } from '../../../../src/plugin/unified/enhancer/AssociationSubclassBaseClassEnhancer';

describe('when enhancing association subclass referring to association', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: Association;
  let childEntity: AssociationSubclass;

  beforeAll(() => {
    parentEntity = Object.assign(associationFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(associationSubclassFactory(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.associationSubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing association subclass referring to association subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: AssociationSubclass;
  let childEntity: AssociationSubclass;

  beforeAll(() => {
    parentEntity = Object.assign(associationSubclassFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.associationSubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(associationSubclassFactory(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.associationSubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
