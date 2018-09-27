// @flow
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { twoDotXIndicated } from '../enhancer/ChangeEventIndicator';
import { changeEventPath, template } from './ChangeEventGeneratorBase';
import { addColumnChangeVersionForTableEntities } from '../enhancer/EnhancerHelper';
import type { AddColumnChangeVersionForTable } from '../model/AddColumnChangeVersionForTable';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  metaEd.namespace.forEach(namespace => {
    if (!twoDotXIndicated(metaEd, namespace)) return;
    const tables: Array<AddColumnChangeVersionForTable> = addColumnChangeVersionForTableEntities(metaEd, namespace);
    if (tables.length > 0) {
      tables.sort(
        // by schema then by table name
        (a: AddColumnChangeVersionForTable, b: AddColumnChangeVersionForTable) => {
          if (a.schema === b.schema) {
            if (a.tableName < b.tableName) return -1;
            return a.tableName > b.tableName ? 1 : 0;
          }
          return a.schema < b.schema ? -1 : 1;
        },
      );

      const generatedResult: string = template().addColumnChangeVersion({ tables });

      results.push({
        name: 'ODS Change Event: AddColumnChangeVersionForTable',
        namespace: namespace.namespaceName,
        folderName: changeEventPath,
        fileName: '0050-AddColumnChangeVersionForTables.sql',
        resultString: generatedResult,
        resultStream: null,
      });
    }
  });

  return {
    generatorName: 'edfiOdsChangeEvent.AddColumnChangeVersionForTableGenerator',
    generatedOutput: results,
  };
}
