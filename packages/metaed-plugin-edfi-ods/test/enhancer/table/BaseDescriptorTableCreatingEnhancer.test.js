// @flow
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/enhancer/table/BaseDescriptorTableCreatingEnhancer';
import { addEdFiOdsEntityRepositoryTo } from '../../../src/model/EdFiOdsEntityRepository';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import type { Table } from '../../../src/model/database/Table';
import { asTable } from '../../../src/model/database/Table';

describe('when BaseDescriptorTableCreatingEnhancer enhances', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    addEdFiOdsEntityRepositoryTo(metaEd);
    enhance(metaEd);
  });

  it('should create descriptor table', () => {
    expect(tableEntities(metaEd, namespace).get('Descriptor')).toBeDefined();
  });

  it('should have eight descriptor columns', () => {
    const descriptorTable: Table = asTable(tableEntities(metaEd, namespace).get('Descriptor'));
    expect(descriptorTable.columns).toHaveLength(8);
    expect(descriptorTable.columns.map(x => x.name)).toEqual([
      'DescriptorId',
      'Namespace',
      'CodeValue',
      'ShortDescription',
      'Description',
      'PriorDescriptorId',
      'EffectiveBeginDate',
      'EffectiveEndDate',
    ]);
    expect(descriptorTable.columns.map(x => x.type)).toEqual([
      'integer',
      'string',
      'string',
      'string',
      'string',
      'integer',
      'date',
      'date',
    ]);
  });
});
