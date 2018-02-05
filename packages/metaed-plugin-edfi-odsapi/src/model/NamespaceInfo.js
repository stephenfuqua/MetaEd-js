// @flow
import type { MetaEdEnvironment, EnhancerResult, NamespaceInfo } from 'metaed-core';
import type { DomainModelDefinition } from './apiModel/DomainModelDefinition';
import { newDomainModelDefinition } from './apiModel/DomainModelDefinition';
import type { Aggregate } from './domainMetadata/Aggregate';

export type NamespaceInfoEdfiOdsApi = {
  domainModelDefinition: DomainModelDefinition,
  aggregates: Array<Aggregate>,
};

const enhancerName: string = 'NamespaceInfoSetupEnhancer';

export function addNamespaceInfoEdfiOdsApiTo(namespaceInfo: NamespaceInfo) {
  if (namespaceInfo.data.edfiOdsApi == null) namespaceInfo.data.edfiOdsApi = {};

  Object.assign(namespaceInfo.data.edfiOdsApi, {
    domainModelDefinition: newDomainModelDefinition(),
    aggregates: [],
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
    addNamespaceInfoEdfiOdsApiTo(namespaceInfo);
  });

  return {
    enhancerName,
    success: true,
  };
}
