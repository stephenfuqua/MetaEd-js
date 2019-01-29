import R from 'ramda';
import {
  newDomainEntity,
  newDomainEntitySubclass,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import { DomainEntity, DomainEntitySubclass, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ModifyIdentityForEducationOrganizationAndSubTypesDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';

describe('when ModifyIdentityForEducationOrganizationAndSubTypesDiminisher diminishes with no EducationOrganization entity', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';

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
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationOrganization = 'EducationOrganization';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: educationOrganization,
      namespace,
      isAbstract: true,
      data: {
        edfiOds: {
          odsIdentityProperties: [],
          odsProperties: [],
        },
      },
    });
    namespace.entity.domainEntity.set(entity.metaEdName, entity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not fail', () => {
    expect(namespace.entity.domainEntity.get(educationOrganization)).toBeDefined();
    expect((namespace.entity.domainEntity.get(educationOrganization) as any).data.edfiOds.odsProperties).toHaveLength(0);
  });
});

describe('when ModifyIdentityForEducationOrganizationAndSubTypesDiminisher diminishes EducationOrganization with School subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationOrganization = 'EducationOrganization';
  const educationOrganizationId = 'EducationOrganizationId';
  const educationOrganizationIdentifier = 'EducationOrganizationIdentifier';
  const educationOrganizationIdentifierDocumentation = 'EducationOrganizationIdentifierDocumentation';
  const school = 'School';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: educationOrganization,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsIsUniqueIndex: false,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(property);
    entity.data.edfiOds.odsIdentityProperties.push(property);
    namespace.entity.domainEntity.set(entity.metaEdName, entity);

    const entitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: school,
      namespace,
      baseEntityName: educationOrganization,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    entitySubclass.data.edfiOds.odsProperties.push(property);
    entitySubclass.data.edfiOds.odsIdentityProperties.push(property);
    namespace.entity.domainEntitySubclass.set(entitySubclass.metaEdName, entitySubclass);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have two ods properties on EducationOrganization', () => {
    const entity: DomainEntity = namespace.entity.domainEntity.get(educationOrganization) as any;
    expect(entity).toBeDefined();
    expect(entity.data.edfiOds.odsProperties).toHaveLength(2);
  });

  it('should modify EducationOrganizationIdentifier property on EducationOrganization', () => {
    const property: IntegerProperty = R.head(
      (namespace.entity.domainEntity.get(educationOrganization) as any).data.edfiOds.odsProperties,
    );
    expect(property.metaEdName).toBe(educationOrganizationIdentifier);
    expect(property.data.edfiOds.odsIsUniqueIndex).toBe(true);
    expect(property.isPartOfIdentity).toBe(false);
  });

  it('should remove EducationOrganizationIdentifier from identity properties on EducationOrganization', () => {
    const entity: DomainEntity = namespace.entity.domainEntity.get(educationOrganization) as any;
    expect(entity.data.edfiOds.odsIdentityProperties).toHaveLength(1);
    expect(R.head(entity.data.edfiOds.odsIdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to EducationOrganization', () => {
    const entity: DomainEntity = namespace.entity.domainEntity.get(educationOrganization) as any;
    const property: IntegerProperty = R.last(entity.data.edfiOds.odsProperties);
    expect(property.metaEdName).toBe(educationOrganizationId);
    expect(property.documentation).toBe(educationOrganizationIdentifierDocumentation);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('EdFi');
    expect(property.parentEntity).toBe(entity);
    expect(property.parentEntityName).toBe(educationOrganization);
    expect(property.data.edfiOds.odsIsIdentityDatabaseType).toBe(false);
    expect(property).toBe(R.head(entity.data.edfiOds.odsIdentityProperties));
  });

  it('should remove EducationOrganizationIdentifier from identity properties on School', () => {
    const entitySubclass: DomainEntity = namespace.entity.domainEntitySubclass.get(school) as any;
    expect(entitySubclass.data.edfiOds.odsIdentityProperties).toHaveLength(1);
    expect(R.head(entitySubclass.data.edfiOds.odsIdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
    expect(entitySubclass.data.edfiOds.odsProperties.map(x => x.metaEdName)).not.toContain(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to School', () => {
    const entitySubclass: DomainEntitySubclass = namespace.entity.domainEntitySubclass.get(school) as any;
    expect(entitySubclass).toBeDefined();
    expect(entitySubclass.data.edfiOds.odsProperties).toHaveLength(1);

    const property: IntegerProperty = R.last(entitySubclass.data.edfiOds.odsProperties);
    expect(property.metaEdName).toBe(`${school}Id`);
    expect(property.documentation).toBe(`The identifier assigned to a ${entitySubclass.typeHumanizedName}.`);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('EdFi');
    expect(property.parentEntity).toBe(entitySubclass);
    expect(property.parentEntityName).toBe(school);
    expect(property.isIdentityRename).toBe(true);
    expect(property.baseKeyName).toBe(educationOrganizationId);
    expect(property).toBe(R.head(entitySubclass.data.edfiOds.odsIdentityProperties));
  });
});

describe('when ModifyIdentityForEducationOrganizationAndSubTypesDiminisher diminishes EducationOrganization with School subclass with identity rename property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationOrganization = 'EducationOrganization';
  const educationOrganizationId = 'EducationOrganizationId';
  const educationOrganizationIdentifier = 'EducationOrganizationIdentifier';
  const educationOrganizationIdentifierDocumentation = 'EducationOrganizationIdentifierDocumentation';
  const school = 'School';
  const schoolIdentityRename = 'SchoolIdentityRename';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: educationOrganization,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsIsUniqueIndex: false,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(property);
    entity.data.edfiOds.odsIdentityProperties.push(property);
    namespace.entity.domainEntity.set(entity.metaEdName, entity);

    const entitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: school,
      namespace,
      baseEntityName: educationOrganization,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const identityRename: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: schoolIdentityRename,
      namespace,
      isPartOfIdentity: true,
      isIdentityRename: true,
    });
    entitySubclass.data.edfiOds.odsProperties.push(identityRename);
    entitySubclass.data.edfiOds.odsIdentityProperties.push(identityRename);
    entitySubclass.data.edfiOds.odsProperties.push(property);
    entitySubclass.data.edfiOds.odsIdentityProperties.push(property);
    namespace.entity.domainEntitySubclass.set(entitySubclass.metaEdName, entitySubclass);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have two ods properties on EducationOrganization', () => {
    const entity: DomainEntity = namespace.entity.domainEntity.get(educationOrganization) as any;
    expect(entity).toBeDefined();
    expect(entity.data.edfiOds.odsProperties).toHaveLength(2);
  });

  it('should modify EducationOrganizationIdentifier property on EducationOrganization', () => {
    const property: IntegerProperty = R.head(
      (namespace.entity.domainEntity.get(educationOrganization) as any).data.edfiOds.odsProperties,
    );
    expect(property.metaEdName).toBe(educationOrganizationIdentifier);
    expect(property.data.edfiOds.odsIsUniqueIndex).toBe(true);
    expect(property.isPartOfIdentity).toBe(false);
  });

  it('should remove EducationOrganizationIdentifier from identity properties on EducationOrganization', () => {
    const entity: DomainEntity = namespace.entity.domainEntity.get(educationOrganization) as any;
    expect(entity.data.edfiOds.odsIdentityProperties).toHaveLength(1);
    expect(R.head(entity.data.edfiOds.odsIdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to EducationOrganization', () => {
    const entity: DomainEntity = namespace.entity.domainEntity.get(educationOrganization) as any;
    const property: IntegerProperty = R.last(entity.data.edfiOds.odsProperties);
    expect(property.metaEdName).toBe(educationOrganizationId);
    expect(property.documentation).toBe(educationOrganizationIdentifierDocumentation);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('EdFi');
    expect(property.parentEntity).toBe(entity);
    expect(property.parentEntityName).toBe(educationOrganization);
    expect(property.data.edfiOds.odsIsIdentityDatabaseType).toBe(false);
    expect(property).toBe(R.head(entity.data.edfiOds.odsIdentityProperties));
  });

  it('should remove EducationOrganizationIdentifier from identity properties on School', () => {
    const entitySubclass: DomainEntity = namespace.entity.domainEntitySubclass.get(school) as any;
    expect(entitySubclass.data.edfiOds.odsIdentityProperties).toHaveLength(1);
    expect(R.head(entitySubclass.data.edfiOds.odsIdentityProperties).metaEdName).not.toBe(educationOrganizationIdentifier);
    expect(entitySubclass.data.edfiOds.odsProperties.map(x => x.metaEdName)).not.toContain(educationOrganizationIdentifier);
  });

  it('should add EducationOrganizationId property to School', () => {
    const entitySubclass: DomainEntitySubclass = namespace.entity.domainEntitySubclass.get(school) as any;
    expect(entitySubclass).toBeDefined();
    expect(entitySubclass.data.edfiOds.odsProperties).toHaveLength(1);

    const property: IntegerProperty = R.last(entitySubclass.data.edfiOds.odsProperties);
    expect(property.metaEdName).toBe(`${school}Id`);
    expect(property.documentation).toBe(`The identifier assigned to a ${entitySubclass.typeHumanizedName}.`);
    expect(property.isPartOfIdentity).toBe(true);
    expect(property.namespace.namespaceName).toBe('EdFi');
    expect(property.parentEntity).toBe(entitySubclass);
    expect(property.parentEntityName).toBe(school);
    expect(property.isIdentityRename).toBe(true);
    expect(property.baseKeyName).toBe(educationOrganizationId);
    expect(property).toBe(R.head(entitySubclass.data.edfiOds.odsIdentityProperties));
  });

  it('should remove identity rename properties on School', () => {
    const entitySubclass: DomainEntity = namespace.entity.domainEntitySubclass.get(school) as any;
    expect(entitySubclass.data.edfiOds.odsProperties).toHaveLength(1);
    expect(entitySubclass.data.edfiOds.odsIdentityProperties).toHaveLength(1);
    expect(R.head(entitySubclass.data.edfiOds.odsProperties).metaEdName).not.toBe(schoolIdentityRename);
    expect(R.head(entitySubclass.data.edfiOds.odsIdentityProperties).metaEdName).not.toBe(schoolIdentityRename);
  });
});
