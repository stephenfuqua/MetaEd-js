// @flow
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
  let property: DecimalProperty;
  let referencedEntity: DecimalType;

  beforeAll(() => {
    property = Object.assign(decimalPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.decimal.push(property);

    referencedEntity = Object.assign(decimalTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.decimalType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(referencedEntity.referringSimpleProperties).toContain(property);
  });
});

describe('when enhancing shared decimal property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: SharedDecimalProperty;
  let referencedEntity: DecimalType;

  beforeAll(() => {
    property = Object.assign(sharedDecimalPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedDecimal.push(property);

    referencedEntity = Object.assign(decimalTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.decimalType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(referencedEntity.referringSimpleProperties).toContain(property);
  });
});
