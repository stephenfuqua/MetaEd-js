// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import { sharedDecimalPropertyFactory } from '../../../../src/core/model/property/SharedDecimalProperty';
import { decimalTypeFactory } from '../../../../src/core/model/DecimalType';
import { enhance } from '../../../../src/plugin/unified/enhancer/SharedDecimalPropertyEnhancer';
import { addProperty } from '../../../../src/core/model/property/PropertyRepository';

describe('when shared decimal property refers to a shared decimal', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const metaEdName: string = 'ReferencedEntityName';

  const totalDigits = '5';
  const decimalPlaces = '4';
  const maxValue = '100';
  const minValue = '1';

  beforeAll(() => {
    const referencedEntity = Object.assign(decimalTypeFactory(), {
      metaEdName, totalDigits, decimalPlaces, maxValue, minValue,
    });

    const property = Object.assign(sharedDecimalPropertyFactory(), {
      metaEdName,
      referencedEntity,
    });
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have the shared decimal restrictions', () => {
    const property = R.head(metaEd.propertyIndex.sharedDecimal.filter(p => p.metaEdName === metaEdName));
    expect(property.totalDigits).toBe(totalDigits);
    expect(property.decimalPlaces).toBe(decimalPlaces);
    expect(property.maxValue).toBe(maxValue);
    expect(property.minValue).toBe(minValue);
  });
});
