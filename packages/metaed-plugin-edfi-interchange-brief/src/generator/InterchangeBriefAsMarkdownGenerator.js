// @flow
import marked from 'marked';
import R from 'ramda';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult } from 'metaed-core';
import type { EdFiXsdEntityRepository } from 'metaed-plugin-edfi-xsd';
import type { MergedInterchange } from '../model/MergedInterchange';
import { toHumanizedUppercaseMetaEdName } from '../model/MergedInterchange';

const generatorName = 'Interchange Brief Markdown Generator';
const header = '<head><title>MetaEd Generated Interchange Brief</title><link rel="stylesheet" href="confluence-like.css"></head>';

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

export function generate(metaEd: MetaEdEnvironment): GeneratorResult {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  const generatedOutput: Array<GeneratedOutput> = [];
  registerPartials();

  ((Array.from(edFiXsdEntityRepository.mergedInterchange.values()): any): Array<MergedInterchange>).forEach((interchange: MergedInterchange) => {
    interchange.humanizedUppercaseMetaEdName = toHumanizedUppercaseMetaEdName(interchange.metaEdName);
    const html: string = template().interchangeBrief(interchange);
    generatedOutput.push({
      name: 'MD',
      fileName: `${interchange.metaEdName}-InterchangeBrief.html`,
      folderName: 'InterchangeBrief',
      resultString: `${header}${marked(html)}`,
      resultStream: null,
    });
  });
  generatedOutput.push({
    name: 'MD',
    fileName: 'confluence-like.css',
    folderName: 'InterchangeBrief',
    resultString: ((fs.readFileSync(path.resolve(__dirname, './confluence-like.css'), 'utf8'): any): string),
    resultStream: null,
  });
  return {
    generatorName,
    generatedOutput,
  };
}
