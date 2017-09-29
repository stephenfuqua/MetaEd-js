// @flow
import type { MetaEdEnvironment, EnhancerResult, NamespaceInfo } from '../../../../packages/metaed-core/index';
import type { SchemaContainer } from './schema/SchemaContainer';
import { newSchemaContainer } from './schema/SchemaContainer';

export type NamespaceInfoEdfiXsd = {
  xsd_Schema: SchemaContainer;
};

const enhancerName: string = 'NamespaceInfoSetupEnhancer';

export function addNamespaceInfoEdfiXsdTo(namespaceInfo: NamespaceInfo) {
  if (namespaceInfo.data.edfiXsd == null) namespaceInfo.data.edfiXsd = {};

  Object.assign(namespaceInfo.data.edfiXsd, {
    xsd_Schema: newSchemaContainer(),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
    addNamespaceInfoEdfiXsdTo(namespaceInfo);
  });

  return {
    enhancerName,
    success: true,
  };
}
