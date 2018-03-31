// @flow
import marked from 'marked';
import R from 'ramda';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';

const generatorName = 'Interchange Brief Markdown Generator';
const header =
  '<head><title>MetaEd Generated Interchange Brief</title><link rel="stylesheet" href="confluence-like.css"></head>';

// Handlebars instance scoped for this plugin
export const markdownHandlebars = handlebars.create();

function templateString(templateName: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', `${templateName}.hbs`)).toString();
}

export function templateNamed(templateName: string) {
  return markdownHandlebars.compile(templateString(templateName));
}

export const template = R.memoize(() => ({
  interchangeBrief: templateNamed('InterchangeBriefAsMarkdown'),
}));

export const registerPartials = R.once(() => {
  markdownHandlebars.registerPartial({
    interchangeBrief: templateString('InterchangeBriefAsMarkdown'),
  });
});

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  const generatedOutput: Array<GeneratedOutput> = [];

  registerPartials();
  ((Array.from(edFiXsdEntityRepository.mergedInterchange.values()): any): Array<MergedInterchange>).forEach(
    (interchange: MergedInterchange) => {
      const markdown: string = template().interchangeBrief(interchange);
      generatedOutput.push({
        name: 'Interchange Brief Html',
        namespace: 'Documentation',
        folderName: 'InterchangeBrief',
        fileName: `${interchange.metaEdName}-InterchangeBrief.html`,
        resultString: `${header}${marked(markdown)}`,
        resultStream: null,
      });
    },
  );

  generatedOutput.push({
    name: 'confluence-like.css',
    namespace: 'Documentation',
    folderName: 'InterchangeBrief',
    fileName: 'confluence-like.css',
    resultString: ((fs.readFileSync(path.resolve(__dirname, './confluence-like.css'), 'utf8'): any): string),
    resultStream: null,
  });

  return {
    generatorName,
    generatedOutput,
  };
}
