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
import {
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
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  const domainEntityDocumentation = 'DomainEntityDocumentation';
  const domainEntitySubclassName = 'DomainEntitySubclassName';

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: domainEntityDocumentation,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    namespace.entity.domainEntitySubclass.set(domainEntitySubclassName, domainEntitySubclass);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const domainEntity: any = namespace.entity.domainEntitySubclass.get(domainEntitySubclassName);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toHaveLength(1);

    const referentialProperty: any = domainEntity.data.edfiOds.odsIdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(domainEntityName);
    expect(referentialProperty.documentation).toBe(domainEntityDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.odsDeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(domainEntity);
    expect(referentialProperty.referencedEntity).toBe(domainEntity.baseEntity);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToSuperclass).toBe(true);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToExtensionParent).toBe(false);
  });
});

describe('when enhancing domain entity subclass base entity reference with identity rename', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  const domainEntityDocumentation = 'DomainEntityDocumentation';
  const domainEntitySubclassName = 'DomainEntitySubclassName';
  const IntegerPropertyName2 = 'IntegerPropertyName2';

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
          odsProperties: [integerProperty1],
          odsIdentityProperties: [integerProperty1],
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
          odsProperties: [integerProperty2],
          odsIdentityProperties: [integerProperty2],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    namespace.entity.domainEntitySubclass.set(domainEntitySubclassName, domainEntitySubclass);
    enhance(metaEd);
  });

  it('should not create base entity reference property', () => {
    const domainEntity: any = namespace.entity.domainEntitySubclass.get(domainEntitySubclassName);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toHaveLength(1);

    const referentialProperty: any = domainEntity.data.edfiOds.odsIdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(IntegerPropertyName2);
  });
});

describe('when enhancing domain entity extension base entity reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  const domainEntityDocumentation = 'DomainEntityDocumentation';
  const domainEntityExtensionName = 'DomainEntityExtensionName';

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      documentation: domainEntityDocumentation,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntityName, domainEntity);
    namespace.entity.domainEntityExtension.set(domainEntityExtensionName, domainEntityExtension);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const domainEntity: any = namespace.entity.domainEntityExtension.get(domainEntityExtensionName);
    expect(domainEntity.data.edfiOds.odsIdentityProperties).toHaveLength(1);

    const referentialProperty: any = domainEntity.data.edfiOds.odsIdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(domainEntityName);
    expect(referentialProperty.documentation).toBe(domainEntityDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.odsDeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(domainEntity);
    expect(referentialProperty.referencedEntity).toBe(domainEntity.baseEntity);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToSuperclass).toBe(false);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToExtensionParent).toBe(true);
  });
});

describe('when enhancing association subclass base entity reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const associationName = 'AssociationName';
  const associationDocumentation = 'AssociationDocumentation';
  const associationSubclassName = 'AssociationSubclassName';

  beforeAll(() => {
    const association: Association = Object.assign(newAssociation(), {
      metaEdName: associationName,
      namespace,
      documentation: associationDocumentation,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    namespace.entity.association.set(associationName, association);
    namespace.entity.associationSubclass.set(associationSubclassName, associationSubclass);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const association: any = namespace.entity.associationSubclass.get(associationSubclassName);
    expect(association.data.edfiOds.odsIdentityProperties).toHaveLength(1);

    const referentialProperty: any = association.data.edfiOds.odsIdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(associationName);
    expect(referentialProperty.documentation).toBe(associationDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.odsDeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(association);
    expect(referentialProperty.referencedEntity).toBe(association.baseEntity);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToSuperclass).toBe(true);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToExtensionParent).toBe(false);
  });
});

describe('when enhancing association extension base entity reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const associationName = 'AssociationName';
  const associationDocumentation = 'AssociationDocumentation';
  const associationExtensionName = 'AssociationExtensionName';

  beforeAll(() => {
    const association: Association = Object.assign(newAssociation(), {
      metaEdName: associationName,
      namespace,
      documentation: associationDocumentation,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    namespace.entity.association.set(associationName, association);
    namespace.entity.associationExtension.set(associationExtensionName, associationExtension);
    enhance(metaEd);
  });

  it('should create base entity reference property', () => {
    const association: any = namespace.entity.associationExtension.get(associationExtensionName);
    expect(association.data.edfiOds.odsIdentityProperties).toHaveLength(1);

    const referentialProperty: any = association.data.edfiOds.odsIdentityProperties[0];
    expect(referentialProperty).toBeDefined();
    expect(referentialProperty.metaEdName).toBe(associationName);
    expect(referentialProperty.documentation).toBe(associationDocumentation);
    expect(referentialProperty.isPartOfIdentity).toBe(true);
    expect(referentialProperty.data.edfiOds.odsDeleteCascadePrimaryKey).toBe(true);
    expect(referentialProperty.parentEntity).toBe(association);
    expect(referentialProperty.referencedEntity).toBe(association.baseEntity);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToSuperclass).toBe(false);
    expect(referentialProperty.data.edfiOds.odsIsReferenceToExtensionParent).toBe(true);
  });
});
