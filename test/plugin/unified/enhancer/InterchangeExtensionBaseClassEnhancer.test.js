// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { Interchange } from '../../../../src/core/model/Interchange';
import { interchangeFactory } from '../../../../src/core/model/Interchange';
import type { InterchangeExtension } from '../../../../src/core/model/InterchangeExtension';
import { interchangeExtensionFactory } from '../../../../src/core/model/InterchangeExtension';
import { enhance } from '../../../../src/plugin/unified/enhancer/InterchangeExtensionBaseClassEnhancer';

describe('when enhancing interchange extension referring to interchange', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Interchange;
  let childEntity: InterchangeExtension;

  beforeAll(() => {
    parentEntity = Object.assign(interchangeFactory(), {
      metaEdName: parentEntityName,
    });
    metaEd.entity.interchange.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(interchangeExtensionFactory(), {
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
