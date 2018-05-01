// @flow
import R from 'ramda';
import type { MetaEdEnvironment, Namespace, GeneratorResult, GeneratedOutput } from 'metaed-core';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import { registerPartials, template } from './DomainMetadataGeneratorBase';
import { logicalNameFor } from '../../model/apiModel/SchemaDefinition';
import type { SchemaDefinition } from '../../model/apiModel/SchemaDefinition';

function fileName(namespace: string, projectPrefix: string): string {
  const prefix: string = !projectPrefix ? '' : `-${projectPrefix}`;
  return `DomainMetadata${prefix}.xml`;
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  registerPartials();

  const results: Array<GeneratedOutput> = [];

  metaEd.entity.namespace.forEach((namespace: Namespace) => {
    const schema: SchemaDefinition = {
      logicalName: logicalNameFor(namespace.namespaceName),
      physicalName: namespace.namespaceName,
    };
    const aggregates = ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.filter(
      (a: Aggregate) => !a.isExtension,
    );
    let formattedGeneratedResult = '';

    if (namespace.isExtension) {
      const aggregateExtensions = ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.filter(
        (a: Aggregate) => a.isExtension,
      );
      if (aggregates.length === 0 && aggregateExtensions.length === 0) return;

      const extensionInput = {
        schema,
        aggregates: R.sortBy(R.prop('root'), aggregates),
        aggregateExtensions: R.sortBy(R.prop('root'), aggregateExtensions),
      };
      formattedGeneratedResult = template().domainMetadataExtension(extensionInput);
    } else {
      const coreInput = {
        schema,
        aggregates: R.sortBy(R.prop('root'), aggregates),
      };
      formattedGeneratedResult = template().domainMetadata(coreInput);
    }

    results.push({
      name: 'Domain Metadata',
      namespace: namespace.namespaceName,
      folderName: 'ApiMetadata',
      fileName: fileName(namespace.namespaceName, namespace.projectExtension),
      resultString: formattedGeneratedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOdsApi.DomainMetadataGenerator',
    generatedOutput: results,
  };
}
