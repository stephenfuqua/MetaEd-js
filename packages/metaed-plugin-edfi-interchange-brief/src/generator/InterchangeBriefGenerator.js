// @flow
import R from 'ramda';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult } from 'metaed-core';
import type { EdFiXsdEntityRepository } from 'metaed-plugin-edfi-xsd';

// Handlebars instance scoped for this plugin
export const xsdHandlebars = handlebars.create();

function templateString(templateName: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', `${templateName}.hbs`)).toString();
}

export function templateNamed(templateName: string) {
  return xsdHandlebars.compile(templateString(templateName));
}

export const template = R.memoize(
  () =>
    ({
      interchangeBrief: templateNamed('InterchangeBriefAsMarkdown'),
    }),
  );

export const registerPartials = R.once(
  () => {
    xsdHandlebars.registerPartial({
      interchangeBrief: templateString('InterchangeBriefAsMarkdown'),
    });
  });

const generatorName: string = 'InterchangeBriefGenerator';

export function generate(metaEd: MetaEdEnvironment): GeneratorResult {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  const generatedOutput: Array<GeneratedOutput> = [];
  registerPartials();
  Array.from(edFiXsdEntityRepository.mergedInterchange.values()).forEach((interchange) => {
    generatedOutput.push({
      name: 'MD',
      fileName: `${interchange.metaEdName}-InterchangeBrief.md`,
      folderName: 'InterchangeBrief',
      resultString: template().interchangeBrief(interchange),
      resultStream: null,
    });
  });
  return {
    generatorName,
    generatedOutput,
  };
}
