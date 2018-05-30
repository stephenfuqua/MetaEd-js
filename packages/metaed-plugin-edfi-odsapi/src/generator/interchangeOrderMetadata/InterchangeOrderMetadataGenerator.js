// @flow
import fs from 'fs';
import R from 'ramda';
import path from 'path';
import handlebars from 'handlebars';
import { V3OrGreater, versionSatisfies } from 'metaed-core';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult, InterchangeItem, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';

const generatorName: string = 'edfiOdsApi.InterchangeOrderMetadataGenerator';
const targetVersions: string = V3OrGreater;
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
};

type InterchangeMetadata = {
  name: string,
  elements: Array<ElementMetadata>,
};

function getInterchangeMetadataFor(interchange: MergedInterchange): InterchangeMetadata {
  const elements: Array<ElementMetadata> = interchange.orderedElements.map((element: InterchangeItem) => ({
    name: element.metaEdName,
  }));

  return { name: interchange.metaEdName, elements };
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { generatorName, generatedOutput: [] };

  const results: Array<GeneratedOutput> = [];

  if (metaEd.namespace.size > 0) {
    const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
    if (coreNamespace == null) return { generatorName, generatedOutput: [] };

    const coreEdfiXsdEntityRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, coreNamespace);
    if (coreEdfiXsdEntityRepository == null) return { generatorName, generatedOutput: [] };

    const coreInterchangeMetadata: Array<InterchangeMetadata> = [];
    coreEdfiXsdEntityRepository.mergedInterchange.forEach((interchange: MergedInterchange) => {
      if (interchange.namespace.namespaceName !== 'edfi') return;

      coreInterchangeMetadata.push(getInterchangeMetadataFor(interchange));
    });

    metaEd.namespace.forEach((namespace: Namespace) => {
      const edfiXsdEntityRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
      if (edfiXsdEntityRepository == null) return;

      const interchangeMetadata: Array<InterchangeMetadata> = [];
      edfiXsdEntityRepository.mergedInterchange.forEach((interchange: MergedInterchange) => {
        if (interchange.namespace.namespaceName !== namespace.namespaceName) return;

        interchangeMetadata.push(getInterchangeMetadataFor(interchange));
      });

      if (interchangeMetadata.length === 0) return;

      if (namespace.isExtension && coreInterchangeMetadata != null) {
        coreInterchangeMetadata.forEach((coreInterchange: InterchangeMetadata) => {
          if (interchangeMetadata.every(interchange => interchange.name !== coreInterchange.name))
            interchangeMetadata.push(coreInterchange);
        });
      }

      const interchanges = R.sortBy(R.prop('name'))(interchangeMetadata);

      results.push(generateFile({ interchanges }, namespace));
    });
  }

  return {
    generatorName,
    generatedOutput: results,
  };
}
