// @flow
import {
  addProperty,
  newMetaEdEnvironment,
  newAssociation,
  newDomainEntity,
  newDescriptor,
  newNamespace,
  newStringProperty,
  newAssociationProperty,
  newCommonProperty,
  newDescriptorProperty,
  newEnumerationProperty,
} from 'metaed-core';
import type { MetaEdEnvironment, Namespace, EntityProperty } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/PropertyEnhancer';
import { enhance as addModelBaseEdfiXsd } from '../../src/model/ModelBase';

function createRepositoryEntityWithProperty(metaEd: MetaEdEnvironment, namespace: Namespace, property: EntityProperty) {
  const metaEdName = 'DomainEntityName';

  namespace.entity.domainEntity.set(
    metaEdName,
    Object.assign(newDomainEntity(), {
      metaEdName,
      documentation: 'doc',
      namespace,
      properties: [property],
      data: { edfiXsd: {} },
    }),
  );
  addProperty(metaEd.propertyIndex, property);
}

describe('when enhancing core string property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newStringProperty(), {
    metaEdName: propertyName,
    namespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(propertyName);
  });
});

describe('when enhancing core string property with a "with context"', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const withContext = 'Context';
  const property = Object.assign(newStringProperty(), {
    metaEdName: propertyName,
    namespace,
    withContext,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(`${withContext}${propertyName}`);
    expect(property.data.edfiXsd.xsd_Type).toBe(propertyName);
  });
});

describe('when enhancing core string property with a "with context" with same name as metaed name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newStringProperty(), {
    metaEdName: propertyName,
    namespace,
    withContext: propertyName,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should ignore with context on xsdName', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(propertyName);
  });
});

describe('when enhancing extension string property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newStringProperty(), {
    metaEdName: propertyName,
    namespace: extensionNamespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, extensionNamespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(`EXTENSION-${propertyName}`);
  });
});

describe('when enhancing core association property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newAssociationProperty(), {
    metaEdName: propertyName,
    namespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(`${propertyName}Reference`);
    expect(property.data.edfiXsd.xsd_Type).toBe(`${propertyName}ReferenceType`);
  });
});

describe('when enhancing extension association property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newAssociationProperty(), {
    metaEdName: propertyName,
    namespace: extensionNamespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, extensionNamespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(`${propertyName}Reference`);
    expect(property.data.edfiXsd.xsd_Type).toBe(`EXTENSION-${propertyName}ReferenceType`);
  });
});

describe('when enhancing extension association property referring to core entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newAssociationProperty(), {
    metaEdName: propertyName,
    parentEntityName: propertyName,
    namespace: extensionNamespace,
    referencedEntity: Object.assign(newAssociation(), {
      metaEdName: propertyName,
      documentation: 'doc',
      namespace,
      data: {
        edfiXsd: {},
      },
    }),
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, extensionNamespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should use parent to determine xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(`${propertyName}Reference`);
    expect(property.data.edfiXsd.xsd_Type).toBe(`${propertyName}ReferenceType`);
  });
});

describe('when enhancing core descriptor property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newDescriptorProperty(), {
    metaEdName: propertyName,
    namespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(`${propertyName}DescriptorReferenceType`);
  });
});

describe('when enhancing extension descriptor property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newDescriptorProperty(), {
    metaEdName: propertyName,
    namespace: extensionNamespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, extensionNamespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(`EXTENSION-${propertyName}DescriptorReferenceType`);
  });
});

describe('when enhancing extension descriptor property referring to core entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newDescriptorProperty(), {
    metaEdName: propertyName,
    parentEntityName: propertyName,
    namespace: extensionNamespace,
    referencedEntity: Object.assign(newDescriptor(), {
      metaEdName: propertyName,
      documentation: 'doc',
      namespace,
      data: {
        edfiXsd: {},
      },
    }),
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, extensionNamespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should use parent to determine xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(`${propertyName}DescriptorReferenceType`);
  });
});

describe('when enhancing enumeration property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newEnumerationProperty(), {
    metaEdName: propertyName,
    namespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(`${propertyName}Type`);
  });
});

describe('when enhancing enumeration property with name ending in "Type"', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyNameType';
  const property = Object.assign(newEnumerationProperty(), {
    metaEdName: propertyName,
    namespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should not add "Type" suffix', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(propertyName);
  });
});

describe('when enhancing common property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newCommonProperty(), {
    metaEdName: propertyName,
    namespace,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(propertyName);
  });
});

describe('when enhancing extension override common property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const propertyName = 'PropertyName';
  const property = Object.assign(newCommonProperty(), {
    metaEdName: propertyName,
    namespace,
    isExtensionOverride: true,
    data: { edfiXsd: {} },
  });

  beforeAll(() => {
    createRepositoryEntityWithProperty(metaEd, namespace, property);
    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct xsdName and xsdType', () => {
    expect(property.data.edfiXsd.xsd_Name).toBe(propertyName);
    expect(property.data.edfiXsd.xsd_Type).toBe(`${propertyName}${property.namespace.extensionEntitySuffix}`);
  });
});
