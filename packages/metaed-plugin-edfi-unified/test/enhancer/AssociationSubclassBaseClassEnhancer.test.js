// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { Association } from '../../../../packages/metaed-core/src/model/Association';
import { newAssociation } from '../../../../packages/metaed-core/src/model/Association';
import type { AssociationSubclass } from '../../../../packages/metaed-core/src/model/AssociationSubclass';
import { newAssociationSubclass } from '../../../../packages/metaed-core/src/model/AssociationSubclass';
import { enhance } from '../../src/enhancer/AssociationSubclassBaseClassEnhancer';

describe('when enhancing association subclass referring to association', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: Association;
  let childEntity: AssociationSubclass;

  beforeAll(() => {
    parentEntity = Object.assign(newAssociation(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationSubclass(), {
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
    parentEntity = Object.assign(newAssociationSubclass(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.associationSubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationSubclass(), {
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
