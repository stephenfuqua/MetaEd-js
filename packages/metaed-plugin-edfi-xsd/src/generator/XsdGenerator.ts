import { MetaEdEnvironment, GeneratorResult, GeneratedOutput } from 'metaed-core';
import { NamespaceEdfiXsd } from '../model/Namespace';
import { SchemaContainer } from '../model/schema/SchemaContainer';
import { formatAndPrependHeader, registerPartials, template, formatVersionForSchema } from './XsdGeneratorBase';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  registerPartials();

  const results: GeneratedOutput[] = [];

  metaEd.namespace.forEach(namespace => {
    const schema: SchemaContainer = (namespace.data.edfiXsd as NamespaceEdfiXsd).xsdSchema;
    schema.schemaVersion = formatVersionForSchema(metaEd.dataStandardVersion);
    const formattedGeneratedResult = formatAndPrependHeader(template().schema(schema));
    results.push({
      name: 'XSD',
      namespace: namespace.namespaceName,
      folderName: 'XSD',
      fileName: namespace.isExtension ? `${namespace.projectExtension}-Ed-Fi-Extended-Core.xsd` : 'Ed-Fi-Core.xsd',
      resultString: formattedGeneratedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiXsd.XsdGenerator',
    generatedOutput: results,
  };
}
