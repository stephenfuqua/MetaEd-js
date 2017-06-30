// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { InlineCommonProperty } from '../../../../../src/core/model/property/InlineCommonProperty';
import { inlineCommonPropertyFactory } from '../../../../../src/core/model/property/InlineCommonProperty';
import { inlineCommonFactory } from '../../../../../src/core/model/Common';
import type { Common } from '../../../../../src/core/model/Common';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/InlineCommonReferenceEnhancer';

describe('when enhancing inlineCommon property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: InlineCommonProperty = Object.assign(inlineCommonPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.inlineCommon.push(property);

    const parentEntity: Common = Object.assign(inlineCommonFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.common.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Common = Object.assign(inlineCommonFactory(), {
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
