import { MetaEdEnvironment, Namespace, EnhancerResult } from 'metaed-core';
import { Aggregate } from '../../model/domainMetadata/Aggregate';
import { NamespaceEdfiOdsApi } from '../../model/Namespace';

const enhancerName = 'BaseDescriptorAggregateEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('edfi');
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

  (coreNamespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates.push(aggregate);
  return {
    enhancerName,
    success: true,
  };
}
