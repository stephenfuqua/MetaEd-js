// @flow
import { versionSatisfies } from 'metaed-core';
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment, NamespaceInfo } from 'metaed-core';
import { fileNameFor, structurePath, template } from './OdsGeneratorBase';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];
  const namespaces: Array<NamespaceInfo> = metaEd.entity.namespaceInfo;
  const prefix: string = versionSatisfies(metaEd.dataStandardVersion, '2.x') ? '0001' : '0010';

  namespaces.forEach(namespaceInfo => {
    const schemaName: string = namespaceInfo.namespace;
    const generatedResult: string = namespaceInfo.isExtension
      ? template().extensionSchema({ schemaName })
      : template().coreSchema({ schemaName });

    results.push({
      name: 'ODS Schema',
      namespace: namespaceInfo.namespace,
      folderName: namespaceInfo.namespace + structurePath,
      fileName: fileNameFor(prefix, namespaceInfo, 'Schemas'),
      resultString: generatedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOds.SchemaGenerator',
    generatedOutput: results,
  };
}
