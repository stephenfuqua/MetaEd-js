// @flow
import R from 'ramda';
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

  beforeAll(() => {
    const property: ShortProperty = Object.assign(shortPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.short.push(property);

    const referencedEntity: IntegerType = Object.assign(integerTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.integerType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.short.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing shared short property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: SharedShortProperty = Object.assign(sharedShortPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedShort.push(property);

    const referencedEntity: IntegerType = Object.assign(integerTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.integerType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.sharedShort.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
