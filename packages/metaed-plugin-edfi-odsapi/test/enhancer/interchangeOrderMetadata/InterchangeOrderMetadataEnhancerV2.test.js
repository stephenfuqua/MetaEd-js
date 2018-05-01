// @flow
import graphlib, { Graph } from '@dagrejs/graphlib';
import {
  newMetaEdEnvironment,
  newPluginEnvironment,
  newNamespace,
  newDomainEntity,
  newInterchangeItem,
  newDomainEntityProperty,
  newIntegerProperty,
  newDomainEntityExtension,
} from 'metaed-core';
import type { MetaEdEnvironment, Namespace, DomainEntity, InterchangeItem, DomainEntityExtension } from 'metaed-core';
import { newEdFiXsdEntityRepository, newMergedInterchange, addMergedInterchangeToRepository } from 'metaed-plugin-edfi-xsd';
import type { MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { addMergedInterchangeEdfiOdsApiTo } from '../../../src/model/MergedInterchange';
import { addInterchangeItemEdfiOdsApiTo } from '../../../src/model/InterchangeItem';
import { enhance, sortGraph } from '../../../src/enhancer/interchangeOrderMetadata/InterchangeOrderMetadataEnhancerV2';

describe('when sorting graph with no cycles', () => {
  const graph = new Graph();

  beforeAll(() => {
    graph.setEdge('B', 'C', { isRequired: false });
    graph.setEdge('A', 'C', { isRequired: false });
    graph.setEdge('A', 'B', { isRequired: false });
  });

  it('should sort correctly', () => {
    expect(sortGraph(graph)).toEqual(['A', 'B', 'C']);
  });
});

describe('when sorting graph with reflexive cycle', () => {
  const graph = new Graph();

  beforeAll(() => {
    graph.setEdge('B', 'C', { isRequired: false });
    graph.setEdge('A', 'C', { isRequired: false });
    graph.setEdge('A', 'B', { isRequired: false });
    graph.setEdge('C', 'D', { isRequired: false });
    graph.setEdge('D', 'D', { isRequired: true });
  });

  it('should have cycle edge', () => {
    expect(graphlib.alg.findCycles(graph)[0]).toEqual(['D']);
  });

  it('should sort correctly', () => {
    expect(sortGraph(graph)).toEqual(['A', 'B', 'C', 'D']);
  });
});

describe('when sorting graph with symmetric cycle', () => {
  const graph = new Graph();

  beforeAll(() => {
    graph.setEdge('B', 'C', { isRequired: false });
    graph.setEdge('A', 'C', { isRequired: false });
    graph.setEdge('A', 'B', { isRequired: false });
    graph.setEdge('C', 'D', { isRequired: false });
    graph.setEdge('D', 'E', { isRequired: true });
    graph.setEdge('E', 'D', { isRequired: true });
  });

  it('should have cycle edges', () => {
    expect(graphlib.alg.findCycles(graph)[0]).toEqual(['E', 'D']);
  });

  it('should sort correctly', () => {
    expect(sortGraph(graph)).toEqual(['A', 'B', 'C', 'E', 'D']);
  });
});

describe('when sorting graph with transitive cycle', () => {
  const graph = new Graph();

  beforeAll(() => {
    graph.setEdge('B', 'C', { isRequired: false });
    graph.setEdge('A', 'C', { isRequired: false });
    graph.setEdge('A', 'B', { isRequired: false });
  });

  it('should not have cycle edges', () => {
    expect(graphlib.alg.findCycles(graph)).toEqual([]);
  });

  it('should sort correctly', () => {
    expect(sortGraph(graph)).toEqual(['A', 'B', 'C']);
  });
});

describe('when sorting graph with extended cycle', () => {
  const graph = new Graph();

  beforeAll(() => {
    graph.setEdge('B', 'C', { isRequired: false });
    graph.setEdge('A', 'C', { isRequired: false });
    graph.setEdge('A', 'B', { isRequired: false });
    graph.setEdge('C', 'D', { isRequired: false });
    graph.setEdge('D', 'E', { isRequired: true });
    graph.setEdge('E', 'F', { isRequired: true });
    graph.setEdge('F', 'D', { isRequired: true });
  });

  it('should have cycle edges', () => {
    expect(graphlib.alg.findCycles(graph)[0]).toEqual(['F', 'E', 'D']);
  });

  it('should sort correctly', () => {
    expect(sortGraph(graph)).toEqual(['A', 'B', 'C', 'E', 'F', 'D']);
  });
});

describe('when sorting graph with optional cycle', () => {
  const graph = new Graph();

  beforeAll(() => {
    graph.setEdge('B', 'C', { isRequired: false });
    graph.setEdge('A', 'C', { isRequired: false });
    graph.setEdge('A', 'B', { isRequired: false });
    graph.setEdge('C', 'D', { isRequired: false });
    // Reflexive
    graph.setEdge('D', 'D', { isRequired: false });
    graph.setEdge('D', 'E', { isRequired: false });
    // Symmetric
    graph.setEdge('E', 'F', { isRequired: false });
    graph.setEdge('F', 'E', { isRequired: false });
    graph.setEdge('F', 'G', { isRequired: false });
    // Cyclic
    graph.setEdge('G', 'H', { isRequired: false });
    graph.setEdge('H', 'I', { isRequired: false });
    graph.setEdge('I', 'G', { isRequired: false });
  });

  it('should have cycle edges', () => {
    expect(graphlib.alg.findCycles(graph)[0]).toEqual(['I', 'H', 'G']);
  });

  it('should sort correctly', () => {
    expect(sortGraph(graph)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
  });
});

describe('when InterchangeOrderMetadataEnhancer enhances interchange', () => {
  let mergedInterchange: MergedInterchange;
  const namespaceName: string = 'edfi';
  const domainEntityName: string = 'DomainEntityName';

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '2.0.0' });
    const plugin = Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    });
    metaEd.plugin.set('edfiXsd', plugin);

    const namespace: Namespace = Object.assign(newNamespace(), { namespaceName });
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const referencedEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName,
    });
    const interchangeItem1: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName,
      referencedEntity: referencedEntity1,
    });
    mergedInterchange = Object.assign(newMergedInterchange(), {
      namespace,
      elements: [interchangeItem1],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange);
    addInterchangeItemEdfiOdsApiTo(interchangeItem1);

    enhance(metaEd);
  });

  it('should have interchange order properties', () => {
    expect(mergedInterchange.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: domainEntityName },
    ]);
  });
});

