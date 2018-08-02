// @flow
import { newState } from '../../src/State';
import type { State } from '../../src/State';
import { newNamespace } from '../../src/model/Namespace';
import type { Namespace } from '../../src/model/Namespace';
import { initializeNamespaces } from '../../src/pipeline/InitializeNamespaces';

describe('when enhancing core namespace only', () => {
  const state: State = newState();
  const coreNamespace: Namespace = { ...newNamespace(), namespaceName: 'edfi', isExtension: false };

  beforeAll(() => {
    state.metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
    initializeNamespaces(state);
  });

  it('should have no dependencies for core', () => {
    expect(coreNamespace.dependencies).toHaveLength(0);
  });
});

describe('when enhancing core and extension namespace', () => {
  const state: State = newState();
  const coreNamespace: Namespace = { ...newNamespace(), namespaceName: 'edfi', isExtension: false };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', isExtension: true };

  beforeAll(() => {
    state.metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
    state.metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
    initializeNamespaces(state);
  });

  it('should have no dependencies for core', () => {
    expect(coreNamespace.dependencies).toHaveLength(0);
  });

  it('should have core dependencies for extension', () => {
    expect(extensionNamespace.dependencies).toHaveLength(1);
    expect(extensionNamespace.dependencies[0]).toBe(coreNamespace);
  });
});
