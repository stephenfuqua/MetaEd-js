// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import { newSharedStringProperty } from '../../../../packages/metaed-core/src/model/property/SharedStringProperty';
import { newStringType } from '../../../../packages/metaed-core/src/model/StringType';
import { enhance } from '../../src/enhancer/SharedStringPropertyEnhancer';
import { addProperty } from '../../../../packages/metaed-core/src/model/property/PropertyRepository';

describe('when shared string property refers to a shared string', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const metaEdName: string = 'ReferencedEntityName';

  const maxLength = '100';
  const minLength = '1';

  beforeAll(() => {
    const referencedEntity = Object.assign(newStringType(), {
      metaEdName, maxLength, minLength,
    });

    const property = Object.assign(newSharedStringProperty(), {
      metaEdName,
      referencedEntity,
    });
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have the shared string restrictions', () => {
    const property = R.head(metaEd.propertyIndex.sharedString.filter(p => p.metaEdName === metaEdName));
    expect(property.maxLength).toBe(maxLength);
    expect(property.minLength).toBe(minLength);
  });
});
