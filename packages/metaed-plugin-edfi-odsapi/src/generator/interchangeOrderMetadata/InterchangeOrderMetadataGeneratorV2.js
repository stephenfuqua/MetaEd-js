// @flow
import fs from 'fs';
import R from 'ramda';
import path from 'path';
import handlebars from 'handlebars';
import { V2Only, versionSatisfies } from 'metaed-core';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';

const generatorName: string = 'edfiOdsApi.InterchangeOrderMetadataGenerator';
const targetVersions: string = V2Only;
const outputName: string = 'Interchange Order Metadata';

export const interchangeOrderMetadataHandlebars = handlebars.create();

function templateString(templateName: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', `${templateName}.hbs`)).toString();
}

export function templateNamed(templateName: string) {
  return interchangeOrderMetadataHandlebars.compile(templateString(templateName));
}

export const template = R.memoize(() => templateNamed('InterchangeOrderMetadata'))();

function generateFile(input: any, namespace: Namespace): GeneratedOutput {
  return {
    name: outputName,
    namespace: namespace.namespaceName,
    folderName: 'ApiMetadata',
    fileName: `InterchangeOrderMetadata${namespace.projectExtension ? `-${namespace.projectExtension}` : ''}.xml`,
    resultString: template(input),
    resultStream: null,
  };
}

type ElementMetadata = {
  name: string,
  order: number,
};

type InterchangeMetadata = {
  name: string,
  order: number,
  elements: Array<ElementMetadata>,
};

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions))
    return {
      generatorName,
      generatedOutput: [],
    };
  const results: Array<GeneratedOutput> = [];

  if (metaEd.namespace.size > 0) {
    let coreInterchanges: Array<InterchangeMetadata> = [];

    metaEd.namespace.forEach((namespace: Namespace) => {
      const edfiXsdEntityRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
      if (edfiXsdEntityRepository == null) return;

      let interchanges: Array<InterchangeMetadata> = [];
      edfiXsdEntityRepository.mergedInterchange.forEach((interchange: MergedInterchange) => {
        if (interchange.namespace.namespaceName !== namespace.namespaceName) return;

        const elements: Array<ElementMetadata> = interchange.data.edfiOdsApi.apiOrderedElements.map(
          (element: { name: string, globalDependencyOrder: number }) => ({
            name: element.name,
          }),
        );

        interchanges.push({ name: interchange.metaEdName, order: interchange.data.edfiOdsApi.apiOrder, elements });
      });
      if (interchanges.length === 0) return;

      interchanges = R.sortBy(R.prop('order'))(interchanges);
      // Extension interchanges must also include their core interchanges
      if (!namespace.isExtension) {
        coreInterchanges = interchanges;
      } else {
        interchanges = R.union(coreInterchanges, interchanges);
      }

      results.push(generateFile({ interchanges }, namespace));
    });
  }

  return {
    generatorName,
    generatedOutput: results,
  };
}
