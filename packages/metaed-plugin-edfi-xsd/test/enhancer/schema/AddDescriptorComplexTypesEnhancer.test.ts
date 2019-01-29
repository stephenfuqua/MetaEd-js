import {
  newMetaEdEnvironment,
  newDescriptor,
  newMapTypeEnumeration,
  newBooleanProperty,
  newDescriptorProperty,
  newNamespace,
} from 'metaed-core';
import { MetaEdEnvironment, Descriptor, MapTypeEnumeration, Namespace } from 'metaed-core';
import { ComplexType } from '../../../src/model/schema/ComplexType';
import { Element } from '../../../src/model/schema/Element';
import { NoComplexType } from '../../../src/model/schema/ComplexType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { addDescriptorPropertyEdfiXsdTo } from '../../../src/model/property/DescriptorProperty';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddDescriptorComplexTypesEnhancer';

describe('when enhancing descriptor', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'ComplexTypeName';
  const complexTypeDescriptorName: string = `${complexTypeName}Descriptor`;
  const complexTypeDescriptorNameWithExtension: string = `${projectExtension}-${complexTypeDescriptorName}`;
  const documentation = 'Documentation';
  let enhancedItem: Descriptor;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdLookupType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeDescriptorName,
          xsdDescriptorNameWithExtension: complexTypeDescriptorNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
    createdReferenceType = enhancedItem.data.edfiXsd.xsdReferenceType;
    createdLookupType = enhancedItem.data.edfiXsd.xsdLookupType;
    createdIdentityType = enhancedItem.data.edfiXsd.xsdIdentityType;
  });

  it('should create complex type', () => {
    expect(createdComplexType).toBeDefined();
  });

  it('should have annotation documentation assigned', () => {
    expect(createdComplexType.annotation).toBeDefined();
    expect(createdComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned', () => {
    expect(createdComplexType.annotation.typeGroup).toBe('Descriptor');
  });

  it('should have base type assigned', () => {
    expect(createdComplexType.baseType).toBe('DescriptorType');
  });

  it('should have name assigned', () => {
    expect(createdComplexType.name).toBe(complexTypeDescriptorNameWithExtension);
  });

  it('should not have items', () => {
    expect(createdComplexType.items.length).toBe(0);
  });

  it('should not create reference type', () => {
    expect(createdReferenceType).toBe(NoComplexType);
  });

  it('should not have reference type items', () => {
    expect(createdReferenceType.items.length).toBe(0);
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });

  it('should not create lookup type', () => {
    expect(createdLookupType).toBe(NoComplexType);
  });
});

describe('when enhancing descriptor with required map type', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'ComplexTypeName';
  const complexTypeDescriptorName: string = `${complexTypeName}Descriptor`;
  const complexTypeDescriptorNameWithExtension: string = `${projectExtension}-${complexTypeDescriptorName}`;
  const documentation = 'Documentation';
  const mapTypeName = 'MapTypeName';
  const enumerationName = 'EnumerationName';
  const enumerationNameWithExtension: string = `${projectExtension}-${enumerationName}`;

  let enhancedItem: Descriptor;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdLookupType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: mapTypeName,
      documentation,
      data: {
        edfiXsd: {
          xsdEnumerationName: enumerationName,
          xsdEnumerationNameWithExtension: enumerationNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(mapTypeEnumeration);
    namespace.entity.mapTypeEnumeration.set(mapTypeEnumeration.metaEdName, mapTypeEnumeration);

    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      isMapTypeRequired: true,
      isMapTypeOptional: false,
      mapTypeEnumeration,
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeDescriptorName,
          xsdDescriptorNameWithExtension: complexTypeDescriptorNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
    createdReferenceType = enhancedItem.data.edfiXsd.xsdReferenceType;
    createdLookupType = enhancedItem.data.edfiXsd.xsdLookupType;
    createdIdentityType = enhancedItem.data.edfiXsd.xsdIdentityType;
  });

  it('should create complex type', () => {
    expect(createdComplexType).toBeDefined();
  });

  it('should have annotation documentation assigned', () => {
    expect(createdComplexType.annotation).toBeDefined();
    expect(createdComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned', () => {
    expect(createdComplexType.annotation.typeGroup).toBe('Descriptor');
  });

  it('should have base type assigned', () => {
    expect(createdComplexType.baseType).toBe('DescriptorType');
  });

  it('should have name assigned', () => {
    expect(createdComplexType.name).toBe(complexTypeDescriptorNameWithExtension);
  });

  it('should not have items', () => {
    expect(createdComplexType.items.length).toBe(1);

    const mapTypeItem: Element = createdComplexType.items[0] as Element;
    expect(mapTypeItem).toBeDefined();
    expect(mapTypeItem.name).toBe(mapTypeName);
    expect(mapTypeItem.type).toBe(enumerationNameWithExtension);
    expect(mapTypeItem.annotation).toBeDefined();
    expect(mapTypeItem.minOccurs).toBe('');
  });

  it('should not create reference type', () => {
    expect(createdReferenceType).toBe(NoComplexType);
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });

  it('should not create lookup type', () => {
    expect(createdLookupType).toBe(NoComplexType);
  });
});

