// @flow
import {
  newDomainEntity,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
  newDomainEntitySubclass,
} from 'metaed-core';
import type { Namespace, DomainEntity, MetaEdEnvironment, DomainEntitySubclass } from 'metaed-core';
import { enhance } from '../../../src/enhancer/educationOrganizationReferenceMetadata/EducationOrganizationReferenceEnhancer';

const educationOrganizationName: string = 'EducationOrganization';
const educationOrganizationIdName: string = 'EducationOrganizationId';

function buildEducationOrganizationEntity(namespace: Namespace): DomainEntity {
  const edOrgEntity = Object.assign(newDomainEntity(), {
    metaEdName: educationOrganizationName,
    namespace,
    isAbstract: true,
  });
  edOrgEntity.identityProperties.push(
    Object.assign(newIntegerProperty(), {
      data: { edfiXsd: { xsd_Name: educationOrganizationIdName } },
      isPartOfIdentity: true,
    }),
  );
  return edOrgEntity;
}

describe('when EducationOrganizationReferenceEnhancer enhances namespace with no EducationOrganization', () => {
  const namespaceName: string = 'edfi';
  const entityName1: string = 'Entity1';
  const entityIdName1: string = 'EntityId1';
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const coreNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: { edfiOdsApi: { api_EducationOrganizationReferences: [] } },
  });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
  beforeAll(() => {
    const edOrgEntity: DomainEntity = Object.assign(buildEducationOrganizationEntity(coreNamespace), {
      metaEdName: 'NotEducationOrganization',
    });
    coreNamespace.entity.domainEntity.set(edOrgEntity.metaEdName, edOrgEntity);

    const edOrgSubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: entityName1,
      baseEntityName: educationOrganizationName,
      namespace: coreNamespace,
    });
    edOrgSubclass.identityProperties.push(
      Object.assign(newIntegerProperty(), { data: { edfiXsd: { xsd_Name: entityIdName1 } }, isIdentityRename: true }),
    );
    coreNamespace.entity.domainEntitySubclass.set(edOrgSubclass.metaEdName, edOrgSubclass);

    enhance(metaEd);
  });

  it('should have no education organization reference', () => {
    expect(coreNamespace.data.edfiOdsApi.api_EducationOrganizationReferences.length).toBe(0);
  });
});

describe('when EducationOrganizationReferenceEnhancer enhances namespace with no EducationOrganization Subclass', () => {
  const namespaceName: string = 'edfi';
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const coreNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: { edfiOdsApi: { api_EducationOrganizationReferences: [] } },
  });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);

  beforeAll(() => {
    const edOrgEntity: DomainEntity = buildEducationOrganizationEntity(coreNamespace);
    coreNamespace.entity.domainEntity.set(edOrgEntity.metaEdName, edOrgEntity);

    enhance(metaEd);
  });

  it('should have no education organization reference', () => {
    expect(coreNamespace.data.edfiOdsApi.api_EducationOrganizationReferences.length).toBe(0);
  });
});

describe('when EducationOrganizationReferenceEnhancer enhances namespace with EducationOrganization Subclass', () => {
  const namespaceName: string = 'edfi';
  const entityName1: string = 'Entity1';
  const entityIdName1: string = 'EntityId1';
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const coreNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: { edfiOdsApi: { api_EducationOrganizationReferences: [] } },
  });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);

  beforeAll(() => {
    const edOrgEntity: DomainEntity = buildEducationOrganizationEntity(coreNamespace);
    coreNamespace.entity.domainEntity.set(edOrgEntity.metaEdName, edOrgEntity);

    const edOrgSubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: entityName1,
      baseEntityName: educationOrganizationName,
      namespace: coreNamespace,
    });
    edOrgSubclass.identityProperties.push(
      Object.assign(newIntegerProperty(), { data: { edfiXsd: { xsd_Name: entityIdName1 } }, isIdentityRename: true }),
    );
    coreNamespace.entity.domainEntitySubclass.set(edOrgSubclass.metaEdName, edOrgSubclass);

    enhance(metaEd);
  });

  it('should have education organization reference', () => {
    expect(coreNamespace.data.edfiOdsApi.api_EducationOrganizationReferences.length).toBe(1);
    const educationOrganizationReference = coreNamespace.data.edfiOdsApi.api_EducationOrganizationReferences[0];
    expect(educationOrganizationReference).toBeDefined();
    expect(educationOrganizationReference.name).toBe(entityName1);
    expect(educationOrganizationReference.identityPropertyName).toBe(entityIdName1);
  });
});

