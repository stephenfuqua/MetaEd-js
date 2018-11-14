// @flow
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeQueryIndicated } from '../enhancer/ChangeQueryIndicator';
import { changeQueryPath, template } from './ChangeQueryGeneratorBase';
import { deleteTrackingTriggerEntities } from '../enhancer/EnhancerHelper';
import type { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  if (changeQueryIndicated(metaEd)) {
    metaEd.namespace.forEach(namespace => {
      const triggers: Array<DeleteTrackingTrigger> = deleteTrackingTriggerEntities(metaEd, namespace);
      if (triggers.length > 0) {
        triggers.sort(
          // by schema then by trigger name
          (a: DeleteTrackingTrigger, b: DeleteTrackingTrigger) => {
            if (a.triggerSchema === b.triggerSchema) {
              if (a.triggerName < b.triggerName) return -1;
              return a.triggerName > b.triggerName ? 1 : 0;
            }
            return a.triggerSchema < b.triggerSchema ? -1 : 1;
          },
        );

        const generatedResult: string = template().deleteTrackingTrigger({ triggers });

        results.push({
          name: 'ODS Change Event: CreateDeletedForTrackingTriggers',
          namespace: namespace.namespaceName,
          folderName: changeQueryPath,
          fileName: '0060-CreateDeletedForTrackingTriggers.sql',
          resultString: generatedResult,
          resultStream: null,
        });
      }
    });
  }
  return {
    generatorName: 'edfiOdsChangeQuery.CreateDeletedForTrackingTriggersGenerator',
    generatedOutput: results,
  };
}
