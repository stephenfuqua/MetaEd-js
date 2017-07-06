// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { DescriptorProperty } from '../../../../../packages/metaed-core/src/model/property/DescriptorProperty';
import { newDescriptorProperty } from '../../../../../packages/metaed-core/src/model/property/DescriptorProperty';
import type { Descriptor } from '../../../../../packages/metaed-core/src/model/Descriptor';
import { newDescriptor } from '../../../../../packages/metaed-core/src/model/Descriptor';
import { enhance } from '../../../src/enhancer/property/DescriptorReferenceEnhancer';

describe('when enhancing descriptor property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DescriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.descriptor.push(property);

    const parentEntity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.descriptor.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.descriptor.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.descriptor.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
