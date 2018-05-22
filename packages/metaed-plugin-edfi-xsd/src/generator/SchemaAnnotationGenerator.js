// @flow
import type { MetaEdEnvironment, GeneratorResult, GeneratedOutput, Namespace } from 'metaed-core';
import { getAllEntitiesOfType, orderByProp } from 'metaed-core';
import { formatAndPrependHeader, template } from './XsdGeneratorBase';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  const descriptors: Array<{ name: string }> = orderByProp('name')(
    getAllEntitiesOfType(metaEd, 'descriptor').map(x => ({ name: x.data.edfiXsd.xsd_DescriptorName })),
  );
  const formattedGeneratedResult = formatAndPrependHeader(template().schemaAnnotation({ descriptors }));

  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  results.push({
    name: 'Core XSD Schema Annotation',
    namespace: coreNamespace ? coreNamespace.namespaceName : '',
    folderName: 'XSD',
    fileName: 'SchemaAnnotation.xsd',
    resultString: formattedGeneratedResult,
    resultStream: null,
  });

  return {
    generatorName: 'edfiXsd.SchemaAnnotationGenerator',
    generatedOutput: results,
  };
}
