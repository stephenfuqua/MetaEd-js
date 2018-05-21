// @flow
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/model/EdFiOdsEntityRepository';

describe('when BaseDescriptorTableCreatingEnhancer enhances', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    enhance(metaEd);
  });

  it('should create plugin entity table', () => {
    expect((metaEd.plugin.get('edfiOds'): any).namespace.get(namespace)).toBeDefined();
    expect((metaEd.plugin.get('edfiOds'): any).namespace.get(namespace).table).toBeDefined();
    expect((metaEd.plugin.get('edfiOds'): any).namespace.get(namespace).table).toBeInstanceOf(Map);
    expect((metaEd.plugin.get('edfiOds'): any).namespace.get(namespace).table.size).toBe(0);
    expect((metaEd.plugin.get('edfiOds'): any).namespace.get(namespace).row).toBeDefined();
    expect((metaEd.plugin.get('edfiOds'): any).namespace.get(namespace).row).toBeInstanceOf(Map);
    expect((metaEd.plugin.get('edfiOds'): any).namespace.get(namespace).row.size).toBe(0);
  });
});
