// @flow
import type { Namespace, MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import {
  descriptorReferenceTypeSuffix,
  identityTypeSuffix,
  newComplexType,
  newElement,
  newElementGroup,
  referenceTypeSuffix,
  typeGroupDescriptorExtendedReference,
  baseTypeDescriptor,
  baseTypeDescriptorReference,
  mapTypeSuffix,
  typeGroupSimple,
  newAnnotation,
} from 'metaed-plugin-edfi-xsd';
import {
  dataStandardElementGroupName,
  dataStandardNamespaceName,
  pluginCommonsForNamespace,
  pluginDescriptorsForNamespace,
  pluginDomainEntitiesForNamespace,
  pluginEnvironmentRepositoryForNamespace,
  pluginExtendedReferencesForNamespace,
  pluginIdentitiesForNamespace,
  pluginBasesForNamespace,
} from '../../src/enhancer/EnhancerHelper';
import { enhance } from '../../src/enhancer/EntityDefinitionEnhancer';
import type { EntityDefinition } from '../../src/model/EntityDefinition';
import { addEdFiMappingEduRepositoryTo } from '../../src/model/EdFiMappingEduRepository';
import type { EdFiMappingEduRepository } from '../../src/model/EdFiMappingEduRepository';

describe('when enhancing domain entity with identity reference', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityDocumentation: string = 'DomainEntityDocumentation';
  const identityDocumentation: string = 'IdentityDocumentation';
  const identityName: string = 'IdentityName';
  const identityType: string = identityTypeSuffix;
  const referenceDocumentation: string = 'ReferenceDocumentation';
  const referenceName: string = 'ReferenceNameReference';
  const referenceType: string = referenceTypeSuffix;
  const idName: string = 'IdName';
  const idType: string = 'IdType';
  const idDocumentation: string = 'IdDocumentation';
  const namespaceName: string = 'Namespace';
  const namespaceType: string = 'NamespaceType';
  const namespaceDocumentation: string = 'NamespaceDocumentation';

  // Core | DomainEntityName                                     | DomainEntityDocumentation
  // Core | DomainEntityName.ReferenceNameReference              | ReferenceDocumentation
  // Core | DomainEntityName.ReferenceNameReference.IdentityName | IdentityDocument
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDomainEntitiesForNamespace(metaEd, namespace).set(domainEntityName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: domainEntityDocumentation },
      name: domainEntityName,
      items: [
        {
          ...newElement(),
          name: referenceName,
          type: referenceType,
          annotation: { documentation: referenceDocumentation },
        },
      ],
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(referenceType, {
      ...newComplexType(),
      name: referenceType,
      items: [
        {
          ...newElement(),
          name: identityName,
          type: identityType,
          annotation: { documentation: identityDocumentation },
        },
      ],
    });
    pluginIdentitiesForNamespace(metaEd, namespace).set(identityType, {
      ...newComplexType(),
      name: identityType,
      items: [
        {
          ...newElement(),
          name: idName,
          type: idType,
          annotation: { documentation: idDocumentation, typeGroup: typeGroupSimple },
        },
        {
          ...newElement(),
          name: namespaceName,
          type: namespaceType,
          annotation: { documentation: namespaceDocumentation, typeGroup: typeGroupSimple },
        },
      ],
    });

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create three entity definitions', () => {
    expect(pluginNamespace.entityDefinitions).toHaveLength(3);
  });

  it.each([
    [[domainEntityName], domainEntityDocumentation, 0],
    [[domainEntityName, referenceName], referenceDocumentation, 1],
    [[domainEntityName, referenceName, identityName], identityDocumentation, 2],
  ])(
    `should create core entity definition with entity path: %j and definition: '%s'`,
    (entityPath: Array<string>, definition: string, index: number) => {
      const entityDefinition: EntityDefinition = pluginNamespace.entityDefinitions[index];
      expect(entityDefinition).toBeDefined();
      expect(entityDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(entityDefinition.entityPath).toEqual(entityPath);
      expect(entityDefinition.definition).toBe(definition);
    },
  );
});

