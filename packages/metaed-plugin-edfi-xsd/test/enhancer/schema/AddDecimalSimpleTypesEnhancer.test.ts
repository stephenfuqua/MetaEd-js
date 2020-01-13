import { newMetaEdEnvironment, newNamespace, MetaEdEnvironment, Namespace } from 'metaed-core';
import { DecimalSimpleType } from '../../../src/model/schema/DecimalSimpleType';
import { NoSimpleType } from '../../../src/model/schema/SimpleType';
import { enhance } from '../../../src/enhancer/schema/AddDecimalSimpleTypesEnhancer';
import { addEdFiXsdEntityRepositoryTo, EdFiXsdEntityRepository } from '../../../src/model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../../../src/enhancer/EnhancerHelper';
import { DecimalType, newDecimalType } from '../../../src/model/DecimalType';

describe('when enhancing decimal type', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);
  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const minValue = '1';
  const maxValue = '100';
  const decimalPlaces = '2';
  const totalDigits = '5';
  let enhancedItem: DecimalType;
  let createdSimpleType: DecimalSimpleType;

  beforeAll(() => {
    enhancedItem = {
      ...newDecimalType(),
      xsdMetaEdNameWithExtension: simpleTypeName,
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: false,
      minValue,
      maxValue,
      decimalPlaces,
      totalDigits,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.decimalType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as DecimalSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should have annotation documentation assigned', (): void => {
    expect(createdSimpleType.annotation).toBeDefined();
    expect(createdSimpleType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned', (): void => {
    expect(createdSimpleType.annotation.typeGroup).toBe('Simple');
  });

  it('should have base type assigned', (): void => {
    expect(createdSimpleType.baseType).toBe('xs:decimal');
  });

  it('should have max value assigned', (): void => {
    expect(createdSimpleType.maxValue).toBe(maxValue);
  });

  it('should have min value assigned', (): void => {
    expect(createdSimpleType.minValue).toBe(minValue);
  });

  it('should have decimal places assigned', (): void => {
    expect(createdSimpleType.decimalPlaces).toBe(decimalPlaces);
  });

  it('should have total digits assigned', (): void => {
    expect(createdSimpleType.totalDigits).toBe(totalDigits);
  });

  it('should have name assigned', (): void => {
    expect(createdSimpleType.name).toBe(simpleTypeName);
  });
});

describe('when enhancing generated decimal type with min value only', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const minValue = '1';
  let enhancedItem: DecimalType;
  let createdSimpleType: DecimalSimpleType;

  beforeAll(() => {
    enhancedItem = {
      ...newDecimalType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
      minValue,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.decimalType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as DecimalSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should not have max value assigned', (): void => {
    expect(createdSimpleType.maxValue).toBe('');
  });

  it('should have min value assigned', (): void => {
    expect(createdSimpleType.minValue).toBe(minValue);
  });

  it('should not have decimal places assigned', (): void => {
    expect(createdSimpleType.decimalPlaces).toBe('');
  });

  it('should not have total digits assigned', (): void => {
    expect(createdSimpleType.totalDigits).toBe('');
  });
});

describe('when enhancing generated decimal type with max value only', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const maxValue = '100';
  let enhancedItem: DecimalType;
  let createdSimpleType: DecimalSimpleType;

  beforeAll(() => {
    enhancedItem = {
      ...newDecimalType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
      maxValue,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.decimalType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as DecimalSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should have max value assigned', (): void => {
    expect(createdSimpleType.maxValue).toBe(maxValue);
  });

  it('should not have min value assigned', (): void => {
    expect(createdSimpleType.minValue).toBe('');
  });

  it('should not have decimal places assigned', (): void => {
    expect(createdSimpleType.decimalPlaces).toBe('');
  });

  it('should not have total digits assigned', (): void => {
    expect(createdSimpleType.totalDigits).toBe('');
  });
});

describe('when enhancing generated decimal type with decimal places only', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);
  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const decimalPlaces = '2';
  let enhancedItem: DecimalType;
  let createdSimpleType: DecimalSimpleType;

  beforeAll(() => {
    enhancedItem = {
      ...newDecimalType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
      decimalPlaces,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.decimalType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as DecimalSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should not have max value assigned', (): void => {
    expect(createdSimpleType.maxValue).toBe('');
  });

  it('should not have min value assigned', (): void => {
    expect(createdSimpleType.minValue).toBe('');
  });

  it('should have decimal places assigned', (): void => {
    expect(createdSimpleType.decimalPlaces).toBe(decimalPlaces);
  });

  it('should not have total digits assigned', (): void => {
    expect(createdSimpleType.totalDigits).toBe('');
  });
});

describe('when enhancing generated decimal type with total digits only', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const totalDigits = '5';
  let enhancedItem: DecimalType;
  let createdSimpleType: DecimalSimpleType;

  beforeAll(() => {
    enhancedItem = {
      ...newDecimalType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
      totalDigits,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.decimalType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as DecimalSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should not have max value assigned', (): void => {
    expect(createdSimpleType.maxValue).toBe('');
  });

  it('should not have min value assigned', (): void => {
    expect(createdSimpleType.minValue).toBe('');
  });

  it('should not have decimal places assigned', (): void => {
    expect(createdSimpleType.decimalPlaces).toBe('');
  });

  it('should have total digits assigned', (): void => {
    expect(createdSimpleType.totalDigits).toBe(totalDigits);
  });
});

describe('when enhancing non-generated decimal type with no restrictions', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  let enhancedItem: DecimalType;
  let createdSimpleType: DecimalSimpleType;

  beforeAll(() => {
    enhancedItem = {
      ...newDecimalType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: false,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.decimalType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as DecimalSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should not have max value assigned', (): void => {
    expect(createdSimpleType.maxValue).toBe('');
  });

  it('should not have min value assigned', (): void => {
    expect(createdSimpleType.minValue).toBe('');
  });

  it('should not have decimal places assigned', (): void => {
    expect(createdSimpleType.decimalPlaces).toBe('');
  });

  it('should not have total digits assigned', (): void => {
    expect(createdSimpleType.totalDigits).toBe('');
  });
});

describe('when enhancing generated decimal type with no restrictions', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  let enhancedItem: DecimalType;
  let createdSimpleType: DecimalSimpleType;

  beforeAll(() => {
    enhancedItem = {
      ...newDecimalType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.decimalType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as DecimalSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBe(NoSimpleType);
  });
});
