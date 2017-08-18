// @flow
import { newMetaEdEnvironment, newDescriptor } from '../../../../packages/metaed-core/index';
import type { MetaEdEnvironment, Descriptor } from '../../../../packages/metaed-core/index';
import { enhance } from '../../src/model/Descriptor';

xdescribe('when descriptor setup enhancer runs', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: Descriptor;

  beforeAll(() => {
    parentEntity = Object.assign(newDescriptor(), {
      metaEdName: parentEntityName,
      data: { edfiXsd: {} },
    });
    metaEd.entity.descriptor.set(parentEntity.metaEdName, parentEntity);

    enhance(metaEd);
  });

  it('should work', () => {
    expect(parentEntity.data.edfiXsd.xsd_DescriptorName).toBe(parentEntityName);
  });
});
