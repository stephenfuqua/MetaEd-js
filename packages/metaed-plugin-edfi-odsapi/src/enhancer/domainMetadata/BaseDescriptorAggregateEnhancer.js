// @flow
import R from 'ramda';
import type { MetaEdEnvironment, Namespace, EnhancerResult } from 'metaed-core';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';

const enhancerName: string = 'BaseDescriptorAggregateEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: Namespace = R.head(Array.from(metaEd.entity.namespace.values()).filter(n => !n.isExtension));
  if (!coreNamespace) return { enhancerName, success: false };

  const aggregate: Aggregate = {
    root: 'Descriptor',
    schema: 'edfi',
    allowPrimaryKeyUpdates: false,
    isExtension: false,
    entityTables: [
      {
        table: 'Descriptor',
        isA: null,
        isAbstract: true,
        isRequiredCollection: false,
        schema: coreNamespace.namespaceName,
        hasIsA: false,
        requiresSchema: false,
      },
    ],
  };

  ((coreNamespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.push(aggregate);
  return {
    enhancerName,
    success: true,
  };
}