describe('when enhancing descriptor with optional map type', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'ComplexTypeName';
  const complexTypeDescriptorName: string = `${complexTypeName}Descriptor`;
  const complexTypeDescriptorNameWithExtension: string = `${projectExtension}-${complexTypeDescriptorName}`;
  const documentation = 'Documentation';
  const mapTypeName = 'MapTypeName';
  const enumerationName = 'EnumerationName';
  const enumerationNameWithExtension: string = `${projectExtension}-${enumerationName}`;

  let enhancedItem: Descriptor;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdLookupType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: mapTypeName,
      documentation,
      data: {
        edfiXsd: {
          xsdEnumerationName: enumerationName,
          xsdEnumerationNameWithExtension: enumerationNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(mapTypeEnumeration);
    namespace.entity.mapTypeEnumeration.set(mapTypeEnumeration.metaEdName, mapTypeEnumeration);

    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      isMapTypeRequired: false,
      isMapTypeOptional: true,
      mapTypeEnumeration,
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeDescriptorName,
          xsdDescriptorNameWithExtension: complexTypeDescriptorNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
    createdReferenceType = enhancedItem.data.edfiXsd.xsdReferenceType;
    createdLookupType = enhancedItem.data.edfiXsd.xsdLookupType;
    createdIdentityType = enhancedItem.data.edfiXsd.xsdIdentityType;
  });

  it('should create complex type', () => {
    expect(createdComplexType).toBeDefined();
  });

  it('should have annotation documentation assigned', () => {
    expect(createdComplexType.annotation).toBeDefined();
    expect(createdComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned', () => {
    expect(createdComplexType.annotation.typeGroup).toBe('Descriptor');
  });

  it('should have base type assigned', () => {
    expect(createdComplexType.baseType).toBe('DescriptorType');
  });

  it('should have name assigned', () => {
    expect(createdComplexType.name).toBe(complexTypeDescriptorNameWithExtension);
  });

  it('should not have items', () => {
    expect(createdComplexType.items.length).toBe(1);

    const mapTypeItem: Element = createdComplexType.items[0] as Element;
    expect(mapTypeItem).toBeDefined();
    expect(mapTypeItem.name).toBe(mapTypeName);
    expect(mapTypeItem.type).toBe(enumerationNameWithExtension);
    expect(mapTypeItem.annotation).toBeDefined();
    expect(mapTypeItem.minOccurs).toBe('0');
  });

  it('should not create reference type', () => {
    expect(createdReferenceType).toBe(NoComplexType);
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });

  it('should not create lookup type', () => {
    expect(createdLookupType).toBe(NoComplexType);
  });
});