describe('when InterchangeOrderMetadataEnhancer enhances interchange with different interchange item name', () => {
  let mergedInterchange: MergedInterchange;
  const namespaceName: string = 'edfi';
  const interchangeItemName: string = 'InterchangeItemName';

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '2.0.0' });
    const plugin = Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    });
    metaEd.plugin.set('edfiXsd', plugin);

    const namespace: Namespace = Object.assign(newNamespace(), { namespaceName });
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const referencedEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: 'DomainEntityName',
    });
    const interchangeItem1: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: interchangeItemName,
      referencedEntity: referencedEntity1,
    });
    mergedInterchange = Object.assign(newMergedInterchange(), {
      namespace,
      elements: [interchangeItem1],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange);
    addInterchangeItemEdfiOdsApiTo(interchangeItem1);

    enhance(metaEd);
  });

  it('should have interchange order properties', () => {
    expect(mergedInterchange.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: interchangeItemName },
    ]);
  });
});

describe('when InterchangeOrderMetadataEnhancer enhances interchange with internal dependency', () => {
  let mergedInterchange: MergedInterchange;
  const namespaceName: string = 'edfi';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '2.0.0' });
    const plugin = Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    });
    metaEd.plugin.set('edfiXsd', plugin);

    const namespace: Namespace = Object.assign(newNamespace(), { namespaceName });
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const referencedEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName1,
      properties: [],
    });
    const referencedEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName2,
    });
    referencedEntity1.properties.push(
      ...[
        Object.assign(newDomainEntityProperty(), {
          referencedEntity: referencedEntity1,
        }),
        Object.assign(newDomainEntityProperty(), {
          referencedEntity: referencedEntity2,
        }),
      ],
    );
    const interchangeItem1: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName1,
      referencedEntity: referencedEntity1,
    });
    const interchangeItem2: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName2,
      referencedEntity: referencedEntity2,
    });
    mergedInterchange = Object.assign(newMergedInterchange(), {
      namespace,
      elements: [interchangeItem1, interchangeItem2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange);
    addInterchangeItemEdfiOdsApiTo(interchangeItem1);
    addInterchangeItemEdfiOdsApiTo(interchangeItem2);

    enhance(metaEd);
  });

  it('should have interchange order properties', () => {
    expect(mergedInterchange.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: domainEntityName2 },
      { globalDependencyOrder: 2, name: domainEntityName1 },
    ]);
  });
});

