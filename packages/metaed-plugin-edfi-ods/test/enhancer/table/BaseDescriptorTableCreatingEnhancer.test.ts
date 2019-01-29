import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/enhancer/table/BaseDescriptorTableCreatingEnhancer';
import { addEdFiOdsEntityRepositoryTo } from '../../../src/model/EdFiOdsEntityRepository';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { Table } from '../../../src/model/database/Table';

describe('when BaseDescriptorTableCreatingEnhancer enhances', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
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
    const descriptorTable: Table = tableEntities(metaEd, namespace).get('Descriptor') as Table;
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
