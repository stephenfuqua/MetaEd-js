import { MetaEdEnvironment, GeneratorResult, GeneratedOutput } from 'metaed-core';
import { NamespaceEdfiXsd } from '../model/Namespace';
import { SchemaContainer } from '../model/schema/SchemaContainer';
import {
  formatAndPrependHeader,
  registerPartials,
  template,
  formatVersionForSchema,
  hasDuplicateEntityNameInAtLeastOneDependencyNamespace,
} from './XsdGeneratorBase';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  registerPartials();

  const generatorName = 'edfiXsd.XsdGenerator';
  const generatedOutput: GeneratedOutput[] = [];

  // METAED-997
  if (hasDuplicateEntityNameInAtLeastOneDependencyNamespace(metaEd)) return { generatorName, generatedOutput };

  metaEd.namespace.forEach(namespace => {
    const schema: SchemaContainer = (namespace.data.edfiXsd as NamespaceEdfiXsd).xsdSchema;
    schema.schemaVersion = formatVersionForSchema(metaEd.dataStandardVersion);
    const formattedGeneratedResult = formatAndPrependHeader(template().schema(schema));
    generatedOutput.push({
      name: 'XSD',
      namespace: namespace.namespaceName,
      folderName: 'XSD',
      fileName: namespace.isExtension ? `${namespace.projectExtension}-Ed-Fi-Extended-Core.xsd` : 'Ed-Fi-Core.xsd',
      resultString: formattedGeneratedResult,
      resultStream: null,
    });
  });

  return {
    generatorName,
    generatedOutput,
  };
}
