// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { Common } from '../../../../packages/metaed-core/src/model/Common';
import { newCommon } from '../../../../packages/metaed-core/src/model/Common';
import type { CommonExtension } from '../../../../packages/metaed-core/src/model/CommonExtension';
import { newCommonExtension } from '../../../../packages/metaed-core/src/model/CommonExtension';
import { enhance } from '../../src/enhancer/CommonExtensionBaseClassEnhancer';

describe('when enhancing common extension referring to common', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Common;
  let childEntity: CommonExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newCommon(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.common.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newCommonExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.commonExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
