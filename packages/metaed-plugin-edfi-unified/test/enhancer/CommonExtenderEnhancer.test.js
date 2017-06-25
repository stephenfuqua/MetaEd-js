// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { Common } from '../../../../packages/metaed-core/src/model/Common';
import { commonFactory } from '../../../../packages/metaed-core/src/model/Common';
import type { CommonExtension } from '../../../../packages/metaed-core/src/model/CommonExtension';
import { commonExtensionFactory } from '../../../../packages/metaed-core/src/model/CommonExtension';
import { enhance } from '../../src/enhancer/CommonExtenderEnhancer';

describe('when enhancing parent of common extension', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Common;
  let childEntity: CommonExtension;

  beforeAll(() => {
    parentEntity = Object.assign(commonFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.common.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(commonExtensionFactory(), {
      metaEdName: parentEntityName,
      baseEntity: parentEntity,
    });
    metaEd.entity.commonExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(parentEntity.extender).toBe(childEntity);
  });
});
