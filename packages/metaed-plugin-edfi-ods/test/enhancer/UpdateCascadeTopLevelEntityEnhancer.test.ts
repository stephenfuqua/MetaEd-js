import {
  addEntityForNamespace,
  newAssociation,
  newAssociationProperty,
  newDomainEntity,
  newDomainEntityProperty,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import {
  Association,
  AssociationProperty,
  DomainEntity,
  DomainEntityProperty,
  IntegerProperty,
  MetaEdEnvironment,
  Namespace,
} from 'metaed-core';
import { enhance } from '../../src/enhancer/UpdateCascadeTopLevelEntityEnhancer';

describe('when UpdateCascadeTopLevelEntityEnhancer enhances domain entity with allow primary key updates', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName1 = 'DomainEntityName1';
  const domainEntityName2 = 'DomainEntityName2';
  const domainEntityName3 = 'DomainEntityName3';

  beforeAll(() => {
    const domainEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName1,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity1Property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'IntegerPropertyName',
      namespace,
      parentEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity1.data.edfiOds.odsProperties.push(domainEntity1Property);
    domainEntity1.data.edfiOds.odsIdentityProperties.push(domainEntity1Property);
    addEntityForNamespace(domainEntity1);

    const domainEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName2,
      namespace,
      allowPrimaryKeyUpdates: true,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity2Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity2.data.edfiOds.odsProperties.push(domainEntity2Property);
    domainEntity2.data.edfiOds.odsIdentityProperties.push(domainEntity2Property);
    addEntityForNamespace(domainEntity2);

    const domainEntity3: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName3,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity3Property1: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity3.data.edfiOds.odsProperties.push(domainEntity3Property1);
    domainEntity3.data.edfiOds.odsIdentityProperties.push(domainEntity3Property1);
    const domainEntity3Property2: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      namespace,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity2,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity3.data.edfiOds.odsProperties.push(domainEntity3Property2);
    domainEntity3.data.edfiOds.odsIdentityProperties.push(domainEntity3Property2);
    addEntityForNamespace(domainEntity3);

    enhance(metaEd);
  });

  it('should not have cascade primary key updates for first domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName1);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(false);
  });

  it('should have cascade primary key updates for second domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName2);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for third domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName3);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });
});

