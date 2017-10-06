// @flow
import type { MetaEdEnvironment, NamespaceInfo, GeneratorResult, GeneratedOutput } from '../../../metaed-core/index';
import type { NamespaceInfoEdfiXsd } from '../model/NamespaceInfo';
import type { SchemaContainer } from '../model/schema/SchemaContainer';
import { formatAndPrependHeader, registerPartials, template, formatVersionForSchema } from './XsdGeneratorBase';

export function generate(metaEd: MetaEdEnvironment): GeneratorResult {
  registerPartials();

  const results: Array<GeneratedOutput> = [];
  const namespaces: Array<NamespaceInfo> = metaEd.entity.namespaceInfo;

  namespaces.forEach(namespaceInfo => {
    const schema: SchemaContainer = ((namespaceInfo.data.edfiXsd: any): NamespaceInfoEdfiXsd).xsd_Schema;
    schema.schemaVersion = formatVersionForSchema(metaEd.dataStandardVersion);
    const formattedGeneratedResult = formatAndPrependHeader(template().schema(schema));
    results.push({
      name: 'XSD',
      folderName: 'XSD',
      fileName: namespaceInfo.isExtension ? `${namespaceInfo.projectExtension}-Ed-Fi-Extended-Core.xsd` : 'Ed-Fi-Core.xsd',
      resultString: formattedGeneratedResult,
    });
  });

  return {
    generatorName: 'XsdGenerator',
    generatedOutput: results,
  };
}
