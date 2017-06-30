// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { DescriptorProperty } from '../../../../../src/core/model/property/DescriptorProperty';
import { descriptorPropertyFactory } from '../../../../../src/core/model/property/DescriptorProperty';
import type { Descriptor } from '../../../../../src/core/model/Descriptor';
import { descriptorFactory } from '../../../../../src/core/model/Descriptor';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/DescriptorReferenceEnhancer';

describe('when enhancing descriptor property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DescriptorProperty = Object.assign(descriptorPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.descriptor.push(property);

    const parentEntity: Descriptor = Object.assign(descriptorFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.descriptor.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Descriptor = Object.assign(descriptorFactory(), {
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
