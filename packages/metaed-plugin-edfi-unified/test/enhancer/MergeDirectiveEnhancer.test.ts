import {
  addEntityForNamespace,
  addProperty,
  newDomainEntity,
  newDomainEntityProperty,
  newMergeDirective,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import { DomainEntityProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/MergeDirectiveEnhancer';

describe('when enhancing top level entity with no merge directives', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName2 = 'DomainEntityPropertyName1';

  beforeAll(() => {
    const domainEntityName1 = 'DomainEntityName1';

    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    const domainEntityProperty1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      namespace,
    });
    domainEntity1.properties.push(domainEntityProperty1);
    addEntityForNamespace(domainEntity1);
    addProperty(metaEd.propertyIndex, domainEntityProperty1);

    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    addEntityForNamespace(domainEntity2);

    enhance(metaEd);
  });

  it('should have no merge directives', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName2)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives).toHaveLength(0);
  });
});

describe('when enhancing top level entity with nested reference to top level reference', () => {
  /*
   * DomainEntity 1
   *   DomainEntity 2
   *   DomainEntity 3
   *     merge 3.2 with 2
   */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName3 = 'DomainEntityName3';
  let domainEntity1Property1: DomainEntityProperty;
  let domainEntity1Property2: DomainEntityProperty;
  let domainEntity3Property1: DomainEntityProperty;
  beforeAll(() => {
    const domainEntityName2 = 'DomainEntityName2';
    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    addEntityForNamespace(domainEntity2);

    const domainEntity3 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName3, namespace });
    domainEntity3Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      fullPropertyName: domainEntityName2,
      parentEntityName: domainEntityName3,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity3.properties.push(domainEntity3Property1);
    addEntityForNamespace(domainEntity3);

    const domainEntityName1 = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    domainEntity1Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      fullPropertyName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    domainEntity1Property2 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      fullPropertyName: domainEntityName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergeDirective(), {
      sourcePropertyPath: [domainEntityName3, domainEntityName2],
      targetPropertyPath: [domainEntityName2],
    });
    domainEntity1Property2.mergeDirectives.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].sourceProperty).toBe(domainEntity3Property1);
  });

  it('should have correct target property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].targetProperty).toBe(domainEntity1Property1);
  });

  it('should have correct merge targeted by property', () => {
    expect(domainEntity1Property1.mergeTargetedBy).toHaveLength(1);
    expect(domainEntity1Property1.mergeTargetedBy[0]).toBe(domainEntity1Property2);
  });
});

describe('when enhancing top level entity with top level reference to nested reference', () => {
  /*
   * DomainEntity 1
   *   DomainEntity 2
   *   DomainEntity 3
   *     merge 3 with 2.3
   */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName3 = 'DomainEntityName3';
  let domainEntity1Property2: DomainEntityProperty;
  let domainEntity2Property1: DomainEntityProperty;
  beforeAll(() => {
    const domainEntity3 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName3, namespace });
    addEntityForNamespace(domainEntity3);

    const domainEntityName2 = 'DomainEntityName2';
    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    domainEntity2Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      fullPropertyName: domainEntityName3,
      parentEntityName: domainEntityName2,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity2.properties.push(domainEntity2Property1);
    addEntityForNamespace(domainEntity2);

    const domainEntityName1 = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    const domainEntity1Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      fullPropertyName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    domainEntity1Property2 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      fullPropertyName: domainEntityName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergeDirective(), {
      sourcePropertyPath: [domainEntityName3],
      targetPropertyPath: [domainEntityName2, domainEntityName3],
    });
    domainEntity1Property2.mergeDirectives.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].sourceProperty).toBe(domainEntity1Property2);
  });

  it('should have correct target property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].targetProperty).toBe(domainEntity2Property1);
  });
});