describe('when enhancing descriptor with property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'ComplexTypeName';
  const complexTypeNameWithExtension: string = `${projectExtension}-${complexTypeName}`;
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyType = 'PropertyType';
  const propertyDocumentation = 'PropertyDocumentation';

  let enhancedItem: Descriptor;
  let createdComplexType: ComplexType;

  beforeAll(() => {
    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      properties: [
        Object.assign(newBooleanProperty(), {
          metaEdName: propertyName,
          documentation: propertyDocumentation,
          data: {
            edfiXsd: {
              xsdName: propertyName,
              xsdType: propertyType,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeName,
          xsdDescriptorNameWithExtension: complexTypeNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
  });

  it('should have items', () => {
    expect(createdComplexType.items.length).toBe(1);
  });

  it('should create complex type item element', () => {
    const complexTypeItem: Element = createdComplexType.items[0] as Element;
    expect(complexTypeItem.name).toBe(propertyName);
    expect(complexTypeItem.type).toBe(propertyType);
    expect(complexTypeItem.annotation.documentation).toBe(propertyDocumentation);
    expect(complexTypeItem.annotation.descriptorName).toBe('');
    expect(complexTypeItem.minOccurs).toBe('');
    expect(complexTypeItem.maxOccursIsUnbounded).toBe(false);
  });
});

describe('when enhancing descriptor with property and map type', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'ComplexTypeName';
  const complexTypeNameWithExtension: string = `${projectExtension}-${complexTypeName}`;
  const documentation = 'Documentation';
  const mapTypeName = 'MapTypeName';
  const enumerationName = 'EnumerationName';
  const enumerationNameWithExtension: string = `${projectExtension}-${enumerationName}`;
  const propertyName = 'PropertyName';
  const propertyType = 'PropertyType';
  const propertyDocumentation = 'PropertyDocumentation';

  let enhancedItem: Descriptor;
  let createdComplexType: ComplexType;

  beforeAll(() => {
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: mapTypeName,
      documentation,
      data: {
        edfiXsd: {
          xsdEnumerationName: enumerationName,
          xsdEnumerationNameWithExtension: enumerationNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(mapTypeEnumeration);
    namespace.entity.mapTypeEnumeration.set(mapTypeEnumeration.metaEdName, mapTypeEnumeration);

    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      mapTypeEnumeration,
      properties: [
        Object.assign(newBooleanProperty(), {
          metaEdName: propertyName,
          documentation: propertyDocumentation,
          data: {
            edfiXsd: {
              xsdName: propertyName,
              xsdType: propertyType,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeName,
          xsdDescriptorNameWithExtension: complexTypeNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
  });

  it('should have two items', () => {
    expect(createdComplexType.items.length).toBe(2);
  });

  it('should create complex type item element', () => {
    const complexTypeItem: Element = createdComplexType.items[0] as Element;
    expect(complexTypeItem.name).toBe(propertyName);
    expect(complexTypeItem.type).toBe(propertyType);
    expect(complexTypeItem.annotation.documentation).toBe(propertyDocumentation);
    expect(complexTypeItem.annotation.descriptorName).toBe('');
    expect(complexTypeItem.minOccurs).toBe('');
    expect(complexTypeItem.maxOccursIsUnbounded).toBe(false);
  });

  it('should create map type item element', () => {
    const complexTypeItem: Element = createdComplexType.items[1] as Element;
    expect(complexTypeItem.name).toBe(mapTypeName);
    expect(complexTypeItem.type).toBe(enumerationNameWithExtension);
    expect(complexTypeItem.annotation.documentation).toMatchSnapshot();
    expect(complexTypeItem.annotation.descriptorName).toBe('');
    expect(complexTypeItem.minOccurs).toBe('');
    expect(complexTypeItem.maxOccursIsUnbounded).toBe(false);
  });
});

describe('when enhancing descriptor with descriptor property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'ComplexTypeName';
  const complexTypeNameWithExtension: string = `${projectExtension}-${complexTypeName}`;
  const descriptorName = 'DescriptorName';
  const descriptorNameWithExtension: string = `${projectExtension}-${descriptorName}`;
  const documentation = 'Documentation';
  const propertyType = 'PropertyType';
  const propertyDocumentation = 'PropertyDocumentation';

  let enhancedItem: Descriptor;
  let createdComplexType: ComplexType;

  beforeAll(() => {
    const referencedDescriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      data: {
        edfiXsd: {
          xsdDescriptorName: descriptorName,
          xsdDescriptorNameWithExtension: descriptorNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(referencedDescriptor);
    namespace.entity.descriptor.set(referencedDescriptor.metaEdName, referencedDescriptor);

    const descriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: descriptorName,
      documentation: propertyDocumentation,
      referencedEntity: referencedDescriptor,
      data: {
        edfiXsd: {
          xsdName: descriptorName,
          xsdType: propertyType,
        },
      },
    });
    addDescriptorPropertyEdfiXsdTo(descriptorProperty);

    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      properties: [descriptorProperty],
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeName,
          xsdDescriptorNameWithExtension: complexTypeNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
  });

  it('should have items', () => {
    expect(createdComplexType.items.length).toBe(1);
  });

  it('should create complex type item element', () => {
    const complexTypeItem: Element = createdComplexType.items[0] as Element;
    expect(complexTypeItem.name).toBe(descriptorName);
    expect(complexTypeItem.type).toBe(propertyType);
    expect(complexTypeItem.annotation.documentation).toBe(propertyDocumentation);
    expect(complexTypeItem.annotation.descriptorName).toBe(descriptorNameWithExtension);
  });
});

describe('when enhancing descriptor with both queryable and identity property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'ComplexTypeName';
  const complexTypeNameWithExtension: string = `${projectExtension}-${complexTypeName}`;
  const documentation = 'Documentation';
  const property1Name = 'Property1Name';
  const property1Type = 'Property1Type';
  const property1Documentation = 'Property1Documentation';
  const property2Name = 'Property2Name';
  const property2Type = 'Property2Type';
  const property2Documentation = 'Property2Documentation';

  let enhancedItem: Descriptor;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdLookupType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    const identityProperty = Object.assign(newBooleanProperty(), {
      metaEdName: property1Name,
      documentation: property1Documentation,
      isRequiredCollection: true,
      data: {
        edfiXsd: {
          xsdName: property1Name,
          xsdType: property1Type,
        },
      },
    });

    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      properties: [identityProperty],
      identityProperties: [identityProperty],
      queryableFields: [
        Object.assign(newBooleanProperty(), {
          metaEdName: property2Name,
          documentation: property2Documentation,
          isRequiredCollection: true,
          data: {
            edfiXsd: {
              xsdName: property2Name,
              xsdType: property2Type,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeName,
          xsdDescriptorNameWithExtension: complexTypeNameWithExtension,
          xsdIdentityProperties: [identityProperty],
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
    createdReferenceType = enhancedItem.data.edfiXsd.xsdReferenceType;
    createdLookupType = enhancedItem.data.edfiXsd.xsdLookupType;
    createdIdentityType = enhancedItem.data.edfiXsd.xsdIdentityType;
  });

  it('should create complex type', () => {
    expect(createdComplexType).toBeDefined();
  });

  it('should not create reference type', () => {
    expect(createdReferenceType).toBe(NoComplexType);
  });

  it('should not have reference type items', () => {
    expect(createdReferenceType.items.length).toBe(0);
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });

  it('should not create lookup type', () => {
    expect(createdLookupType).toBe(NoComplexType);
  });
});
