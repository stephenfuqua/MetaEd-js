// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { InlineCommonProperty } from '../../../../../packages/metaed-core/src/model/property/InlineCommonProperty';
import { newInlineCommonProperty } from '../../../../../packages/metaed-core/src/model/property/InlineCommonProperty';
import { newInlineCommon } from '../../../../../packages/metaed-core/src/model/Common';
import type { Common } from '../../../../../packages/metaed-core/src/model/Common';
import { enhance } from '../../../src/enhancer/property/InlineCommonReferenceEnhancer';

describe('when enhancing inlineCommon property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: InlineCommonProperty = Object.assign(newInlineCommonProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.inlineCommon.push(property);

    const parentEntity: Common = Object.assign(newInlineCommon(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.common.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Common = Object.assign(newInlineCommon(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.common.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.inlineCommon.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
