// @flow
import R from 'ramda';
import { String as sugar } from 'sugar';
import type { MetaEdEnvironment, NamespaceInfo, GeneratorResult, GeneratedOutput } from 'metaed-core';
import type { NamespaceInfoEdfiOdsApi } from '../../model/NamespaceInfo';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import { registerPartials, template } from './DomainMetadataGeneratorBase';

function fileName(namespace: string, projectPrefix: string): string {
  const prefix: string = !projectPrefix ? '' : `-${projectPrefix}`;
  return `DomainMetadata${prefix}.xml`;
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  registerPartials();

  const results: Array<GeneratedOutput> = [];
  const namespaces: Array<NamespaceInfo> = metaEd.entity.namespaceInfo;

  namespaces.forEach((namespaceInfo: NamespaceInfo) => {
    const logicalName = namespaceInfo.isExtension ? sugar.titleize(namespaceInfo.namespace) : 'Ed-Fi';
    const schema = {
      logicalName,
      name: namespaceInfo.namespace,
    };
    const aggregates = ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdfiOdsApi).aggregates.filter(
      (a: Aggregate) => !a.isExtension,
    );
    let formattedGeneratedResult = '';

    if (namespaceInfo.isExtension) {
      const aggregateExtensions = ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdfiOdsApi).aggregates.filter(
        (a: Aggregate) => a.isExtension,
      );
      if (aggregates.length === 0 && aggregateExtensions.length === 0) return;

      const extensionInput = {
        schema,
        aggregates: R.sortBy(R.prop('root'), aggregates),
        aggregateExtensions: R.sortBy(R.prop('root'), aggregateExtensions),
      };
      formattedGeneratedResult = template().domainMetadataExtension(extensionInput);
    } else {
      const coreInput = {
        schema,
        aggregates: R.sortBy(R.prop('root'), aggregates),
      };
      formattedGeneratedResult = template().domainMetadata(coreInput);
    }

    results.push({
      name: 'Domain Metadata',
      namespace: namespaceInfo.namespace,
      folderName: 'ApiMetadata',
      fileName: fileName(namespaceInfo.namespace, namespaceInfo.projectExtension),
      resultString: formattedGeneratedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOdsApi.DomainMetadataGenerator',
    generatedOutput: results,
  };
}
