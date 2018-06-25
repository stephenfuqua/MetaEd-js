// @flow
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeEventIndicated } from '../enhancer/ChangeEventIndicator';
import { changeEventPath, template } from './ChangeEventGeneratorBase';
import { deleteTrackingTriggerEntities } from '../enhancer/EnhancerHelper';
import type { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  metaEd.namespace.forEach(namespace => {
    if (!changeEventIndicated(metaEd, namespace)) return;
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
        name: 'ODS Delete Tracking Triggers',
        namespace: namespace.namespaceName,
        folderName: changeEventPath,
        fileName: `${namespace.namespaceName}-DeleteTrackingTrigger.sql`,
        resultString: generatedResult,
        resultStream: null,
      });
    }
  });

  return {
    generatorName: 'edfiOdsChangeEvent.DeleteTrackingTriggerGenerator',
    generatedOutput: results,
  };
}
