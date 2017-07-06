// @flow
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { DecimalProperty } from '../../../../../packages/metaed-core/src/model/property/DecimalProperty';
import { newDecimalProperty } from '../../../../../packages/metaed-core/src/model/property/DecimalProperty';
import type { SharedDecimalProperty } from '../../../../../packages/metaed-core/src/model/property/SharedDecimalProperty';
import { newSharedDecimalProperty } from '../../../../../packages/metaed-core/src/model/property/SharedDecimalProperty';
import type { DecimalType } from '../../../../../packages/metaed-core/src/model/DecimalType';
import { newDecimalType } from '../../../../../packages/metaed-core/src/model/DecimalType';
import { enhance } from '../../../src/enhancer/property/DecimalReferenceEnhancer';

describe('when enhancing decimal property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: DecimalProperty;
  let referencedEntity: DecimalType;

  beforeAll(() => {
    property = Object.assign(newDecimalProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.decimal.push(property);

    referencedEntity = Object.assign(newDecimalType(), {
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
    property = Object.assign(newSharedDecimalProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedDecimal.push(property);

    referencedEntity = Object.assign(newDecimalType(), {
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