describe('when enhancing domain entity with multiple identity references', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityDocumentation: string = 'DomainEntityDocumentation';
  const identityName1: string = 'IdentityName1';
  const identityType1: string = `IdentityType1${identityTypeSuffix}`;
  const identityDocumentation1: string = 'IdentityDocumentation1';
  const identityName2: string = 'IdentityName2';
  const identityType2: string = `IdentityType2${identityTypeSuffix}`;
  const identityDocumentation2: string = 'IdentityDocumentation2';
  const referenceName1: string = 'ReferenceName1Reference';
  const referenceType1: string = `ReferenceType1${referenceTypeSuffix}`;
  const referenceDocumentation1: string = 'ReferenceDocumentation1';
  const referenceName2: string = 'ReferenceName2Reference';
  const referenceType2: string = `ReferenceType2${referenceTypeSuffix}`;
  const referenceDocumentation2: string = 'ReferenceDocumentation2';
  const idName: string = 'IdName';
  const idType: string = 'IdType';
  const idDocumentation: string = 'IdDoumentation';
  const namespaceName: string = 'Namespace';
  const namespaceType: string = 'NamespaceType';
  const namespaceDocumentation: string = 'NamespaceDocumentation';

  // Core | DomainEntityName | DomainEntityDocumentation;
  // Core | DomainEntityName.ReferenceNameReference1 | ReferenceDocumentation1;
  // Core | DomainEntityName.ReferenceNameReference1.IdentityName1 | IdentityDocument1;
  // Core | DomainEntityName.ReferenceNameReference1.IdentityName1.ReferenceNameReference2.IdentityName2 | IdentityDocument2;
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDomainEntitiesForNamespace(metaEd, namespace).set(domainEntityName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: domainEntityDocumentation },
      name: domainEntityName,
      items: [
        {
          ...newElement(),
          name: referenceName1,
          type: referenceType1,
          annotation: { documentation: referenceDocumentation1 },
        },
      ],
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(referenceType1, {
      ...newComplexType(),
      name: referenceType1,
      items: [
        {
          ...newElement(),
          name: identityName1,
          type: identityType1,
          annotation: { documentation: identityDocumentation1 },
        },
      ],
    });
    pluginIdentitiesForNamespace(metaEd, namespace).set(identityType1, {
      ...newComplexType(),
      name: identityType1,
      items: [
        {
          ...newElement(),
          name: idName,
          type: idType,
          annotation: { documentation: idDocumentation, typeGroup: typeGroupSimple },
        },
        {
          ...newElement(),
          name: namespaceName,
          type: namespaceType,
          annotation: { documentation: namespaceDocumentation, typeGroup: typeGroupSimple },
        },
        {
          ...newElement(),
          name: referenceName2,
          type: referenceType2,
          annotation: { documentation: referenceDocumentation2 },
        },
      ],
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(referenceType2, {
      ...newComplexType(),
      name: referenceType2,
      items: [
        {
          ...newElement(),
          name: identityName2,
          type: identityType2,
          annotation: { documentation: identityDocumentation2 },
        },
      ],
    });
    pluginIdentitiesForNamespace(metaEd, namespace).set(identityType2, {
      ...newComplexType(),
      name: identityType2,
      items: [
        {
          ...newElement(),
          name: idName,
          type: idType,
          annotation: { documentation: idDocumentation, typeGroup: typeGroupSimple },
        },
        {
          ...newElement(),
          name: namespaceName,
          type: namespaceType,
          annotation: { documentation: namespaceDocumentation, typeGroup: typeGroupSimple },
        },
      ],
    });

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create five entity definitions', () => {
    expect(pluginNamespace.entityDefinitions).toHaveLength(5);
  });

  it.each([
    [[domainEntityName], domainEntityDocumentation, 0],
    [[domainEntityName, referenceName1], referenceDocumentation1, 1],
    [[domainEntityName, referenceName1, identityName1], identityDocumentation1, 2],
    [[domainEntityName, referenceName1, identityName1, referenceName2], referenceDocumentation2, 3],
    [[domainEntityName, referenceName1, identityName1, referenceName2, identityName2], identityDocumentation2, 4],
  ])(
    `should create core entity definition with entity path: %j and definition: '%s'`,
    (entityPath: Array<string>, definition: string, index: number) => {
      const entityDefinition: EntityDefinition = pluginNamespace.entityDefinitions[index];
      expect(entityDefinition).toBeDefined();
      expect(entityDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(entityDefinition.entityPath).toEqual(entityPath);
      expect(entityDefinition.definition).toBe(definition);
    },
  );
});

