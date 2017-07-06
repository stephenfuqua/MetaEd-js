// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { Association } from '../../../../packages/metaed-core/src/model/Association';
import { newAssociation } from '../../../../packages/metaed-core/src/model/Association';
import type { AssociationSubclass } from '../../../../packages/metaed-core/src/model/AssociationSubclass';
import { newAssociationSubclass } from '../../../../packages/metaed-core/src/model/AssociationSubclass';
import type { AssociationExtension } from '../../../../packages/metaed-core/src/model/AssociationExtension';
import { newAssociationExtension } from '../../../../packages/metaed-core/src/model/AssociationExtension';
import { enhance } from '../../src/enhancer/AssociationExtensionBaseClassEnhancer';

describe('when enhancing association extension referring to association', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Association;
  let childEntity: AssociationExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newAssociation(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.associationExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing association extension referring to association subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: AssociationSubclass;
  let childEntity: AssociationExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newAssociationSubclass(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.associationSubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.associationExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
