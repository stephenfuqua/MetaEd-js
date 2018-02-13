// @flow
import { orderByProp, versionSatisfies } from 'metaed-core';
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment, NamespaceInfo } from 'metaed-core';
import { fileNameFor, structurePath, template } from './OdsGeneratorBase';
import { pluginEnvironment } from '../enhancer/EnhancerHelper';
import type { Table } from '../model/database/Table';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];
  const namespaces: Array<NamespaceInfo> = metaEd.entity.namespaceInfo;
  const prefix: string = versionSatisfies(metaEd.dataStandardVersion, '2.x') ? '0009' : '0040';

  namespaces.forEach(namespaceInfo => {
    const tables: Array<Table> = orderByProp('name')(
      [...pluginEnvironment(metaEd).entity.table.values()].filter(
        (table: Table) => table.includeLastModifiedDateAndIdColumn && table.schema === namespaceInfo.namespace,
      ),
    );

    if (tables.length > 0) {
      const generatedResult: string = template().idIndexes({ tables });

      results.push({
        name: 'ODS Id Indexes',
        namespace: namespaceInfo.namespace,
        folderName: namespaceInfo.namespace + structurePath,
        fileName: fileNameFor(prefix, namespaceInfo, 'IdColumnUniqueIndexes'),
        resultString: generatedResult,
        resultStream: null,
      });
    }
  });

  return {
    generatorName: 'edfiOds.IdIndexesGenerator',
    generatedOutput: results,
  };
}
