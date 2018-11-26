// @flow
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

import type { MetaEdEnvironment, GeneratorResult, GeneratedOutput, ModelBase } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

// Handlebars instance scoped for this plugin
export const domainEntityNameHandlebars = handlebars.create();

// Read the Handlebars template file
function templateString(templateName: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', `${templateName}.hbs`)).toString();
}

// Compile the Handlebars template file
export function templateNamed(templateName: string) {
  return domainEntityNameHandlebars.compile(templateString(templateName));
}

// standard generator function signature
export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  // Get all Domain Entities in all namespaces, as ModelBase type so there is no need to cast
  const domainEntities: Array<ModelBase> = getAllEntitiesOfType(metaEd, 'domainEntity');

  // Feed Domain Entities to DomainEntityNames.hbs template
  const resultString: string = templateNamed('DomainEntityNames')({ domainEntities });

  // Provide result with file metadata
  // Often MetaEd generates one file per namespace, but here we are putting information from all namespaces in one file
  // It will be named domainEntityNames.txt and placed in the Documentation/Names folder
  results.push({
    name: 'domainEntityNames.txt',
    namespace: 'Documentation',
    folderName: 'Names',
    fileName: 'domainEntityNames.txt',
    resultString,
    resultStream: null,
  });

  return {
    generatorName: 'DomainEntityNameGenerator',
    generatedOutput: results,
  };
}
