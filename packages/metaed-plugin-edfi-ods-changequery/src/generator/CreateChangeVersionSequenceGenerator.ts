import fs from 'fs';
import path from 'path';
import { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { changeQueryIndicated } from '../enhancer/ChangeQueryIndicator';
import { changeQueryPath } from './ChangeQueryGeneratorBase';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: GeneratedOutput[] = [];

  if (changeQueryIndicated(metaEd)) {
    metaEd.namespace.forEach(namespace => {
      results.push({
        name: 'ODS Change Event: CreateChangeVersionSequence',
        namespace: namespace.namespaceName,
        folderName: changeQueryPath,
        fileName: '0020-CreateChangeVersionSequence.sql',
        resultString: fs.readFileSync(
          path.resolve(__dirname, './templates/0020-CreateChangeVersionSequence.sql'),
          'utf8',
        ) as string,
        resultStream: null,
      });
    });
  }
  return {
    generatorName: 'edfiOdsChangeQuery.CreateChangeVersionSequenceGenerator',
    generatedOutput: results,
  };
}
