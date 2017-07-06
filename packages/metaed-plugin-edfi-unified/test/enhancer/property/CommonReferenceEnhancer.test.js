// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { CommonProperty } from '../../../../../packages/metaed-core/src/model/property/CommonProperty';
import { newCommonProperty } from '../../../../../packages/metaed-core/src/model/property/CommonProperty';
import type { Common } from '../../../../../packages/metaed-core/src/model/Common';
import { newCommon } from '../../../../../packages/metaed-core/src/model/Common';
import { enhance } from '../../../src/enhancer/property/CommonReferenceEnhancer';

describe('when enhancing common property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: CommonProperty = Object.assign(newCommonProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.common.push(property);

    const parentEntity: Common = Object.assign(newCommon(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.common.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Common = Object.assign(newCommon(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.common.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.common.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
