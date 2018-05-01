// @flow
import type { MetaEdEnvironment, GeneratorResult, GeneratedOutput } from 'metaed-core';
import { formatAndPrependHeader, template, formatVersionForSchema } from './XsdGeneratorBase';
import type { MergedInterchange } from '../model/MergedInterchange';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const outputName = 'Core XSD Interchanges';
  const generatorName = 'XSD Interchanges';
  const generatedOutput: Array<GeneratedOutput> = [];

  const orderedInterchange: Array<MergedInterchange> = Array.from(
    (metaEd.plugin.get('edfiXsd'): any).entity.mergedInterchange.values(),
  );

  orderedInterchange.filter((interchange: MergedInterchange) => !interchange.namespace.isExtension).forEach(interchange => {
    const templateData = {
      schemaVersion: formatVersionForSchema(metaEd.dataStandardVersion),
      interchange,
    };
    const formattedGeneratedResult = formatAndPrependHeader(template().interchange(templateData));
    generatedOutput.push({
      name: outputName,
      namespace: interchange.namespace.namespaceName,
      folderName: 'Interchange',
      fileName: interchange.namespace.isExtension
        ? `${interchange.namespace.projectExtension}-Interchange-${interchange.metaEdName}-Extension.xsd`
        : `Interchange-${interchange.metaEdName}.xsd`,
      resultString: formattedGeneratedResult,
      resultStream: null,
    });
  });
  orderedInterchange
    .filter((interchange: MergedInterchange) => interchange.namespace.isExtension)
    .forEach((interchange: MergedInterchange) => {
      const templateData = {
        schemaVersion: formatVersionForSchema(metaEd.dataStandardVersion),
        interchange,
      };
      const formattedGeneratedResult = formatAndPrependHeader(template().interchange(templateData));

      generatedOutput.push({
        name: outputName,
        namespace: interchange.namespace.namespaceName,
        folderName: 'Interchange',
        fileName: interchange.namespace.isExtension
          ? `${interchange.namespace.projectExtension}-Interchange-${interchange.metaEdName}-Extension.xsd`
          : `Interchange-${interchange.metaEdName}.xsd`,
        resultString: formattedGeneratedResult,
        resultStream: null,
      });
    });

  return {
    generatorName,
    generatedOutput,
  };
}