describe('when InterchangeOrderMetadataEnhancer enhances interchange with external dependency', () => {
  let mergedInterchange1: MergedInterchange;
  let mergedInterchange2: MergedInterchange;
  const namespaceName: string = 'edfi';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '2.0.0' });
    const plugin = Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    });
    metaEd.plugin.set('edfiXsd', plugin);

    const namespace: Namespace = Object.assign(newNamespace(), { namespaceName });
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const referencedEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName1,
      properties: [newIntegerProperty()],
    });
    const referencedEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName2,
    });
    referencedEntity1.properties.push(
      ...[
        Object.assign(newDomainEntityProperty(), {
          referencedEntity: referencedEntity1,
        }),
        Object.assign(newDomainEntityProperty(), {
          referencedEntity: referencedEntity2,
        }),
      ],
    );
    const interchangeItem1: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName1,
      referencedEntity: referencedEntity1,
    });
    addInterchangeItemEdfiOdsApiTo(interchangeItem1);
    const interchangeItem2: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName2,
      referencedEntity: referencedEntity2,
    });
    addInterchangeItemEdfiOdsApiTo(interchangeItem2);
    mergedInterchange1 = Object.assign(newMergedInterchange(), {
      namespace,
      metaEdName: 'MergedInterchangeName1',
      elements: [interchangeItem1],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange1);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange1);

    mergedInterchange2 = Object.assign(newMergedInterchange(), {
      namespace,
      metaEdName: 'MergedInterchangeName2',
      elements: [interchangeItem2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange2);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange2);

    enhance(metaEd);
  });

  it('should have interchange order properties', () => {
    expect(mergedInterchange1.data.edfiOdsApi.apiOrder).toBe(20);
    expect(mergedInterchange1.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 2, name: domainEntityName1 },
    ]);

    expect(mergedInterchange2.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange2.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: domainEntityName2 },
    ]);
  });
});

