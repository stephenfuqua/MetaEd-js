import {
  newMetaEdEnvironment,
  newAssociation,
  newAssociationProperty,
  newAssociationSubclass,
  newNamespace,
} from 'metaed-core';
import { MetaEdEnvironment, Association, AssociationSubclass, AssociationProperty, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance as copyPropertiesEnhance } from '../../src/enhancer/CopyPropertiesEnhancer';
import { enhance } from '../../src/enhancer/SubclassIdentityEnhancer';

describe('when enhancing association subclass without identity renames', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const baseAssociationName = 'BaseName';
  const subclassAssociationName = 'SubclassName';
  let baseIdentityProperty: AssociationProperty;
  let subclassIdentityProperty: AssociationProperty;

  beforeAll(() => {
    baseIdentityProperty = Object.assign(newAssociationProperty(), {
      metaEdName: 'BaseIdentityProperty',
      namespace,
      isPartOfIdentity: true,
    });

    const baseAssociation: Association = Object.assign(newAssociation(), {
      metaEdName: baseAssociationName,
      namespace,
      properties: [baseIdentityProperty],
      identityProperties: [baseIdentityProperty],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.association.set(baseAssociation.metaEdName, baseAssociation);

    subclassIdentityProperty = Object.assign(newAssociationProperty(), {
      metaEdName: 'SubclassIdentityProperty',
      namespace,
      isPartOfIdentity: true,
    });

    const subclassAssociation: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      metaEdName: subclassAssociationName,
      namespace,
      baseEntityName: baseAssociationName,
      baseEntity: baseAssociation,
      properties: [subclassIdentityProperty],
      identityProperties: [subclassIdentityProperty],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.associationSubclass.set(subclassAssociation.metaEdName, subclassAssociation);

    initializeTopLevelEntities(metaEd);
    copyPropertiesEnhance(metaEd);
    enhance(metaEd);
  });

  it('should add base identity property to subclass primary key list', () => {
    const associationSubclass: any = namespace.entity.associationSubclass.get(subclassAssociationName);
    expect(associationSubclass.data.edfiXsd.xsdIdentityProperties).toContain(baseIdentityProperty);
  });

  it('should still have original identity', () => {
    const associationSubclass: any = namespace.entity.associationSubclass.get(subclassAssociationName);
    expect(associationSubclass.data.edfiXsd.xsdIdentityProperties).toContain(subclassIdentityProperty);
  });

  it('should not have base identity in properties', () => {
    const associationSubclass: any = namespace.entity.associationSubclass.get(subclassAssociationName);
    expect(associationSubclass.data.edfiXsd.xsdProperties).not.toContain(baseIdentityProperty);
  });
});

describe('when enhancing association subclass with identity renames', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const baseAssociationName = 'BaseName';
  const baseIdentityName = 'BaseKeyName';
  const subclassAssociationName = 'SubclassName';
  let baseIdentityProperty: AssociationProperty;
  let subclassIdentityProperty: AssociationProperty;
  let subclassIdentityRenameProperty: AssociationProperty;

  beforeAll(() => {
    baseIdentityProperty = Object.assign(newAssociationProperty(), {
      metaEdName: baseIdentityName,
      namespace,
      isPartOfIdentity: true,
    });

    const baseAssociation: Association = Object.assign(newAssociation(), {
      metaEdName: baseAssociationName,
      namespace,
      properties: [baseIdentityProperty],
      identityProperties: [baseIdentityProperty],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.association.set(baseAssociation.metaEdName, baseAssociation);

    subclassIdentityProperty = Object.assign(newAssociationProperty(), {
      metaEdName: 'SubclassIdentityProperty',
      namespace,
      isPartOfIdentity: true,
    });

    subclassIdentityRenameProperty = Object.assign(newAssociationProperty(), {
      metaEdName: 'SubclassIdentityRenameProperty',
      namespace,
      isIdentityRename: true,
      baseKeyName: baseIdentityName,
    });

    const subclassAssociation: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      metaEdName: subclassAssociationName,
      namespace,
      baseEntityName: baseAssociationName,
      baseEntity: baseAssociation,
      properties: [subclassIdentityProperty, subclassIdentityRenameProperty],
      identityProperties: [subclassIdentityProperty, subclassIdentityRenameProperty],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.associationSubclass.set(subclassAssociation.metaEdName, subclassAssociation);

    initializeTopLevelEntities(metaEd);
    copyPropertiesEnhance(metaEd);
    enhance(metaEd);
  });

  it('should not add renamed identity property to subclass', () => {
    const associationSubclass: any = namespace.entity.associationSubclass.get(subclassAssociationName);
    expect(associationSubclass.data.edfiXsd.xsdIdentityProperties).not.toContain(baseIdentityProperty);
  });
});
