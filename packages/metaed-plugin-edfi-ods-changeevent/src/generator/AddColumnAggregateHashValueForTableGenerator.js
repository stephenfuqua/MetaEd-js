// @flow
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { twoDotXIndicated } from '../enhancer/ChangeEventIndicator';
import { changeEventPath, template } from './ChangeEventGeneratorBase';
import { addColumnAggregateHashValueForTableEntities } from '../enhancer/EnhancerHelper';
import type { AddColumnAggregateHashValueForTable } from '../model/AddColumnAggregateHashValueForTable';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  metaEd.namespace.forEach(namespace => {
    if (!twoDotXIndicated(metaEd, namespace)) return;
    const tables: Array<AddColumnAggregateHashValueForTable> = addColumnAggregateHashValueForTableEntities(
      metaEd,
      namespace,
    );
    if (tables.length > 0) {
      tables.sort(
        // by schema then by table name
        (a: AddColumnAggregateHashValueForTable, b: AddColumnAggregateHashValueForTable) => {
          if (a.schema === b.schema) {
            if (a.tableName < b.tableName) return -1;
            return a.tableName > b.tableName ? 1 : 0;
          }
          return a.schema < b.schema ? -1 : 1;
        },
      );

      const generatedResult: string = template().addColumnAggregateHashValue({ tables });

      results.push({
        name: 'ODS Change Event: AddColumnAggregateHashValueForTable',
        namespace: namespace.namespaceName,
        folderName: changeEventPath,
        fileName: '0050-AddColumnAggregateHashValueForTables.sql',
        resultString: generatedResult,
        resultStream: null,
      });
    }
  });

  return {
    generatorName: 'edfiOdsChangeEvent.AddColumnAggregateHashValueForTableGenerator',
    generatedOutput: results,
  };
}
