// @flow
import R from 'ramda';
import {
  addEntityForNamespace,
  addProperty,
  newDomainEntity,
  newDomainEntityProperty,
  newSharedIntegerProperty,
  newMergedProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import type { SharedIntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/MergedPropertyEnhancer';

describe('when enhancing top level entity with nested reference to top level reference', () => {
  /*
  * DomainEntity 1
  *   SharedInteger 2
  *   DomainEntity 3
  *     merge 3.2 with 2
  */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName3: string = 'DomainEntityName3';
  let domainEntity1Property1: SharedIntegerProperty;
  let domainEntity3Property1: SharedIntegerProperty;
  beforeAll(() => {
    const SharedIntegerName2: string = 'SharedIntegerName2';

    const domainEntity3 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName3, namespace });
    domainEntity3Property1 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: SharedIntegerName2,
      propertyPathName: SharedIntegerName2,
      parentEntityName: domainEntityName3,
      parentEntity: domainEntity3,
      namespace,
    });
    domainEntity3.properties.push(domainEntity3Property1);
    addEntityForNamespace(domainEntity3);

    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    domainEntity1Property1 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: SharedIntegerName2,
      propertyPathName: SharedIntegerName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    const domainEntity1Property2 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      propertyPathName: domainEntityName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergedProperty(), {
      mergePropertyPath: [domainEntityName3, SharedIntegerName2],
      targetPropertyPath: [SharedIntegerName2],
    });
    domainEntity1Property2.mergedProperties.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).mergeProperty).toBe(domainEntity3Property1);
  });

  it('should have correct target property', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).targetProperty).toBe(domainEntity1Property1);
  });
});

describe('when enhancing top level entity with top level reference to nested reference', () => {
  /*
  * DomainEntity 1
  *   DomainEntity 2
  *   SharedInteger 3
  *     merge 3 with 2.3
  */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const sharedIntegerName3: string = 'SharedIntegerName3';
  let domainEntity1Property2: SharedIntegerProperty;
  let domainEntity2Property1: SharedIntegerProperty;
  beforeAll(() => {
    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    domainEntity2Property1 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: sharedIntegerName3,
      propertyPathName: sharedIntegerName3,
      parentEntityName: domainEntityName2,
      parentEntity: domainEntity2,
      namespace,
    });
    domainEntity2.properties.push(domainEntity2Property1);
    addEntityForNamespace(domainEntity2);

    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    const domainEntity1Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      propertyPathName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    domainEntity1Property2 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: sharedIntegerName3,
      propertyPathName: sharedIntegerName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergedProperty(), {
      mergePropertyPath: [sharedIntegerName3],
      targetPropertyPath: [domainEntityName2, sharedIntegerName3],
    });
    domainEntity1Property2.mergedProperties.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = R.head(metaEd.propertyIndex.sharedInteger.filter(p => p.metaEdName === sharedIntegerName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).mergeProperty).toBe(domainEntity1Property2);
  });

  it('should have correct target property', () => {
    const property = R.head(metaEd.propertyIndex.sharedInteger.filter(p => p.metaEdName === sharedIntegerName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).targetProperty).toBe(domainEntity2Property1);
  });
});

