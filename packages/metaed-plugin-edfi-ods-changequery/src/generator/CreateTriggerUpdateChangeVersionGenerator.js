// @flow
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeQueryIndicated } from '../enhancer/ChangeQueryIndicator';
import { changeQueryPath, template } from './ChangeQueryGeneratorBase';
import { createTriggerUpdateChangeVersionEntities } from '../enhancer/EnhancerHelper';
import type { CreateTriggerUpdateChangeVersion } from '../model/CreateTriggerUpdateChangeVersion';

const generatorName: string = 'edfiOdsChangeQuery.CreateTriggerUpdateChangeVersionGenerator';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  if (changeQueryIndicated(metaEd)) {
    metaEd.namespace.forEach(namespace => {
      const triggers: Array<CreateTriggerUpdateChangeVersion> = createTriggerUpdateChangeVersionEntities(metaEd, namespace);
      if (triggers.length > 0) {
        triggers.sort(
          // by schema then by table name
          (a: CreateTriggerUpdateChangeVersion, b: CreateTriggerUpdateChangeVersion) => {
            if (a.schema === b.schema) {
              if (a.tableName < b.tableName) return -1;
              return a.tableName > b.tableName ? 1 : 0;
            }
            return a.schema < b.schema ? -1 : 1;
          },
        );

        const generatedResult: string = template().createTriggerUpdateChangeVersion({ triggers });

        results.push({
          name: 'ODS Change Event: CreateTriggerUpdateChangeVersion',
          namespace: namespace.namespaceName,
          folderName: changeQueryPath,
          fileName: '0040-CreateTriggerUpdateChangeVersionGenerator.sql',
          resultString: generatedResult,
          resultStream: null,
        });
      }
    });
  }

  return {
    generatorName,
    generatedOutput: results,
  };
}
