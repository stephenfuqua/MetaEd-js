// @flow
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ShortProperty } from '../../../../../packages/metaed-core/src/model/property/ShortProperty';
import { newShortProperty } from '../../../../../packages/metaed-core/src/model/property/ShortProperty';
import type { SharedShortProperty } from '../../../../../packages/metaed-core/src/model/property/SharedShortProperty';
import { newSharedShortProperty } from '../../../../../packages/metaed-core/src/model/property/SharedShortProperty';
import type { IntegerType } from '../../../../../packages/metaed-core/src/model/IntegerType';
import { newIntegerType } from '../../../../../packages/metaed-core/src/model/IntegerType';
import { enhance } from '../../../src/enhancer/property/ShortReferenceEnhancer';


describe('when enhancing short property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: ShortProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newShortProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.short.push(property);

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

describe('when enhancing shared short property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: SharedShortProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newSharedShortProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedShort.push(property);

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
