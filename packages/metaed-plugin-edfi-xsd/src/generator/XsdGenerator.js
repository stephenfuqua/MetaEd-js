// @flow
import Handlebars from 'handlebars';
import ffs from 'final-fs';
import type { MetaEdEnvironment, NamespaceInfo, GeneratorResult, GeneratedOutput } from '../../../metaed-core/index';
import type { NamespaceInfoEdfiXsd } from '../model/NamespaceInfo';
import type { SchemaContainer } from '../model/schema/SchemaContainer';
import { formatAndPrependHeader } from './XsdGeneratorBase';

const templateForSchema = Handlebars.compile(ffs.readFileSync('./templates/Schema.hbs', 'utf-8'));

export function generate(metaEd: MetaEdEnvironment): GeneratorResult {
  const results: Array<GeneratedOutput> = [];
  const namespaces: Array<NamespaceInfo> = metaEd.entity.namespaceInfo;

  namespaces.forEach(namespaceInfo => {
    const schema: SchemaContainer = ((namespaceInfo.data.edfiXsd: any): NamespaceInfoEdfiXsd).xsd_Schema;
    schema.schemaVersion = '9876543210';  // was _metaEdContext.Version.FormatForSchema() in C#
    const formattedGeneratedResult = formatAndPrependHeader(templateForSchema(schema));
    results.push({
      name: 'XSD',
      folderName: 'XSD',
      fileName: namespaceInfo.isExtension ? 'Ed-Fi-Core.xsd' : `${namespaceInfo.projectExtension}-Ed-Fi-Extended-Core.xsd`,
      resultString: formattedGeneratedResult,
    });
  });

  return {
    generatorName: 'XsdGenerator',
    generatedOutput: results,
  };
}
