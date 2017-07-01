// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { Association } from '../../../../src/core/model/Association';
import { associationFactory } from '../../../../src/core/model/Association';
import type { AssociationSubclass } from '../../../../src/core/model/AssociationSubclass';
import { associationSubclassFactory } from '../../../../src/core/model/AssociationSubclass';
import type { AssociationExtension } from '../../../../src/core/model/AssociationExtension';
import { associationExtensionFactory } from '../../../../src/core/model/AssociationExtension';
import { enhance } from '../../../../src/plugin/unified/enhancer/AssociationExtensionBaseClassEnhancer';

describe('when enhancing association extension referring to association', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Association;
  let childEntity: AssociationExtension;

  beforeAll(() => {
    parentEntity = Object.assign(associationFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(associationExtensionFactory(), {
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
    parentEntity = Object.assign(associationSubclassFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.associationSubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(associationExtensionFactory(), {
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
