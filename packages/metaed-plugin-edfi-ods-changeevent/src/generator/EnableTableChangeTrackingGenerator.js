// @flow
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeEventIndicated } from '../enhancer/ChangeEventIndicator';
import { changeEventPath, template } from './ChangeEventGeneratorBase';
import { enableChangeTrackingEntities } from '../enhancer/EnhancerHelper';
import type { EnableChangeTracking } from '../model/EnableChangeTracking';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  if (changeEventIndicated(metaEd)) {
    metaEd.namespace.forEach(namespace => {
      const tables: Array<EnableChangeTracking> = enableChangeTrackingEntities(metaEd, namespace);
      if (tables.length > 0) {
        tables.sort(
          // by schema then by table name
          (a: EnableChangeTracking, b: EnableChangeTracking) => {
            if (a.schema === b.schema) {
              if (a.tableName < b.tableName) return -1;
              return a.tableName > b.tableName ? 1 : 0;
            }
            return a.schema < b.schema ? -1 : 1;
          },
        );

        const generatedResult: string = template().enableTableChangeTracking({ tables });

        results.push({
          name: 'ODS Change Event: EnableTableChangeTracking',
          namespace: namespace.namespaceName,
          folderName: changeEventPath,
          fileName: '0040-EnableTableChangeTracking.sql',
          resultString: generatedResult,
          resultStream: null,
        });
      }
    });
  }

  return {
    generatorName: 'edfiOdsChangeEvent.EnableTableChangeTrackingGenerator',
    generatedOutput: results,
  };
}
