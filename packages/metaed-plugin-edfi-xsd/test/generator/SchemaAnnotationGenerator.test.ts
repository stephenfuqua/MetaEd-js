import xmlParser from 'xml-js';
import { addEntityForNamespace, newBooleanProperty, newDescriptor, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Descriptor } from 'metaed-core';
import { addEdFiXsdEntityRepositoryTo } from '../../src/model/EdFiXsdEntityRepository';
import { createSchema } from './GeneratorTestBase';
import { generate } from '../../src/generator/SchemaAnnotationGenerator';

describe('when generating schema annotation for a single descriptor', (): void => {
  const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), {
    dataStandardVersion: '2.1.0',
  });
  const schema = createSchema('200', 'Schema Documentation');
  const namespace = Object.assign(newNamespace(), {
    namespaceName: 'EdFi',
    projectExtension: 'EXTENSION',
    data: {
      edfiXsd: {
        xsdSchema: schema,
      },
    },
  });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const xsdDescriptorName = 'DescriptorNameDescriptor';
  let descriptorElement;

  beforeAll(async () => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: 'DescriptorName',
      namespace,
      documentation: 'DescriptorDocumentation',
      data: {
        edfiXsd: {
          xsdDescriptorName,
          xsdDescriptorNameWithExtension: 'XsdDescriptorNameExtension',
          xsdIsMapType: false,
          xsdHasPropertiesOrMapType: false,
        },
      },
      properties: [
        Object.assign(newBooleanProperty(), {
          namespace,
          metaEdName: 'BooleanPropertyName',
          documentation: 'PropertyDocumentation',
          isRequired: false,
        }),
      ],
    });
    addEntityForNamespace(descriptor);

    const rawXsd = (await generate(metaEd)).generatedOutput[0].resultString;
    [, descriptorElement] = xmlParser.xml2js(rawXsd).elements[1].elements;
  });

  it('should be simple type for descriptor list', (): void => {
    expect(descriptorElement.name).toBe('xs:simpleType');
  });

  it('should be token restriction for descriptor list', (): void => {
    expect(descriptorElement.elements[1].name).toBe('xs:restriction');
    expect(descriptorElement.elements[1].attributes.base).toBe('xs:token');
  });

  it('should have single descriptor', (): void => {
    expect(descriptorElement.elements[1].elements).toHaveLength(1);
    expect(descriptorElement.elements[1].elements[0].name).toBe('xs:enumeration');
    expect(descriptorElement.elements[1].elements[0].attributes.value).toBe(xsdDescriptorName);
  });
});
