// @flow
import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { SchemaContainer } from './schema/SchemaContainer';
import { newSchemaContainer } from './schema/SchemaContainer';

export type NamespaceEdfiXsd = {
  xsd_Schema: SchemaContainer,
};

const enhancerName: string = 'NamespaceSetupEnhancer';

export function addNamespaceEdfiXsdTo(namespace: Namespace) {
  if (namespace.data.edfiXsd == null) namespace.data.edfiXsd = {};

  Object.assign(namespace.data.edfiXsd, {
    xsd_Schema: newSchemaContainer(),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    addNamespaceEdfiXsdTo(namespace);
  });

  return {
    enhancerName,
    success: true,
  };
}
