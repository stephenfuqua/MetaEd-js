import { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeQueryIndicated } from '../enhancer/ChangeQueryIndicator';
import { changeQueryPath, template } from './ChangeQueryGeneratorBase';
import { deleteTrackingTableEntities } from '../enhancer/EnhancerHelper';
import { DeleteTrackingTable } from '../model/DeleteTrackingTable';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  if (changeQueryIndicated(metaEd)) {
    metaEd.namespace.forEach(namespace => {
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
          name: 'ODS Change Event: CreateTrackedDeleteTables',
          namespace: namespace.namespaceName,
          folderName: changeQueryPath,
          fileName: `0050-CreateTrackedDeleteTables.sql`,
          resultString: generatedResult,
          resultStream: null,
        });
      }
    });
  }
  return {
    generatorName: 'edfiOdsChangeQuery.CreateTrackedDeleteTablesGenerator',
    generatedOutput: results,
  };
}
