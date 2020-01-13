import { newMetaEdEnvironment, newNamespace, MetaEdEnvironment, Namespace } from 'metaed-core';
import { StringSimpleType } from '../../../src/model/schema/StringSimpleType';
import { NoSimpleType } from '../../../src/model/schema/SimpleType';
import { enhance } from '../../../src/enhancer/schema/AddStringSimpleTypesEnhancer';
import { addEdFiXsdEntityRepositoryTo, EdFiXsdEntityRepository } from '../../../src/model/EdFiXsdEntityRepository';
import { StringType, newStringType } from '../../../src/model/StringType';
import { edfiXsdRepositoryForNamespace } from '../../../src/enhancer/EnhancerHelper';

describe('when enhancing string type', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const minLength = '1';
  const maxLength = '100';
  let enhancedItem: StringType;
  let createdSimpleType: StringSimpleType;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiXsdEntityRepositoryTo(metaEd);

    enhancedItem = {
      ...newStringType(),
      xsdMetaEdNameWithExtension: simpleTypeName,
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: false,
      minLength,
      maxLength,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.stringType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as StringSimpleType;
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
    expect(createdSimpleType.baseType).toBe('xs:string');
  });

  it('should have max length assigned', (): void => {
    expect(createdSimpleType.maxLength).toBe(maxLength);
  });

  it('should have min length assigned', (): void => {
    expect(createdSimpleType.minLength).toBe(minLength);
  });

  it('should have name assigned', (): void => {
    expect(createdSimpleType.name).toBe(simpleTypeName);
  });
});

describe('when enhancing generated string type with min length only', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const minLength = '1';
  let enhancedItem: StringType;
  let createdSimpleType: StringSimpleType;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiXsdEntityRepositoryTo(metaEd);

    enhancedItem = {
      ...newStringType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
      minLength,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.stringType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as StringSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should not have max length assigned', (): void => {
    expect(createdSimpleType.maxLength).toBe('');
  });

  it('should have min length assigned', (): void => {
    expect(createdSimpleType.minLength).toBe(minLength);
  });
});

describe('when enhancing generated string type with max length only', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  const maxLength = '100';
  let enhancedItem: StringType;
  let createdSimpleType: StringSimpleType;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiXsdEntityRepositoryTo(metaEd);

    enhancedItem = {
      ...newStringType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
      maxLength,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.stringType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as StringSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should have max length assigned', (): void => {
    expect(createdSimpleType.maxLength).toBe(maxLength);
  });

  it('should not have min length assigned', (): void => {
    expect(createdSimpleType.minLength).toBe('');
  });
});

describe('when enhancing non-generated string type with no restrictions', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  let enhancedItem: StringType;
  let createdSimpleType: StringSimpleType;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiXsdEntityRepositoryTo(metaEd);

    enhancedItem = {
      ...newStringType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: false,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.stringType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as StringSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBeDefined();
  });

  it('should not have max length assigned', (): void => {
    expect(createdSimpleType.maxLength).toBe('');
  });

  it('should not have min length assigned', (): void => {
    expect(createdSimpleType.minLength).toBe('');
  });
});

describe('when enhancing generated string type with no restrictions', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const simpleTypeName = 'SimpleTypeName';
  const documentation = 'Documentation';
  let enhancedItem: StringType;
  let createdSimpleType: StringSimpleType;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiXsdEntityRepositoryTo(metaEd);

    enhancedItem = {
      ...newStringType(),
      metaEdName: simpleTypeName,
      documentation,
      generatedSimpleType: true,
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.stringType.push(enhancedItem);

    enhance(metaEd);

    createdSimpleType = enhancedItem.xsdSimpleType as StringSimpleType;
  });

  it('should create simple type', (): void => {
    expect(createdSimpleType).toBe(NoSimpleType);
  });
});
