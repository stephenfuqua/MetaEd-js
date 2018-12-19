import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { newSchemaContainer } from './database/SchemaContainer';
import { SchemaContainer } from './database/SchemaContainer';

export type NamespaceEdfiOds = {
  odsSchema: SchemaContainer;
};

const enhancerName = 'NamespaceSetupEnhancer';

export function addNamespaceEdfiOdsTo(namespace: Namespace) {
  if (namespace.data.edfiOds == null) namespace.data.edfiOds = {};

  Object.assign(namespace.data.edfiOds, {
    odsSchema: newSchemaContainer(),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    addNamespaceEdfiOdsTo(namespace);
  });

  return {
    enhancerName,
    success: true,
  };
}