describe('when EducationOrganizationReferenceEnhancer enhances extension namespace with EducationOrganization Subclass', () => {
  const namespaceName: string = 'edfi';
  const entityName1: string = 'Entity1';
  const entityIdName1: string = 'EntityId1';
  const extensionNamespaceName: string = 'extension';
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const coreNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: { edfiOdsApi: { api_EducationOrganizationReferences: [] } },
  });
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: extensionNamespaceName,
    projectExtension: 'EXTENSION',
    isExtension: true,
    data: { edfiOdsApi: { api_EducationOrganizationReferences: [] } },
  });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(coreNamespace);

  beforeAll(() => {
    const edOrgEntity: DomainEntity = buildEducationOrganizationEntity(coreNamespace);
    coreNamespace.entity.domainEntity.set(edOrgEntity.metaEdName, edOrgEntity);

    const edOrgSubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: entityName1,
      baseEntityName: educationOrganizationName,
      namespace: extensionNamespace,
    });
    edOrgSubclass.identityProperties.push(
      Object.assign(newIntegerProperty(), { data: { edfiXsd: { xsd_Name: entityIdName1 } }, isIdentityRename: true }),
    );
    extensionNamespace.entity.domainEntitySubclass.set(edOrgSubclass.metaEdName, edOrgSubclass);

    enhance(metaEd);
  });

  it('should have no core education organization reference', () => {
    expect(coreNamespace.data.edfiOdsApi.api_EducationOrganizationReferences.length).toBe(0);
  });

  it('should have extension education organization reference', () => {
    expect(extensionNamespace.data.edfiOdsApi.api_EducationOrganizationReferences.length).toBe(1);
    const educationOrganizationReference = extensionNamespace.data.edfiOdsApi.api_EducationOrganizationReferences[0];
    expect(educationOrganizationReference).toBeDefined();
    expect(educationOrganizationReference.name).toBe(entityName1);
    expect(educationOrganizationReference.identityPropertyName).toBe(entityIdName1);
  });
});

describe('when EducationOrganizationReferenceEnhancer enhances namespace with EducationOrganization Subclass with no identity rename', () => {
  const namespaceName: string = 'edfi';
  const entityName1: string = 'Entity1';
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const coreNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: { edfiOdsApi: { api_EducationOrganizationReferences: [] } },
  });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);

  beforeAll(() => {
    const edOrgEntity: DomainEntity = buildEducationOrganizationEntity(coreNamespace);
    coreNamespace.entity.domainEntity.set(edOrgEntity.metaEdName, edOrgEntity);

    const edOrgSubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: entityName1,
      baseEntityName: educationOrganizationName,
      namespace: coreNamespace,
    });
    coreNamespace.entity.domainEntitySubclass.set(edOrgSubclass.metaEdName, edOrgSubclass);

    enhance(metaEd);
  });

  it('should have extension education organization reference', () => {
    expect(coreNamespace.data.edfiOdsApi.api_EducationOrganizationReferences.length).toBe(1);
    const educationOrganizationReference = coreNamespace.data.edfiOdsApi.api_EducationOrganizationReferences[0];
    expect(educationOrganizationReference).toBeDefined();
    expect(educationOrganizationReference.name).toBe(entityName1);
    expect(educationOrganizationReference.identityPropertyName).toBe(educationOrganizationIdName);
  });
});
