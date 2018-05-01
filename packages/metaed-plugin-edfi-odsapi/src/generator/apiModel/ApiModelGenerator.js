// @flow
import { versionSatisfies, V3OrGreater } from 'metaed-core';
import type { MetaEdEnvironment, Namespace, GeneratorResult, GeneratedOutput } from 'metaed-core';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';

function fileName(namespace: string, projectPrefix: string): string {
  const prefix: string = !projectPrefix ? '' : `-${projectPrefix}`;
  return `ApiModel${prefix}.json`;
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  if (versionSatisfies(metaEd.dataStandardVersion, V3OrGreater)) {
  metaEd.entity.namespace.forEach((namespace: Namespace) => {
    const structuredOutput = ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).domainModelDefinition;

      results.push({
        name: 'API Model',
        namespace: namespace.namespaceName,
        folderName: 'ApiMetadata',
        fileName: fileName(namespace.namespaceName, namespace.projectExtension),
        resultString: JSON.stringify(structuredOutput, null, 2),
        resultStream: null,
      });
    });
  }

  return {
    generatorName: 'edfiOdsApi.ApiModelGenerator',
    generatedOutput: results,
  };
}
