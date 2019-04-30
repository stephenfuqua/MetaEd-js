import { newDescriptorProperty, newMetaEdEnvironment } from 'metaed-core';
import { DescriptorProperty, MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../../src/model/property/DescriptorProperty';

describe('when DescriptorProperty enhances descriptor property', () => {
  const descriptorPropertyName = 'DescriptorPropertyName';
  let descriptorProperty: DescriptorProperty;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    descriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: descriptorPropertyName,
    });
    metaEd.propertyIndex.descriptor.push(descriptorProperty);
    enhance(metaEd);
  });

  it('should have ods name with descriptor suffix', () => {
    expect(descriptorProperty.data.edfiOds.odsName).toBe(`${descriptorPropertyName}Descriptor`);
  });

  it('should have ods descriptorified base name with descriptor suffix', () => {
    expect(descriptorProperty.data.edfiOds.odsDescriptorifiedBaseName).toBe(`${descriptorPropertyName}Descriptor`);
  });
});

describe('when DescriptorProperty enhances descriptor property role name', () => {
  const descriptorPropertyName = 'DescriptorPropertyName';
  const contextName = 'ContextName';
  let descriptorProperty: DescriptorProperty;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    descriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: descriptorPropertyName,
      roleName: contextName,
    });
    metaEd.propertyIndex.descriptor.push(descriptorProperty);
    enhance(metaEd);
  });

  it('should have ods name with descriptor suffix and context prefix', () => {
    expect(descriptorProperty.data.edfiOds.odsName).toBe(`${contextName}${descriptorPropertyName}Descriptor`);
  });

  it('should have ods descriptorified base name with descriptor suffix', () => {
    expect(descriptorProperty.data.edfiOds.odsDescriptorifiedBaseName).toBe(`${descriptorPropertyName}Descriptor`);
  });
});

describe('when DescriptorProperty enhances descriptor property with descriptor suffix', () => {
  const descriptorPropertyName = 'DescriptorPropertyName';
  let descriptorProperty: DescriptorProperty;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    descriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: `${descriptorPropertyName}Descriptor`,
    });
    metaEd.propertyIndex.descriptor.push(descriptorProperty);
    enhance(metaEd);
  });

  it('should have ods name with normalized descriptor suffix', () => {
    expect(descriptorProperty.data.edfiOds.odsName).toBe(`${descriptorPropertyName}Descriptor`);
  });

  it('should have ods descriptorified base name normalized descriptor suffix', () => {
    expect(descriptorProperty.data.edfiOds.odsDescriptorifiedBaseName).toBe(`${descriptorPropertyName}Descriptor`);
  });
});
