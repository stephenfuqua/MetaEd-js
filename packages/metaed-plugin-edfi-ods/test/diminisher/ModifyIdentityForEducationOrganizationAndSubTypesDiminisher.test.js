// @flow
import R from 'ramda';
import {
  newDomainEntity,
  newDomainEntitySubclass,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import type { DomainEntity, DomainEntitySubclass, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ModifyIdentityForEducationOrganizationAndSubTypesDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';

describe('when ModifyIdentityForEducationOrganizationAndSubTypesDiminisher diminishes with no EducationOrganization entity', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName: string = 'DomainEntityName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
    });
    namespace.entity.domainEntity.set(entity.metaEdName, entity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not fail', () => {
    expect(namespace.entity.domainEntity.get(domainEntityName)).toBeDefined();
  });
});

describe('when ModifyIdentityForEducationOrganizationAndSubTypesDiminisher diminishes EducationOrganization with no EducationOrganizationIdentifier', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationOrganization: string = 'EducationOrganization';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: educationOrganization,
      namespace,
      isAbstract: true,
      data: {
        edfiOds: {
          ods_IdentityProperties: [],
          ods_Properties: [],
        },
      },
    });
    namespace.entity.domainEntity.set(entity.metaEdName, entity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not fail', () => {
    expect(namespace.entity.domainEntity.get(educationOrganization)).toBeDefined();
    expect((namespace.entity.domainEntity.get(educationOrganization): any).data.edfiOds.ods_Properties).toHaveLength(0);
  });
});

