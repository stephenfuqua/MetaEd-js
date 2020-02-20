import { GeneratorResult, MetaEdEnvironment } from 'metaed-core';
import { performCreateChangesSchemaGeneration } from 'metaed-plugin-edfi-ods-changequery';
import { PLUGIN_NAME } from '../PluginHelper';
import { getTemplateFileContents, databaseSpecificFolderName } from './ChangeQueryGeneratorBase';

const generatorName = `${PLUGIN_NAME}.CreateChangesSchemaGenerator`;

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results = performCreateChangesSchemaGeneration(
    metaEd,
    getTemplateFileContents('0010-CreateChangesSchema.sql'),
    databaseSpecificFolderName,
  );
  return {
    generatorName,
    generatedOutput: results,
  };
}