describe('when enhancing top level entity with nested reference to nested reference', () => {
  /*
   * DomainEntity 1
   *   DomainEntity 2
   *   DomainEntity 3
   *     merge 3.4 with 2.4
   */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName3 = 'DomainEntityName3';
  let domainEntity2Property1: DomainEntityProperty;
  let domainEntity3Property1: DomainEntityProperty;
  beforeAll(() => {
    const domainEntityName4 = 'DomainEntityName4';
    const domainEntity4 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName4, namespace });
    addEntityForNamespace(domainEntity4);

    const domainEntityName2 = 'DomainEntityName2';
    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    domainEntity2Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName4,
      fullPropertyName: domainEntityName4,
      parentEntityName: domainEntityName2,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity4,
      namespace,
    });
    domainEntity2.properties.push(domainEntity2Property1);
    addEntityForNamespace(domainEntity2);

    const domainEntity3 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName3, namespace });
    domainEntity3Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName4,
      fullPropertyName: domainEntityName4,
      parentEntityName: domainEntityName3,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity4,
      namespace,
    });
    domainEntity3.properties.push(domainEntity3Property1);
    addEntityForNamespace(domainEntity3);

    const domainEntityName1 = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    const domainEntity1Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      fullPropertyName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    const domainEntity1Property2 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      fullPropertyName: domainEntityName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergeDirective(), {
      sourcePropertyPath: [domainEntityName3, domainEntityName4],
      targetPropertyPath: [domainEntityName2, domainEntityName4],
    });
    domainEntity1Property2.mergeDirectives.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].sourceProperty).toBe(domainEntity3Property1);
  });

  it('should have correct target property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].targetProperty).toBe(domainEntity2Property1);
  });
});

describe('when enhancing top level entity with deep nested reference to deep nested reference', () => {
  /*
   * DomainEntity 1
   *   DomainEntity 2
   *   DomainEntity 3
   *     merge 3.4.6 with 2.5.6
   */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName3 = 'DomainEntityName3';
  let domainEntity4Property1: DomainEntityProperty;
  let domainEntity5Property1: DomainEntityProperty;
  beforeAll(() => {
    const domainEntityName6 = 'DomainEntityName6';
    const domainEntity6 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName6, namespace });
    addEntityForNamespace(domainEntity6);

    const domainEntityName4 = 'DomainEntityName4';
    const domainEntity4 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName4, namespace });
    domainEntity4Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName6,
      fullPropertyName: domainEntityName6,
      parentEntityName: domainEntityName4,
      parentEntity: domainEntity4,
      referencedEntity: domainEntity6,
      namespace,
    });
    domainEntity4.properties.push(domainEntity4Property1);
    addEntityForNamespace(domainEntity4);

    const domainEntityName5 = 'DomainEntityName5';
    const domainEntity5 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName5, namespace });
    domainEntity5Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName6,
      fullPropertyName: domainEntityName6,
      parentEntityName: domainEntityName5,
      parentEntity: domainEntity5,
      referencedEntity: domainEntity6,
      namespace,
    });
    domainEntity5.properties.push(domainEntity5Property1);
    addEntityForNamespace(domainEntity5);

    const domainEntityName2 = 'DomainEntityName2';
    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    const domainEntity2Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName5,
      fullPropertyName: domainEntityName5,
      parentEntityName: domainEntityName2,
      parentEntity: domainEntity2,
      referencedEntity: domainEntity5,
      namespace,
    });
    domainEntity2.properties.push(domainEntity2Property1);
    addEntityForNamespace(domainEntity2);

    const domainEntity3 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName3, namespace });
    const domainEntity3Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName4,
      fullPropertyName: domainEntityName4,
      parentEntityName: domainEntityName3,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity4,
      namespace,
    });
    domainEntity3.properties.push(domainEntity3Property1);
    addEntityForNamespace(domainEntity3);

    const domainEntityName1 = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    const domainEntity1Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      fullPropertyName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    const domainEntity1Property2 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      fullPropertyName: domainEntityName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergeDirective(), {
      sourcePropertyPath: [domainEntityName3, domainEntityName4, domainEntityName6],
      targetPropertyPath: [domainEntityName2, domainEntityName5, domainEntityName6],
    });
    domainEntity1Property2.mergeDirectives.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].sourceProperty).toBe(domainEntity4Property1);
  });

  it('should have correct target property', () => {
    const property = metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3)[0];
    expect(property).toBeDefined();
    expect(property.mergeDirectives[0].targetProperty).toBe(domainEntity5Property1);
  });
});
