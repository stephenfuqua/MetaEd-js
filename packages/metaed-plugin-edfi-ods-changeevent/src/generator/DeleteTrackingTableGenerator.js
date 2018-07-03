// @flow
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeEventIndicated } from '../enhancer/ChangeEventIndicator';
import { changeEventPath, template } from './ChangeEventGeneratorBase';
import { deleteTrackingTableEntities } from '../enhancer/EnhancerHelper';
import type { DeleteTrackingTable } from '../model/DeleteTrackingTable';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  metaEd.namespace.forEach(namespace => {
    if (!changeEventIndicated(metaEd, namespace)) return;
    const tables: Array<DeleteTrackingTable> = deleteTrackingTableEntities(metaEd, namespace);
    if (tables.length > 0) {
      tables.sort(
        // by schema then by table name
        (a: DeleteTrackingTable, b: DeleteTrackingTable) => {
          if (a.schema === b.schema) {
            if (a.tableName < b.tableName) return -1;
            return a.tableName > b.tableName ? 1 : 0;
          }
          return a.schema < b.schema ? -1 : 1;
        },
      );

      const generatedResult: string = template().deleteTrackingTable({ tables });

      results.push({
        name: 'ODS Delete Tracking Tables',
        namespace: namespace.namespaceName,
        folderName: changeEventPath,
        fileName: `0010-CreateTrackedDeleteTables.sql`,
        resultString: generatedResult,
        resultStream: null,
      });
    }
  });

  return {
    generatorName: 'edfiOdsChangeEvent.DeleteTrackingTableGenerator',
    generatedOutput: results,
  };
}