describe('when enhancing top level entity with nested reference to nested reference', () => {
  /*
  * DomainEntity 1
  *   DomainEntity 2
  *   DomainEntity 3
  *     merge 3.4 with 2.4
  */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName3: string = 'DomainEntityName3';
  let domainEntity2Property1: SharedIntegerProperty;
  let domainEntity3Property1: SharedIntegerProperty;
  beforeAll(() => {
    const sharedIntegerName4: string = 'SharedIntegerName4';
    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    domainEntity2Property1 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: sharedIntegerName4,
      propertyPathName: sharedIntegerName4,
      parentEntityName: domainEntityName2,
      parentEntity: domainEntity2,
      namespace,
    });
    domainEntity2.properties.push(domainEntity2Property1);
    addEntityForNamespace(domainEntity2);

    const domainEntity3 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName3, namespace });
    domainEntity3Property1 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: sharedIntegerName4,
      propertyPathName: sharedIntegerName4,
      parentEntityName: domainEntityName3,
      parentEntity: domainEntity3,
      namespace,
    });
    domainEntity3.properties.push(domainEntity3Property1);
    addEntityForNamespace(domainEntity3);

    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    const domainEntity1Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      propertyPathName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    const domainEntity1Property2 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      propertyPathName: domainEntityName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergedProperty(), {
      mergePropertyPath: [domainEntityName3, sharedIntegerName4],
      targetPropertyPath: [domainEntityName2, sharedIntegerName4],
    });
    domainEntity1Property2.mergedProperties.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).mergeProperty).toBe(domainEntity3Property1);
  });

  it('should have correct target property', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).targetProperty).toBe(domainEntity2Property1);
  });
});

describe('when enhancing top level entity with deep nested reference to deep nested reference', () => {
  /*
  * DomainEntity 1
  *   DomainEntity 2
  *   DomainEntity 3
  *     merge 3.4.6 with 2.5.6
  */
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName3: string = 'DomainEntityName3';
  let domainEntity4Property1: SharedIntegerProperty;
  let domainEntity5Property1: SharedIntegerProperty;
  beforeAll(() => {
    const sharedIntegerName6: string = 'SharedIntegerName6';

    const domainEntityName4: string = 'DomainEntityName4';
    const domainEntity4 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName4, namespace });
    domainEntity4Property1 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: sharedIntegerName6,
      propertyPathName: sharedIntegerName6,
      parentEntityName: domainEntityName4,
      parentEntity: domainEntity4,
      namespace,
    });
    domainEntity4.properties.push(domainEntity4Property1);
    addEntityForNamespace(domainEntity4);

    const domainEntityName5: string = 'DomainEntityName5';
    const domainEntity5 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName5, namespace });
    domainEntity5Property1 = Object.assign(newSharedIntegerProperty(), {
      metaEdName: sharedIntegerName6,
      propertyPathName: sharedIntegerName6,
      parentEntityName: domainEntityName5,
      parentEntity: domainEntity5,
      namespace,
    });
    domainEntity5.properties.push(domainEntity5Property1);
    addEntityForNamespace(domainEntity5);

    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntity2 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName2, namespace });
    const domainEntity2Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName5,
      propertyPathName: domainEntityName5,
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
      propertyPathName: domainEntityName4,
      parentEntityName: domainEntityName3,
      parentEntity: domainEntity3,
      referencedEntity: domainEntity4,
      namespace,
    });
    domainEntity3.properties.push(domainEntity3Property1);
    addEntityForNamespace(domainEntity3);

    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntity1 = Object.assign(newDomainEntity(), { metaEdName: domainEntityName1, namespace });
    const domainEntity1Property1 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName2,
      propertyPathName: domainEntityName2,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity2,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property1);
    const domainEntity1Property2 = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName3,
      propertyPathName: domainEntityName3,
      parentEntityName: domainEntityName1,
      parentEntity: domainEntity1,
      referencedEntity: domainEntity3,
      namespace,
    });
    domainEntity1.properties.push(domainEntity1Property2);
    addProperty(metaEd.propertyIndex, domainEntity1Property2);
    const mergedProperty = Object.assign(newMergedProperty(), {
      mergePropertyPath: [domainEntityName3, domainEntityName4, sharedIntegerName6],
      targetPropertyPath: [domainEntityName2, domainEntityName5, sharedIntegerName6],
    });
    domainEntity1Property2.mergedProperties.push(mergedProperty);
    addEntityForNamespace(domainEntity1);

    enhance(metaEd);
  });

  it('should have correct merge property', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).mergeProperty).toBe(domainEntity4Property1);
  });

  it('should have correct target property', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === domainEntityName3));
    expect(property).toBeDefined();
    expect(R.head(property.mergedProperties).targetProperty).toBe(domainEntity5Property1);
  });
});
