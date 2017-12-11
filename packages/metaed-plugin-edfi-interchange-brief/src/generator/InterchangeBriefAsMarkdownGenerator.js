// @flow
import marked from 'marked';
import R from 'ramda';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';

const generatorName = 'Interchange Brief Markdown Generator';
const header = '<head><title>MetaEd Generated Interchange Brief</title><link rel="stylesheet" href="confluence-like.css"></head>';

// Handlebars instance scoped for this plugin
export const markdownHandlebars = handlebars.create();

function templateString(templateName: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', `${templateName}.hbs`)).toString();
}

export function templateNamed(templateName: string) {
  return markdownHandlebars.compile(templateString(templateName));
}

export const template = R.memoize(
  () =>
    ({
      interchangeBrief: templateNamed('InterchangeBriefAsMarkdown'),
    }),
  );

export const registerPartials = R.once(
  () => {
    markdownHandlebars.registerPartial({
      interchangeBrief: templateString('InterchangeBriefAsMarkdown'),
    });
  });

export function generate(metaEd: MetaEdEnvironment): GeneratorResult {
  console.log('started markdown generator');
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  const generatedOutput: Array<GeneratedOutput> = [];
  registerPartials();
  console.log('registered partials');
  ((Array.from(edFiXsdEntityRepository.mergedInterchange.values()): any): Array<MergedInterchange>).forEach((interchange: MergedInterchange) => {
    console.log('running handlebars markdown template');
    const markdown: string = template().interchangeBrief(interchange);
    console.log('pushing generated output loop');
    generatedOutput.push({
      name: 'Interchange Brief Html',
      fileName: `${interchange.metaEdName}-InterchangeBrief.html`,
      folderName: 'InterchangeBrief',
      resultString: `${header}${marked(markdown)}`,
      resultStream: null,
    });
  });
  console.log('pushing confluence generated output');
  generatedOutput.push({
    name: 'confluence-like.css',
    fileName: 'confluence-like.css',
    folderName: 'InterchangeBrief',
    resultString: ((fs.readFileSync(path.resolve(__dirname, './confluence-like.css'), 'utf8'): any): string),
    resultStream: null,
  });
  console.log('returning results of markdown generator');
  return {
    generatorName,
    generatedOutput,
  };
}
