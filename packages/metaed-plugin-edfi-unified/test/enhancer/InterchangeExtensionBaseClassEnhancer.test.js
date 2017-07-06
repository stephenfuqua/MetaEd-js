// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { Interchange } from '../../../../packages/metaed-core/src/model/Interchange';
import { newInterchange } from '../../../../packages/metaed-core/src/model/Interchange';
import type { InterchangeExtension } from '../../../../packages/metaed-core/src/model/InterchangeExtension';
import { newInterchangeExtension } from '../../../../packages/metaed-core/src/model/InterchangeExtension';
import { enhance } from '../../src/enhancer/InterchangeExtensionBaseClassEnhancer';

describe('when enhancing interchange extension referring to interchange', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Interchange;
  let childEntity: InterchangeExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newInterchange(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.interchange.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newInterchangeExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
    });
    metaEd.entity.interchangeExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
