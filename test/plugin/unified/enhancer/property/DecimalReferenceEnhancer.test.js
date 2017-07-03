// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { DecimalProperty } from '../../../../../src/core/model/property/DecimalProperty';
import { decimalPropertyFactory } from '../../../../../src/core/model/property/DecimalProperty';
import type { SharedDecimalProperty } from '../../../../../src/core/model/property/SharedDecimalProperty';
import { sharedDecimalPropertyFactory } from '../../../../../src/core/model/property/SharedDecimalProperty';
import type { DecimalType } from '../../../../../src/core/model/DecimalType';
import { decimalTypeFactory } from '../../../../../src/core/model/DecimalType';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/DecimalReferenceEnhancer';


describe('when enhancing decimal property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DecimalProperty = Object.assign(decimalPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.decimal.push(property);

    const referencedEntity: DecimalType = Object.assign(decimalTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.decimalType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.decimal.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing shared decimal property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: SharedDecimalProperty = Object.assign(sharedDecimalPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedDecimal.push(property);

    const referencedEntity: DecimalType = Object.assign(decimalTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.decimalType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.sharedDecimal.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
