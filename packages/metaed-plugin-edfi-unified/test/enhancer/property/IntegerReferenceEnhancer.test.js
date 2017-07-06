// @flow
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { IntegerProperty } from '../../../../../packages/metaed-core/src/model/property/IntegerProperty';
import { newIntegerProperty } from '../../../../../packages/metaed-core/src/model/property/IntegerProperty';
import type { SharedIntegerProperty } from '../../../../../packages/metaed-core/src/model/property/SharedIntegerProperty';
import { newSharedIntegerProperty } from '../../../../../packages/metaed-core/src/model/property/SharedIntegerProperty';
import type { IntegerType } from '../../../../../packages/metaed-core/src/model/IntegerType';
import { newIntegerType } from '../../../../../packages/metaed-core/src/model/IntegerType';
import { enhance } from '../../../src/enhancer/property/IntegerReferenceEnhancer';


describe('when enhancing integer property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: IntegerProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newIntegerProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.integer.push(property);

    referencedEntity = Object.assign(newIntegerType(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.integerType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(referencedEntity.referringSimpleProperties).toContain(property);
  });
});

describe('when enhancing shared integer property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: SharedIntegerProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newSharedIntegerProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedInteger.push(property);

    referencedEntity = Object.assign(newIntegerType(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.integerType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(referencedEntity.referringSimpleProperties).toContain(property);
  });
});
