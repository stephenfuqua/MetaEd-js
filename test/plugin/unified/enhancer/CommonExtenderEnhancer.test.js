// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { Common } from '../../../../src/core/model/Common';
import { commonFactory } from '../../../../src/core/model/Common';
import type { CommonExtension } from '../../../../src/core/model/CommonExtension';
import { commonExtensionFactory } from '../../../../src/core/model/CommonExtension';
import { enhance } from '../../../../src/plugin/unified/enhancer/CommonExtenderEnhancer';

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
