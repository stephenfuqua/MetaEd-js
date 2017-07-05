// @flow
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { ShortProperty } from '../../../../../src/core/model/property/ShortProperty';
import { shortPropertyFactory } from '../../../../../src/core/model/property/ShortProperty';
import type { SharedShortProperty } from '../../../../../src/core/model/property/SharedShortProperty';
import { sharedShortPropertyFactory } from '../../../../../src/core/model/property/SharedShortProperty';
import type { IntegerType } from '../../../../../src/core/model/IntegerType';
import { integerTypeFactory } from '../../../../../src/core/model/IntegerType';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/ShortReferenceEnhancer';


describe('when enhancing short property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: ShortProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(shortPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.short.push(property);

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

describe('when enhancing shared short property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: SharedShortProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(sharedShortPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedShort.push(property);

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