describe('when enhancing descriptor with only base descriptor type', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const baseTypeDescriptorReferenceDocumentation: string = 'BaseTypeDescriptorReferenceDocumentation';
  const baseTypeDescriptorReferenceName: string = 'BaseTypeDescriptorReferenceName';
  const descriptorDocumentation: string = 'DescriptorDocumentation';
  const descriptorMapType: string = `DescriptorMapType${mapTypeSuffix}`;
  const descriptorName: string = 'DescriptorName';

  // Core | DescriptorName                                 | DescriptorDocumentation
  // Core | DescriptorName.BaseTypeDescriptorReferenceName | baseTypeDescriptorReferenceDocumentation
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDescriptorsForNamespace(metaEd, namespace).set(descriptorName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: descriptorDocumentation },
      name: descriptorName,
      baseType: baseTypeDescriptor,
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(descriptorMapType, {
      ...newComplexType(),
      name: descriptorMapType,
    });
    pluginBasesForNamespace(metaEd, namespace).set(baseTypeDescriptor, {
      ...newComplexType(),
      name: baseTypeDescriptor,
      items: [
        {
          ...newElement(),
          name: baseTypeDescriptorReferenceName,
          type: baseTypeDescriptorReference,
          annotation: {
            documentation: baseTypeDescriptorReferenceDocumentation,
          },
        },
      ],
    });
    pluginBasesForNamespace(metaEd, namespace).set(baseTypeDescriptorReference, {
      ...newComplexType(),
      name: baseTypeDescriptorReference,
    });

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create two entity definitions', () => {
    expect(pluginNamespace.entityDefinitions).toHaveLength(2);
  });

  it.each([
    [[descriptorName], descriptorDocumentation, 0],
    [[descriptorName, baseTypeDescriptorReferenceName], baseTypeDescriptorReferenceDocumentation, 1],
  ])(
    `should create core entity definition with entity path: %j and definition: '%s'`,
    (entityPath: Array<string>, definition: string, index: number) => {
      const entityDefinition: EntityDefinition = pluginNamespace.entityDefinitions[index];
      expect(entityDefinition).toBeDefined();
      expect(entityDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(entityDefinition.entityPath).toEqual(entityPath);
      expect(entityDefinition.definition).toBe(definition);
    },
  );
});

