// @flow
import type { MetaEdEnvironment, EnhancerResult, NamespaceInfo } from '../../../../packages/metaed-core/index';
import { newSchemaContainer } from './schema/SchemaContainer';

export type NamespaceInfoEdfiXsd = {
  xsd_Schema: string;
};

const enhancerName: string = 'NamespaceInfoSetupEnhancer';

export function addNamespaceInfoEdfiXsdTo(namespaceInfo: NamespaceInfo) {
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