describe('when InterchangeOrderMetadataEnhancer enhances interchange with external dependency in extension', () => {
  let mergedInterchange1: MergedInterchange;
  let mergedInterchange2: MergedInterchange;
  let mergedInterchange2Extension: MergedInterchange;
  const namespaceName: string = 'edfi';
  const extensionNamespaceName: string = 'extension';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '2.0.0' });
    const plugin = Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    });
    metaEd.plugin.set('edfiXsd', plugin);

    const namespace: Namespace = Object.assign(newNamespace(), { namespaceName });
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    const extensionNamespace: Namespace = Object.assign(newNamespace(), {
      namespaceName: extensionNamespaceName,
      isExtension: true,
    });
    metaEd.entity.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const referencedEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityName1,
      properties: [newIntegerProperty()],
    });
    const referencedEntity1Extension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityName1,
      baseEntity: referencedEntity1,
      properties: [newIntegerProperty()],
    });
    const referencedEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName2,
    });
    referencedEntity1.properties.push(
      Object.assign(newDomainEntityProperty(), {
        referencedEntity: referencedEntity2,
      }),
    );
    const interchangeItem1: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName1,
      referencedEntity: referencedEntity1,
    });
    addInterchangeItemEdfiOdsApiTo(interchangeItem1);
    const interchangeItem2: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityName2,
      referencedEntity: referencedEntity2,
    });
    addInterchangeItemEdfiOdsApiTo(interchangeItem2);
    mergedInterchange1 = Object.assign(newMergedInterchange(), {
      namespace: extensionNamespace,
      metaEdName: 'MergedInterchangeName1',
      elements: [interchangeItem2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange1);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange1);
    mergedInterchange2 = Object.assign(newMergedInterchange(), {
      namespace,
      metaEdName: 'MergedInterchangeName2',
      elements: [interchangeItem1],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange2);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange2);
    mergedInterchange2Extension = Object.assign(newMergedInterchange(), {
      namespace: extensionNamespace,
      metaEdName: 'MergedInterchangeName2',
      elements: [
        Object.assign(interchangeItem1, {
          namespace: extensionNamespace,
          referencedEntity: referencedEntity1Extension,
        }),
      ],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange2Extension);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange2Extension);

    enhance(metaEd);
  });

  it('should have interchange order properties', () => {
    expect(mergedInterchange1.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange1.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: domainEntityName2 },
    ]);

    expect(mergedInterchange2.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange2.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: domainEntityName1 },
    ]);

    expect(mergedInterchange2Extension.data.edfiOdsApi.apiOrder).toBe(20);
    expect(mergedInterchange2Extension.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 2, name: domainEntityName1 },
    ]);
  });
});

describe('when InterchangeOrderMetadataEnhancer enhances interchange with external dependency in extension with duplicate name', () => {
  let mergedInterchange1: MergedInterchange;
  let mergedInterchange2: MergedInterchange;
  const namespaceName: string = 'edfi';
  const extensionNamespaceName: string = 'extension';
  const domainEntityName1: string = 'DomainEntityName1';

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '2.0.0' });
    const plugin = Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    });
    metaEd.plugin.set('edfiXsd', plugin);

    const namespace: Namespace = Object.assign(newNamespace(), { namespaceName });
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const extensionNamespace: Namespace = Object.assign(newNamespace(), {
      namespaceName: extensionNamespaceName,
      isExtension: true,
    });
    metaEd.entity.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const referencedEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName1,
      properties: [newIntegerProperty()],
    });
    const referencedEntity1Extension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityName1,
      baseEntity: referencedEntity1,
      properties: [newIntegerProperty()],
    });
    const interchangeItem1: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName1,
      referencedEntity: referencedEntity1,
    });
    addInterchangeItemEdfiOdsApiTo(interchangeItem1);
    const interchangeItem2: InterchangeItem = Object.assign(newInterchangeItem(), {
      namespace,
      metaEdName: domainEntityName1,
      referencedEntity: referencedEntity1Extension,
    });
    addInterchangeItemEdfiOdsApiTo(interchangeItem2);
    mergedInterchange1 = Object.assign(newMergedInterchange(), {
      namespace,
      elements: [interchangeItem1],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange1);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange1);

    mergedInterchange2 = Object.assign(newMergedInterchange(), {
      namespace: extensionNamespace,
      elements: [interchangeItem2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange2);
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange2);

    enhance(metaEd);
  });

  it('should have interchange order properties', () => {
    expect(mergedInterchange1.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange1.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: domainEntityName1 },
    ]);

    expect(mergedInterchange2.data.edfiOdsApi.apiOrder).toBe(10);
    expect(mergedInterchange2.data.edfiOdsApi.apiOrderedElements).toEqual([
      { globalDependencyOrder: 1, name: domainEntityName1 },
    ]);
  });
});
