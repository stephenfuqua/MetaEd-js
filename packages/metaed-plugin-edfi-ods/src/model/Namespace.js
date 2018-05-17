// @flow
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { newSchemaContainer } from './database/SchemaContainer';
import type { SchemaContainer } from './database/SchemaContainer';

export type NamespaceEdfiOds = {
  ods_Schema: SchemaContainer,
};

const enhancerName: string = 'NamespaceSetupEnhancer';

export function addNamespaceEdfiOdsTo(namespace: Namespace) {
  if (namespace.data.edfiOds == null) namespace.data.edfiOds = {};

  Object.assign(namespace.data.edfiOds, {
    ods_Schema: newSchemaContainer(),
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