describe('when enhancing descriptor with map type reference', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const baseTypeDescriptorReferenceDocumentation: string = 'BaseTypeDescriptorReferenceDocumentation';
  const baseTypeDescriptorReferenceName: string = 'BaseTypeDescriptorReferenceName';
  const descriptorDocumentation: string = 'DescriptorDocumentation';
  const descriptorMap: string = 'DescriptorMap';
  const descriptorMapDocumentation: string = 'DescriptorMapDocumentation';
  const descriptorMapType: string = `DescriptorMapType${mapTypeSuffix}`;
  const descriptorName: string = 'DescriptorName';

  // Core | DescriptorName                                 | DescriptorDocumentation
  // Core | DescriptorName.BaseTypeDescriptorReferenceName | baseTypeDescriptorReferenceDocumentation
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDescriptorsForNamespace(metaEd, namespace).set(descriptorName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: descriptorDocumentation },
      name: descriptorName,
      baseType: baseTypeDescriptor,
      items: [
        {
          ...newElement(),
          name: descriptorMap,
          type: descriptorMapType,
          annotation: { documentation: descriptorMapDocumentation },
        },
      ],
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(descriptorMapType, {
      ...newComplexType(),
      name: descriptorMapType,
    });
    pluginBasesForNamespace(metaEd, namespace).set(baseTypeDescriptor, {
      ...newComplexType(),
      name: baseTypeDescriptor,
      items: [
        {
          ...newElement(),
          name: baseTypeDescriptorReferenceName,
          type: baseTypeDescriptorReference,
          annotation: {
            documentation: baseTypeDescriptorReferenceDocumentation,
          },
        },
      ],
    });
    pluginBasesForNamespace(metaEd, namespace).set(baseTypeDescriptorReference, {
      ...newComplexType(),
      name: baseTypeDescriptorReference,
    });

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create two entity definitions', () => {
    expect(pluginNamespace.entityDefinitions).toHaveLength(2);
  });

  it.each([
    [[descriptorName], descriptorDocumentation, 0],
    [[descriptorName, baseTypeDescriptorReferenceName], baseTypeDescriptorReferenceDocumentation, 1],
  ])(
    `should create core entity definition with entity path: %j and definition: '%s'`,
    (entityPath: Array<string>, definition: string, index: number) => {
      const entityDefinition: EntityDefinition = pluginNamespace.entityDefinitions[index];
      expect(entityDefinition).toBeDefined();
      expect(entityDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(entityDefinition.entityPath).toEqual(entityPath);
      expect(entityDefinition.definition).toBe(definition);
    },
  );
});

describe('when enhancing descriptor with descriptor reference', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const descriptorName1: string = 'DescriptorName1';
  const descriptorDocumentation1: string = 'DescriptorDocumentation1';
  const descriptorExtendedReferenceType: string = `DescriptorExtendedReferenceType${descriptorReferenceTypeSuffix}`;
  const descriptorReferenceDocumentation: string = 'DescriptorReferenceDocumentation';
  const descriptorExtendedReferenceDocumentation: string = 'DescriptorExtendedReferenceDocumentation';
  const descriptorName2: string = 'DescriptorName2';
  const descriptorDocumentation2: string = 'DescriptorDocumentation2';
  const descriptorMap: string = 'DescriptorMap';
  const descriptorMapType: string = 'DescriptorMapType';
  const descriptorMapDocumentation: string = 'DescriptorMapDocumentation';

  // Core | DescriptorName1                 | DescriptorDocumentation1
  // Core | DescriptorName1.DescriptorName2 | DescriptorReferenceDocumentation
  // Core | DescriptorName2                 | DescriptorDocumentation2
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDescriptorsForNamespace(metaEd, namespace).set(descriptorName1, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: descriptorDocumentation1 },
      name: descriptorName1,
      items: [
        {
          ...newElement(),
          name: descriptorName2,
          type: descriptorExtendedReferenceType,
          annotation: { descriptorName: descriptorName2, documentation: descriptorReferenceDocumentation },
        },
      ],
    });
    pluginDescriptorsForNamespace(metaEd, namespace).set(descriptorName2, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: descriptorDocumentation2 },
      name: descriptorName2,
      items: [
        {
          ...newElement(),
          name: descriptorMap,
          type: descriptorMapType,
          annotation: { documentation: descriptorMapDocumentation },
        },
      ],
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(descriptorMapType, {
      ...newComplexType(),
      name: descriptorMapType,
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(descriptorExtendedReferenceType, {
      ...newComplexType(),
      annotation: {
        ...newAnnotation(),
        typeGroup: typeGroupDescriptorExtendedReference,
        documentation: descriptorExtendedReferenceDocumentation,
      },
      name: descriptorExtendedReferenceType,
    });

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create three entity definitions', () => {
    expect(pluginNamespace.entityDefinitions).toHaveLength(3);
  });

  it.each([
    [[descriptorName1], descriptorDocumentation1, 0],
    [[descriptorName1, descriptorName2], descriptorReferenceDocumentation, 1],
    [[descriptorName2], descriptorDocumentation2, 2],
  ])(
    `should create core entity definition with entity path: %j and definition: '%s'`,
    (entityPath: Array<string>, definition: string, index: number) => {
      const entityDefinition: EntityDefinition = pluginNamespace.entityDefinitions[index];
      expect(entityDefinition).toBeDefined();
      expect(entityDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(entityDefinition.entityPath).toEqual(entityPath);
      expect(entityDefinition.definition).toBe(definition);
    },
  );
});