describe('when UpdateCascadeTopLevelEntityEnhancer enhances associations with allow primary key updates', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName1 = 'DomainEntityName1';
  const domainEntityName2 = 'DomainEntityName2';
  const domainEntityName3 = 'DomainEntityName3';
  const associationName = 'AssociationName';

  beforeAll(() => {
    const domainEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName1,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity1Property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'IntegerPropertyName',
      namespace,
      parentEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity1.data.edfiOds.odsProperties.push(domainEntity1Property);
    domainEntity1.data.edfiOds.odsIdentityProperties.push(domainEntity1Property);
    addEntityForNamespace(domainEntity1);

    const domainEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName2,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity2Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity2.data.edfiOds.odsProperties.push(domainEntity2Property);
    domainEntity2.data.edfiOds.odsIdentityProperties.push(domainEntity2Property);
    addEntityForNamespace(domainEntity2);

    const association: Association = Object.assign(newAssociation(), {
      metaEdName: associationName,
      namespace,
      allowPrimaryKeyUpdates: true,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const associationProperty1: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: association,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    association.data.edfiOds.odsProperties.push(associationProperty1);
    association.data.edfiOds.odsIdentityProperties.push(associationProperty1);
    const associationProperty2: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      namespace,
      parentEntity: association,
      referencedEntity: domainEntity2,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    association.data.edfiOds.odsProperties.push(associationProperty2);
    association.data.edfiOds.odsIdentityProperties.push(associationProperty2);
    addEntityForNamespace(association);

    const domainEntity3: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName3,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity3Property: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity3.data.edfiOds.odsProperties.push(domainEntity3Property);
    domainEntity3.data.edfiOds.odsIdentityProperties.push(domainEntity3Property);
    addEntityForNamespace(domainEntity3);
    enhance(metaEd);
  });

  it('should not have cascade primary key updates for first domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName1);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(false);
  });

  it('should not have cascade primary key updates for second domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName2);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(false);
  });

  it('should have cascade primary key updates for association', (): void => {
    const association: any = namespace.entity.association.get(associationName);
    expect(association.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for third domain entity', (): void => {
    const association: any = namespace.entity.association.get(associationName);
    expect(association.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });
});

describe('when UpdateCascadeTopLevelEntityEnhancer enhances domain entity with allow primary key updates on deep reference graph', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName1 = 'DomainEntityName1';
  const domainEntityName2 = 'DomainEntityName2';
  const domainEntityName3 = 'DomainEntityName3';
  const domainEntityName4 = 'DomainEntityName4';

  beforeAll(() => {
    const domainEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName1,
      namespace,
      allowPrimaryKeyUpdates: true,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity1Property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'IntegerPropertyName',
      namespace,
      parentEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity1.data.edfiOds.odsProperties.push(domainEntity1Property);
    domainEntity1.data.edfiOds.odsIdentityProperties.push(domainEntity1Property);
    addEntityForNamespace(domainEntity1);

    const domainEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName2,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity2Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity2.data.edfiOds.odsProperties.push(domainEntity2Property);
    domainEntity2.data.edfiOds.odsIdentityProperties.push(domainEntity2Property);
    addEntityForNamespace(domainEntity2);

    const domainEntity3: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName3,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity3Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      namespace,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity2,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity3.data.edfiOds.odsProperties.push(domainEntity3Property);
    domainEntity3.data.edfiOds.odsIdentityProperties.push(domainEntity3Property);
    addEntityForNamespace(domainEntity3);

    const domainEntity4: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName4,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity4Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      namespace,
      parentEntity: domainEntity4,
      referencedEntity: domainEntity3,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity4.data.edfiOds.odsProperties.push(domainEntity4Property);
    domainEntity4.data.edfiOds.odsIdentityProperties.push(domainEntity4Property);
    addEntityForNamespace(domainEntity4);

    enhance(metaEd);
  });

  it('should have cascade primary key updates for first domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName1);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for second domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName2);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for third domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName3);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for forth domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName4);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });
});

describe('when UpdateCascadeTopLevelEntityEnhancer enhances domain entity with allow primary key updates on cyclical reference graph', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName1 = 'DomainEntityName1';
  const domainEntityName2 = 'DomainEntityName2';
  const domainEntityName3 = 'DomainEntityName3';
  const domainEntityName4 = 'DomainEntityName4';

  beforeAll(() => {
    const domainEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName1,
      namespace,
      allowPrimaryKeyUpdates: true,
      data: {
        edfiOds: {
          odsTableName: domainEntityName1,
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity1Property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'IntegerPropertyName',
      namespace,
      parentEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity1.data.edfiOds.odsProperties.push(domainEntity1Property);
    domainEntity1.data.edfiOds.odsIdentityProperties.push(domainEntity1Property);
    addEntityForNamespace(domainEntity1);

    const domainEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName2,
      namespace,
      data: {
        edfiOds: {
          odsTableName: domainEntityName2,
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity2Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity2.data.edfiOds.odsProperties.push(domainEntity2Property);
    domainEntity2.data.edfiOds.odsIdentityProperties.push(domainEntity2Property);
    addEntityForNamespace(domainEntity2);

    const domainEntity3: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName3,
      namespace,
      data: {
        edfiOds: {
          odsTableName: domainEntityName3,
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity3Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity3.data.edfiOds.odsProperties.push(domainEntity3Property);
    domainEntity3.data.edfiOds.odsIdentityProperties.push(domainEntity3Property);
    addEntityForNamespace(domainEntity3);

    const domainEntity4: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName4,
      namespace,
      data: {
        edfiOds: {
          odsTableName: domainEntityName4,
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity4Property1: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      namespace,
      parentEntity: domainEntity4,
      referencedEntity: domainEntity2,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsCausesCyclicUpdateCascade: false,
        },
      },
    });
    domainEntity4.data.edfiOds.odsProperties.push(domainEntity4Property1);
    domainEntity4.data.edfiOds.odsIdentityProperties.push(domainEntity4Property1);
    const domainEntity4Property2: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      namespace,
      parentEntity: domainEntity4,
      referencedEntity: domainEntity3,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity4.data.edfiOds.odsProperties.push(domainEntity4Property2);
    domainEntity4.data.edfiOds.odsIdentityProperties.push(domainEntity4Property2);
    addEntityForNamespace(domainEntity4);

    enhance(metaEd);
  });

  it('should have cascade primary key updates for first domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName1);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for second domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName2);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for third domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName3);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for forth domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName4);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have only one cascading property on forth domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName4);
    expect(domainEntity.data.edfiOds.odsProperties[0].data.edfiOds.odsCausesCyclicUpdateCascade).toBe(false);
    expect(domainEntity.data.edfiOds.odsProperties[1].data.edfiOds.odsCausesCyclicUpdateCascade).toBe(true);
  });
});

describe('when UpdateCascadeTopLevelEntityEnhancer enhances domain entity with allow primary key updates on non primary key reference', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName1 = 'DomainEntityName1';
  const domainEntityName2 = 'DomainEntityName2';
  const domainEntityName3 = 'DomainEntityName3';

  beforeAll(() => {
    const domainEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName1,
      namespace,
      allowPrimaryKeyUpdates: true,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity1Property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: 'IntegerPropertyName',
      namespace,
      parentEntity: domainEntity1,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity1.data.edfiOds.odsProperties.push(domainEntity1Property);
    domainEntity1.data.edfiOds.odsIdentityProperties.push(domainEntity1Property);
    addEntityForNamespace(domainEntity1);

    const domainEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName2,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity2Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName1,
      namespace,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity1,
      data: {
        edfiOds: {},
      },
    });
    domainEntity2.data.edfiOds.odsProperties.push(domainEntity2Property);
    addEntityForNamespace(domainEntity2);

    const domainEntity3: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName3,
      namespace,
      data: {
        edfiOds: {
          odsProperties: [],
          odsIdentityProperties: [],
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const domainEntity3Property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      namespace,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity2,
      isPartOfIdentity: true,
      data: {
        edfiOds: {},
      },
    });
    domainEntity3.data.edfiOds.odsProperties.push(domainEntity3Property);
    domainEntity3.data.edfiOds.odsIdentityProperties.push(domainEntity3Property);
    addEntityForNamespace(domainEntity3);

    enhance(metaEd);
  });

  it('should not have cascade primary key updates for first domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName1);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(true);
  });

  it('should have cascade primary key updates for second domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName2);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(false);
  });

  it('should have cascade primary key updates for third domain entity', (): void => {
    const domainEntity: any = namespace.entity.domainEntity.get(domainEntityName3);
    expect(domainEntity.data.edfiOds.odsCascadePrimaryKeyUpdates).toBe(false);
  });
});
