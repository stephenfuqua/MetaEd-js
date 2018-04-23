// @flow
import fs from 'fs';
import R from 'ramda';
import path from 'path';
import handlebars from 'handlebars';
import { V2Only, versionSatisfies } from 'metaed-core';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult, NamespaceInfo, InterchangeItem } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';

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

function generateFile(input: any, namespaceInfo: NamespaceInfo): GeneratedOutput {
  return {
    name: outputName,
    namespace: namespaceInfo.namespace,
    folderName: 'ApiMetadata',
    fileName: `InterchangeOrderMetadata${namespaceInfo.projectExtension ? `-${namespaceInfo.projectExtension}` : ''}.xml`,
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

  if (metaEd.entity.namespaceInfo.length > 0) {
    let coreInterchanges: Array<InterchangeMetadata> = [];

    metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
      const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;

      let interchanges: Array<InterchangeMetadata> = [];
      edFiXsdEntityRepository.mergedInterchange.forEach((interchange: MergedInterchange) => {
        if (interchange.namespaceInfo.namespace !== namespaceInfo.namespace) return;

        const elements: Array<ElementMetadata> = interchange.data.edfiOdsApi.apiOrderedElements.map(
          (element: InterchangeItem) => ({
            name: element.metaEdName,
          }),
        );

        interchanges.push({ name: interchange.metaEdName, order: interchange.data.edfiOdsApi.apiOrder, elements });
      });
      if (interchanges.length === 0) return;

      interchanges = R.sortBy(R.prop('order'))(interchanges);
      // Extension interchanges must also include their core interchanges
      if (!namespaceInfo.isExtension) {
        coreInterchanges = interchanges;
      } else {
        interchanges = R.union(coreInterchanges, interchanges);
      }

      results.push(generateFile({ interchanges }, namespaceInfo));
    });
  }

  return {
    generatorName,
    generatedOutput: results,
  };
}
