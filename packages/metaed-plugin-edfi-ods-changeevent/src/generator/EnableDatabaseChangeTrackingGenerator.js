// @flow
import fs from 'fs';
import path from 'path';
import type { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeEventIndicated } from '../enhancer/ChangeEventIndicator';
import { changeEventPath } from './ChangeEventGeneratorBase';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  if (changeEventIndicated(metaEd)) {
    metaEd.namespace.forEach(namespace => {
      results.push({
        name: 'ODS Change Event: EnableDatabaseChangeTracking',
        namespace: namespace.namespaceName,
        folderName: changeEventPath,
        fileName: '0010-EnableDatabaseChangeTracking.sql',
        resultString: ((fs.readFileSync(
          path.resolve(__dirname, './templates/0010-EnableDatabaseChangeTracking.sql'),
          'utf8',
        ): any): string),
        resultStream: null,
      });
    });
  }
  return {
    generatorName: 'edfiOdsChangeEvent.EnableDatabaseChangeTrackingGenerator',
    generatedOutput: results,
  };
}
