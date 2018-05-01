// @flow
import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { DomainModelDefinition } from './apiModel/DomainModelDefinition';
import { newDomainModelDefinition } from './apiModel/DomainModelDefinition';
import type { Aggregate } from './domainMetadata/Aggregate';
import type { EducationOrganizationReference } from './educationOrganizationReferenceMetadata/EducationOrganizationReference';

export type NamespaceEdfiOdsApi = {
  domainModelDefinition: DomainModelDefinition,
  aggregates: Array<Aggregate>,
  api_EducationOrganizationReferences: Array<EducationOrganizationReference>,
};

const enhancerName: string = 'NamespaceSetupEnhancer';

export function addNamespaceEdfiOdsApiTo(namespace: Namespace) {
  if (namespace.data.edfiOdsApi == null) namespace.data.edfiOdsApi = {};

  Object.assign(namespace.data.edfiOdsApi, {
    domainModelDefinition: newDomainModelDefinition(),
    aggregates: [],
    api_EducationOrganizationReferences: [],
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.namespace.forEach((namespace: Namespace) => {
    addNamespaceEdfiOdsApiTo(namespace);
  });

  return {
    enhancerName,
    success: true,
  };
}