describe('when enhancing domain entity with common reference', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityDocumentation: string = 'DomainEntityDocumentation';
  const commonName1: string = 'CommonName1';
  const commonType1: string = commonName1;
  const commonReferenceDocumentation1: string = 'CommonReferenceDocumentation1';
  const commonDocumentation1: string = 'CommonDocumentation1';
  const commonName2: string = 'CommonName2';
  const commonType2: string = commonName2;
  const commonReferenceDocumentation2: string = 'CommonReferenceDocumentation2';
  const commonDocumentation2: string = 'CommonDocumentation2';
  const simpleName: string = 'SimpleName';
  const simpleType: string = 'xs:boolean';
  const simpleDocumentation: string = 'SimpleDocumentation';

  // Core | DomainEntityName                         | DomainEntityDocumentation
  // Core | DomainEntityName.CommonName1             | CommonReferenceDocumentation1
  // Core | DomainEntityName.CommonName1.CommonName2 | CommonReferenceDocumentation2
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDomainEntitiesForNamespace(metaEd, namespace).set(domainEntityName, {
      ...newComplexType(),
      name: domainEntityName,
      annotation: { ...newAnnotation(), documentation: domainEntityDocumentation },
      items: [
        {
          ...newElement(),
          name: commonName1,
          type: commonType1,
          annotation: { documentation: commonReferenceDocumentation1 },
        },
      ],
    });
    pluginCommonsForNamespace(metaEd, namespace).set(commonName1, {
      ...newComplexType(),
      name: commonName1,
      annotation: { ...newAnnotation(), documentation: commonDocumentation1 },
      items: [
        {
          ...newElement(),
          name: commonName2,
          type: commonType2,
          annotation: { documentation: commonReferenceDocumentation2 },
        },
      ],
    });
    pluginCommonsForNamespace(metaEd, namespace).set(commonName2, {
      ...newComplexType(),
      name: commonName2,
      annotation: { ...newAnnotation(), documentation: commonDocumentation2 },
      items: [
        {
          ...newElement(),
          name: simpleName,
          type: simpleType,
          annotation: { documentation: simpleDocumentation, typeGroup: typeGroupSimple },
        },
      ],
    });

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create three entity definitions', () => {
    expect(pluginNamespace.entityDefinitions).toHaveLength(3);
  });

  it.each([
    [[domainEntityName], domainEntityDocumentation, 0],
    [[domainEntityName, commonName1], commonReferenceDocumentation1, 1],
    [[domainEntityName, commonName1, commonName2], commonReferenceDocumentation2, 2],
  ])(
    `should create core entity definition with entity path: %j and definition: '%s'`,
    (entityPath: Array<string>, definition: string, index: number) => {
      const entityDefinition: EntityDefinition = pluginNamespace.entityDefinitions[index];
      expect(entityDefinition).toBeDefined();
      expect(entityDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(entityDefinition.entityPath).toEqual(entityPath);
      expect(entityDefinition.definition).toBe(definition);
    },
  );
});