describe('when ModifyIdentityForEducationOrganizationAndSubTypesDiminisher diminishes EducationOrganization with School subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationOrganization: string = 'EducationOrganization';
  const educationOrganizationId: string = 'EducationOrganizationId';
  const educationOrganizationIdentifier: string = 'EducationOrganizationIdentifier';
  const educationOrganizationIdentifierDocumentation: string = 'EducationOrganizationIdentifierDocumentation';
  const school: string = 'School';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: educationOrganization,
      namespace,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: educationOrganizationIdentifier,
      documentation: educationOrganizationIdentifierDocumentation,
      namespace,
      isPartOfIdentity: true,
      parentEntity: entity,
      parentEntityName: entity.metaEdName,
      data: {
        edfiOds: {
          ods_IsUniqueIndex: false,
        },
      },
    });
    entity.data.edfiOds.ods_Properties.push(property);
    entity.data.edfiOds.ods_IdentityProperties.push(property);
    namespace.entity.domainEntity.set(entity.metaEdName, entity);

    const entitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: school,
      namespace,
      baseEntityName: educationOrganization,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    entitySubclass.data.edfiOds.ods_Properties.push(property);
    entitySubclass.data.edfiOds.ods_IdentityProperties.push(property);
    namespace.entity.domainEntitySubclass.set(entitySubclass.metaEdName, entitySubclass);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have two ods properties on EducationOrganization', () => {
    const entity: DomainEntity = (namespace.entity.domainEntity.get(educationOrganization): any);
    expect(entity).toBeDefined();
    expect(entity.data.edfiOds.ods_Properties).toHaveLength(2);
  });

  it('should modify EducationOrganizationIdentifier property on EducationOrganization', () => {
    const property: IntegerProperty = R.head(
      (namespace.entity.domainEntity.get(educationOrganization): any).data.edfiOds.ods_Properties,
    );
    expect(property.metaEdName).toBe(educationOrganizationIdentifier);
    expect(property.data.edfiOds.ods_IsUniqueIndex).toBe(true);
    expect(property.isPartOfIdentity).toBe(false);
  });

  it('should remove EducationOrganizationIdentifier from identity properties on EducationOrganization', () => {
    const entity: DomainEntity = (namespace.entity.domainEntity.get(educationOrganization): any);
    expect(entity.data.edfiOds.ods_IdentityProperties).toHaveLength(1);
    expect(R.head(entity.data.edfiOds.ods_IdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to EducationOrganization', () => {
    const entity: DomainEntity = (namespace.entity.domainEntity.get(educationOrganization): any);
    const property: IntegerProperty = R.last(entity.data.edfiOds.ods_Properties);
    expect(property.metaEdName).toBe(educationOrganizationId);
    expect(property.documentation).toBe(educationOrganizationIdentifierDocumentation);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('edfi');
    expect(property.parentEntity).toBe(entity);
    expect(property.parentEntityName).toBe(educationOrganization);
    expect(property.data.edfiOds.ods_IsIdentityDatabaseType).toBe(false);
    expect(property).toBe(R.head(entity.data.edfiOds.ods_IdentityProperties));
  });

  it('should remove EducationOrganizationIdentifier from identity properties on School', () => {
    const entitySubclass: DomainEntity = (namespace.entity.domainEntitySubclass.get(school): any);
    expect(entitySubclass.data.edfiOds.ods_IdentityProperties).toHaveLength(1);
    expect(R.head(entitySubclass.data.edfiOds.ods_IdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
    expect(entitySubclass.data.edfiOds.ods_Properties.map(x => x.metaEdName)).not.toContain(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to School', () => {
    const entitySubclass: DomainEntitySubclass = (namespace.entity.domainEntitySubclass.get(school): any);
    expect(entitySubclass).toBeDefined();
    expect(entitySubclass.data.edfiOds.ods_Properties).toHaveLength(1);

    const property: IntegerProperty = R.last(entitySubclass.data.edfiOds.ods_Properties);
    expect(property.metaEdName).toBe(`${school}Id`);
    expect(property.documentation).toBe(`The identifier assigned to a ${entitySubclass.typeHumanizedName}.`);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('edfi');
    expect(property.parentEntity).toBe(entitySubclass);
    expect(property.parentEntityName).toBe(school);
    expect(property.isIdentityRename).toBe(true);
    expect(property.baseKeyName).toBe(educationOrganizationId);
    expect(property).toBe(R.head(entitySubclass.data.edfiOds.ods_IdentityProperties));
  });
});

describe('when ModifyIdentityForEducationOrganizationAndSubTypesDiminisher diminishes EducationOrganization with School subclass with identity rename property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationOrganization: string = 'EducationOrganization';
  const educationOrganizationId: string = 'EducationOrganizationId';
  const educationOrganizationIdentifier: string = 'EducationOrganizationIdentifier';
  const educationOrganizationIdentifierDocumentation: string = 'EducationOrganizationIdentifierDocumentation';
  const school: string = 'School';
  const schoolIdentityRename: string = 'SchoolIdentityRename';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: educationOrganization,
      namespace,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: educationOrganizationIdentifier,
      documentation: educationOrganizationIdentifierDocumentation,
      namespace,
      isPartOfIdentity: true,
      parentEntity: entity,
      parentEntityName: entity.metaEdName,
      data: {
        edfiOds: {
          ods_IsUniqueIndex: false,
        },
      },
    });
    entity.data.edfiOds.ods_Properties.push(property);
    entity.data.edfiOds.ods_IdentityProperties.push(property);
    namespace.entity.domainEntity.set(entity.metaEdName, entity);

    const entitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: school,
      namespace,
      baseEntityName: educationOrganization,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const identityRename: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: schoolIdentityRename,
      namespace,
      isPartOfIdentity: true,
      isIdentityRename: true,
    });
    entitySubclass.data.edfiOds.ods_Properties.push(identityRename);
    entitySubclass.data.edfiOds.ods_IdentityProperties.push(identityRename);
    entitySubclass.data.edfiOds.ods_Properties.push(property);
    entitySubclass.data.edfiOds.ods_IdentityProperties.push(property);
    namespace.entity.domainEntitySubclass.set(entitySubclass.metaEdName, entitySubclass);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have two ods properties on EducationOrganization', () => {
    const entity: DomainEntity = (namespace.entity.domainEntity.get(educationOrganization): any);
    expect(entity).toBeDefined();
    expect(entity.data.edfiOds.ods_Properties).toHaveLength(2);
  });

  it('should modify EducationOrganizationIdentifier property on EducationOrganization', () => {
    const property: IntegerProperty = R.head(
      (namespace.entity.domainEntity.get(educationOrganization): any).data.edfiOds.ods_Properties,
    );
    expect(property.metaEdName).toBe(educationOrganizationIdentifier);
    expect(property.data.edfiOds.ods_IsUniqueIndex).toBe(true);
    expect(property.isPartOfIdentity).toBe(false);
  });

  it('should remove EducationOrganizationIdentifier from identity properties on EducationOrganization', () => {
    const entity: DomainEntity = (namespace.entity.domainEntity.get(educationOrganization): any);
    expect(entity.data.edfiOds.ods_IdentityProperties).toHaveLength(1);
    expect(R.head(entity.data.edfiOds.ods_IdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to EducationOrganization', () => {
    const entity: DomainEntity = (namespace.entity.domainEntity.get(educationOrganization): any);
    const property: IntegerProperty = R.last(entity.data.edfiOds.ods_Properties);
    expect(property.metaEdName).toBe(educationOrganizationId);
    expect(property.documentation).toBe(educationOrganizationIdentifierDocumentation);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('edfi');
    expect(property.parentEntity).toBe(entity);
    expect(property.parentEntityName).toBe(educationOrganization);
    expect(property.data.edfiOds.ods_IsIdentityDatabaseType).toBe(false);
    expect(property).toBe(R.head(entity.data.edfiOds.ods_IdentityProperties));
  });

  it('should remove EducationOrganizationIdentifier from identity properties on School', () => {
    const entitySubclass: DomainEntity = (namespace.entity.domainEntitySubclass.get(school): any);
    expect(entitySubclass.data.edfiOds.ods_IdentityProperties).toHaveLength(1);
    expect(R.head(entitySubclass.data.edfiOds.ods_IdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
    expect(entitySubclass.data.edfiOds.ods_Properties.map(x => x.metaEdName)).not.toContain(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to School', () => {
    const entitySubclass: DomainEntitySubclass = (namespace.entity.domainEntitySubclass.get(school): any);
    expect(entitySubclass).toBeDefined();
    expect(entitySubclass.data.edfiOds.ods_Properties).toHaveLength(1);

    const property: IntegerProperty = R.last(entitySubclass.data.edfiOds.ods_Properties);
    expect(property.metaEdName).toBe(`${school}Id`);
    expect(property.documentation).toBe(`The identifier assigned to a ${entitySubclass.typeHumanizedName}.`);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('edfi');
    expect(property.parentEntity).toBe(entitySubclass);
    expect(property.parentEntityName).toBe(school);
    expect(property.isIdentityRename).toBe(true);
    expect(property.baseKeyName).toBe(educationOrganizationId);
    expect(property).toBe(R.head(entitySubclass.data.edfiOds.ods_IdentityProperties));
  });

  it('should remove identity rename properties on School', () => {
    const entitySubclass: DomainEntity = (namespace.entity.domainEntitySubclass.get(school): any);
    expect(entitySubclass.data.edfiOds.ods_Properties).toHaveLength(1);
    expect(entitySubclass.data.edfiOds.ods_IdentityProperties).toHaveLength(1);
    expect(R.head(entitySubclass.data.edfiOds.ods_Properties).metaEdName).not.toBe(schoolIdentityRename);
    expect(R.head(entitySubclass.data.edfiOds.ods_IdentityProperties).metaEdName).not.toBe(schoolIdentityRename);
  });
});
