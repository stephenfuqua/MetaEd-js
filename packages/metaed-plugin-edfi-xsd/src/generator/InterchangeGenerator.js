// @flow
import type { MetaEdEnvironment, GeneratorResult, GeneratedOutput, Interchange } from 'metaed-core';
import { formatAndPrependHeader, template, formatVersionForSchema } from './XsdGeneratorBase';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const outputName = 'Core XSD Interchanges';
  const generatorName = 'XSD Interchanges';
  const generatedOutput: Array<GeneratedOutput> = [];

  const orderedInterchange: Array<Interchange> = Array.from(
    (metaEd.plugin.get('edfiXsd'): any).entity.mergedInterchange.values(),
  );

  orderedInterchange.filter(i => !i.namespaceInfo.isExtension).forEach(interchange => {
    const templateData = {
      schemaVersion: formatVersionForSchema(metaEd.dataStandardVersion),
      interchange,
    };
    const formattedGeneratedResult = formatAndPrependHeader(template().interchange(templateData));

    generatedOutput.push({
      name: outputName,
      folderName: 'Interchange',
      fileName: interchange.namespaceInfo.isExtension
        ? `${interchange.namespaceInfo.projectExtension}-Interchange-${interchange.metaEdName}-Extension.xsd`
        : `Interchange-${interchange.metaEdName}.xsd`,
      resultString: formattedGeneratedResult,
      resultStream: null,
    });
  });
  orderedInterchange.filter(i => i.namespaceInfo.isExtension).forEach(interchange => {
    const templateData = {
      schemaVersion: formatVersionForSchema(metaEd.dataStandardVersion),
      interchange,
    };
    const formattedGeneratedResult = formatAndPrependHeader(template().interchange(templateData));

    generatedOutput.push({
      name: outputName,
      folderName: 'Interchange',
      fileName: interchange.namespaceInfo.isExtension
        ? `${interchange.namespaceInfo.projectExtension}-Interchange-${interchange.metaEdName}-Extension.xsd`
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
