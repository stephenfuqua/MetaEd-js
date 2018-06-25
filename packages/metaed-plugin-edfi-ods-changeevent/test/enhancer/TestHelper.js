// @flow
import type { SemVer, MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';

export function metaEdEnvironmentForApiVersion(targetTechnologyVersion: SemVer): MetaEdEnvironment {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.plugin.set('edfiOds', { namespace: new Map(), targetTechnologyVersion });
  return metaEd;
}

export function newCoreNamespace(): Namespace {
  return {
    ...newNamespace(),
    namespaceName: 'edfi',
    isExtension: false,
    data: {
      edfiOds: {
        deleteTrackingTable: [],
        deleteTrackingTrigger: [],
        enableChangeTracking: [],
      },
    },
  };
}

export function newExtensionNamespace(namespaceName: string): Namespace {
  return {
    ...newNamespace(),
    namespaceName,
    isExtension: true,
    data: {
      edfiOds: {
        deleteTrackingTable: [],
        deleteTrackingTrigger: [],
        enableChangeTracking: [],
      },
    },
  };
}
