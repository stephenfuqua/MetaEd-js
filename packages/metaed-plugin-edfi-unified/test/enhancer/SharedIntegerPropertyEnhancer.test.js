// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import { newSharedIntegerProperty } from '../../../../packages/metaed-core/src/model/property/SharedIntegerProperty';
import { newIntegerType } from '../../../../packages/metaed-core/src/model/IntegerType';
import { enhance } from '../../src/enhancer/SharedIntegerPropertyEnhancer';
import { addProperty } from '../../../../packages/metaed-core/src/model/property/PropertyRepository';
import { newSharedShortProperty } from '../../../../packages/metaed-core/src/model/property/SharedShortProperty';

describe('when shared integer property refers to a shared integer', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const metaEdName: string = 'ReferencedEntityName';

  const maxValue = '100';
  const minValue = '1';

  beforeAll(() => {
    const referencedEntity = Object.assign(newIntegerType(), {
      metaEdName, maxValue, minValue,
    });

    const property = Object.assign(newSharedIntegerProperty(), {
      metaEdName,
      referencedEntity,
    });
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have the shared integer restrictions', () => {
    const property = R.head(metaEd.propertyIndex.sharedInteger.filter(p => p.metaEdName === metaEdName));
    expect(property.maxValue).toBe(maxValue);
    expect(property.minValue).toBe(minValue);
  });
});

describe('when shared short property refers to a shared short', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const metaEdName: string = 'ReferencedEntityName';

  const maxValue = '100';
  const minValue = '1';

  beforeAll(() => {
    const referencedEntity = Object.assign(newIntegerType(), {
      metaEdName, maxValue, minValue,
    });

    const property = Object.assign(newSharedShortProperty(), {
      metaEdName,
      referencedEntity,
    });
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have the shared integer restrictions', () => {
    const property = R.head(metaEd.propertyIndex.sharedShort.filter(p => p.metaEdName === metaEdName));
    expect(property.maxValue).toBe(maxValue);
    expect(property.minValue).toBe(minValue);
  });
});