describe('when enhancing domain entity with choice with inline common reference', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const commonDocumentation: string = 'CommonDocumentation';
  const commonName: string = 'CommonName';
  const domainEntityDocumentation: string = 'DomainEntityDocumentation';
  const domainEntityName: string = 'DomainEntityName';
  const idDocumentation: string = 'IdDocumentation';
  const identityDocumentation: string = 'IdentityDocumentation';
  const identityName: string = 'IdentityName';
  const identityType: string = identityTypeSuffix;
  const idName: string = 'IdName';
  const idType: string = 'IdType';
  const inlineCommonReferenceDocumentation: string = 'InlineCommonReferenceDocumentation';
  const inlineCommonReferenceName: string = 'InlineCommonReferenceName';
  const namespaceName: string = 'Namespace';
  const namespaceType: string = 'NamespaceType';
  const referenceDocumentation: string = 'ReferenceDocumentation';
  const referenceName: string = 'ReferenceNameReference';
  const referenceType: string = referenceTypeSuffix;
  const namespaceDocumentation: string = 'NamespaceDocumentation';

  // Core | DomainEntityName                                                               | DomainEntityDocumentation
  // Core | DomainEntityName.InlineCommonReferenceName                                     | InlineCommonReferenceDocumentationName
  // Core | DomainEntityName.InlineCommonReferenceName.ReferenceNameReference              | ReferenceDocumentation
  // Core | DomainEntityName.InlineCommonReferenceName.ReferenceNameReference.IdentityName | IdentityDocument
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);

    pluginDomainEntitiesForNamespace(metaEd, namespace).set(domainEntityName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: domainEntityDocumentation },
      name: domainEntityName,
      items: [
        {
          ...newElementGroup(),
          isChoice: true,
          items: [
            {
              ...newElement(),
              name: inlineCommonReferenceName,
              type: commonName,
              annotation: { documentation: inlineCommonReferenceDocumentation },
            },
          ],
        },
      ],
    });
    pluginCommonsForNamespace(metaEd, namespace).set(commonName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: commonDocumentation },
      name: commonName,
      items: [
        {
          ...newElement(),
          name: referenceName,
          type: referenceType,
          annotation: { documentation: referenceDocumentation },
        },
        {
          ...newElementGroup(),
          isChoice: false,
          items: [
            {
              ...newElement(),
              name: domainEntityName,
              type: domainEntityName,
              annotation: { documentation: domainEntityDocumentation },
            },
          ],
        },
      ],
    });
    pluginExtendedReferencesForNamespace(metaEd, namespace).set(referenceType, {
      ...newComplexType(),
      name: referenceType,
      items: [
        {
          ...newElement(),
          name: identityName,
          type: identityType,
          annotation: { documentation: identityDocumentation },
        },
      ],
    });
    pluginIdentitiesForNamespace(metaEd, namespace).set(identityType, {
      ...newComplexType(),
      name: identityType,
      items: [
        {
          ...newElement(),
          name: idName,
          type: idType,
          annotation: { documentation: idDocumentation, typeGroup: typeGroupSimple },
        },
        {
          ...newElement(),
          name: namespaceName,
          type: namespaceType,
          annotation: { documentation: namespaceDocumentation, typeGroup: typeGroupSimple },
        },
      ],
    });

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create four entity definitions', () => {
    expect(pluginNamespace.entityDefinitions).toHaveLength(4);
  });

  it.each([
    [[domainEntityName], domainEntityDocumentation, 0],
    [[domainEntityName, inlineCommonReferenceName], inlineCommonReferenceDocumentation, 1],
    [[domainEntityName, inlineCommonReferenceName, referenceName], referenceDocumentation, 2],
    [[domainEntityName, inlineCommonReferenceName, referenceName, identityName], identityDocumentation, 3],
  ])(
    `should create core entity definition with entity path: %j and definition: '%s'`,
    (entityPath: Array<string>, definition: string, index: number) => {
      const entityDefinition: EntityDefinition = pluginNamespace.entityDefinitions[index];
      expect(entityDefinition).toBeDefined();
      expect(entityDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(entityDefinition.entityPath).toEqual(entityPath);
      expect(entityDefinition.definition).toBe(definition);
    },
  );
});
