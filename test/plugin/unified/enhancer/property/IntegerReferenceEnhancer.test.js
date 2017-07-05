// @flow
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { IntegerProperty } from '../../../../../src/core/model/property/IntegerProperty';
import { integerPropertyFactory } from '../../../../../src/core/model/property/IntegerProperty';
import type { SharedIntegerProperty } from '../../../../../src/core/model/property/SharedIntegerProperty';
import { sharedIntegerPropertyFactory } from '../../../../../src/core/model/property/SharedIntegerProperty';
import type { IntegerType } from '../../../../../src/core/model/IntegerType';
import { integerTypeFactory } from '../../../../../src/core/model/IntegerType';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/IntegerReferenceEnhancer';


describe('when enhancing integer property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: IntegerProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(integerPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.integer.push(property);

    referencedEntity = Object.assign(integerTypeFactory(), {
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
    property = Object.assign(sharedIntegerPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedInteger.push(property);

    referencedEntity = Object.assign(integerTypeFactory(), {
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
