// @flow
import {
  newAssociation,
  newAssociationExtension,
  newAssociationSubclass,
  newDomainEntity,
  newDomainEntityExtension,
  newDomainEntitySubclass,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import type {
  Association,
  AssociationExtension,
  AssociationSubclass,
  DomainEntity,
  DomainEntityExtension,
  DomainEntitySubclass,
  IntegerProperty,
  MetaEdEnvironment,
  Namespace,
} from 'metaed-core';
import { enhance } from '../../src/enhancer/TopLevelEntityBaseReferenceEnhancer';

describe('when enhancing domain entity subclass base entity reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityDocumentation: string = 'DomainEntityDocumentation';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: domainEntityDocumentation,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: 'DomainEntitySubclassDocumentation',
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    namespace.entity.domainEntitySubclass.set(domainEntitySubclassName, domainEntitySubclass);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const domainEntity: any = namespace.entity.domainEntitySubclass.get(domainEntitySubclassName);
    expect(domainEntity.data.edfiOds.ods_IdentityProperties).toHaveLength(1);

    const referentialProperty: any = domainEntity.data.edfiOds.ods_IdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(domainEntityName);
    expect(referentialProperty.documentation).toBe(domainEntityDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.ods_DeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(domainEntity);
    expect(referentialProperty.referencedEntity).toBe(domainEntity.baseEntity);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToSuperclass).toBe(true);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToExtensionParent).toBe(false);
  });
});

describe('when enhancing domain entity subclass base entity reference with identity rename', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityDocumentation: string = 'DomainEntityDocumentation';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const IntegerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(() => {
    const integerProperty1: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'IntegerPropertyName1',
      namespace,
      isPartOfIdentity: true,
    });
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: domainEntityDocumentation,
      data: {
        edfiOds: {
          ods_Properties: [integerProperty1],
          ods_IdentityProperties: [integerProperty1],
        },
      },
    });

    const integerProperty2: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: IntegerPropertyName2,
      isPartOfIdentity: true,
      isIdentityRename: true,
    });
    const domainEntitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: 'DomainEntitySubclassDocumentation',
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          ods_Properties: [integerProperty2],
          ods_IdentityProperties: [integerProperty2],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    namespace.entity.domainEntitySubclass.set(domainEntitySubclassName, domainEntitySubclass);
    enhance(metaEd);
  });

  it('should not create base entity reference property', () => {
    const domainEntity: any = namespace.entity.domainEntitySubclass.get(domainEntitySubclassName);
    expect(domainEntity.data.edfiOds.ods_IdentityProperties).toHaveLength(1);

    const referentialProperty: any = domainEntity.data.edfiOds.ods_IdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(IntegerPropertyName2);
  });
});

describe('when enhancing domain entity extension base entity reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityDocumentation: string = 'DomainEntityDocumentation';
  const domainEntityExtensionName: string = 'DomainEntityExtensionName';

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: domainEntityDocumentation,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntityExtension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: 'DomainEntityExtensionDocumentation',
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    namespace.entity.domainEntityExtension.set(domainEntityExtensionName, domainEntityExtension);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const domainEntity: any = namespace.entity.domainEntityExtension.get(domainEntityExtensionName);
    expect(domainEntity.data.edfiOds.ods_IdentityProperties).toHaveLength(1);

    const referentialProperty: any = domainEntity.data.edfiOds.ods_IdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(domainEntityName);
    expect(referentialProperty.documentation).toBe(domainEntityDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.ods_DeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(domainEntity);
    expect(referentialProperty.referencedEntity).toBe(domainEntity.baseEntity);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToSuperclass).toBe(false);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToExtensionParent).toBe(true);
  });
});

describe('when enhancing association subclass base entity reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const associationName: string = 'AssociationName';
  const associationDocumentation: string = 'AssociationDocumentation';
  const associationSubclassName: string = 'AssociationSubclassName';

  beforeAll(() => {
    const association: Association = Object.assign(newAssociation(), {
      metaEdName: associationName,
      namespace,
      documentation: associationDocumentation,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationSubclass: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      metaEdName: associationName,
      namespace,
      documentation: 'AssociationSubclassDocumentation',
      baseEntity: association,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    namespace.entity.association.set(associationName, association);
    namespace.entity.associationSubclass.set(associationSubclassName, associationSubclass);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const association: any = namespace.entity.associationSubclass.get(associationSubclassName);
    expect(association.data.edfiOds.ods_IdentityProperties).toHaveLength(1);

    const referentialProperty: any = association.data.edfiOds.ods_IdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(associationName);
    expect(referentialProperty.documentation).toBe(associationDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.ods_DeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(association);
    expect(referentialProperty.referencedEntity).toBe(association.baseEntity);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToSuperclass).toBe(true);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToExtensionParent).toBe(false);
  });
});

describe('when enhancing association extension base entity reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const associationName: string = 'AssociationName';
  const associationDocumentation: string = 'AssociationDocumentation';
  const associationExtensionName: string = 'AssociationExtensionName';

  beforeAll(() => {
    const association: Association = Object.assign(newAssociation(), {
      metaEdName: associationName,
      namespace,
      documentation: associationDocumentation,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      metaEdName: associationName,
      namespace,
      documentation: 'AssociationExtensionDocumentation',
      baseEntity: association,
      data: {
        edfiOds: {
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    namespace.entity.association.set(associationName, association);
    namespace.entity.associationExtension.set(associationExtensionName, associationExtension);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const association: any = namespace.entity.associationExtension.get(associationExtensionName);
    expect(association.data.edfiOds.ods_IdentityProperties).toHaveLength(1);

    const referentialProperty: any = association.data.edfiOds.ods_IdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(associationName);
    expect(referentialProperty.documentation).toBe(associationDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.ods_DeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(association);
    expect(referentialProperty.referencedEntity).toBe(association.baseEntity);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToSuperclass).toBe(false);
    expect(referentialProperty.data.edfiOds.ods_IsReferenceToExtensionParent).toBe(true);
  });
});
