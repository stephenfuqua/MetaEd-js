// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, Namespace, PluginEnvironment } from 'metaed-core';
import type { EdFiOdsEntityRepository } from 'metaed-plugin-edfi-ods';
import { buildEntityDefinitions } from './BuildEntityDefinitions';
import { buildAssociationDefinitions } from './BuildAssociationDefinitions';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';
import type { AggregateDefinition } from '../../model/apiModel/AggregateDefinition';
import type { AggregateExtensionDefinition } from '../../model/apiModel/AggregateExtensionDefinition';
import type { DomainModelDefinition } from '../../model/apiModel/DomainModelDefinition';
import { logicalNameFor } from '../../model/apiModel/SchemaDefinition';
import type { SchemaDefinition } from '../../model/apiModel/SchemaDefinition';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';
import type { ApiFullName } from '../../model/apiModel/ApiFullName';

const enhancerName: string = 'CreateDomainModelDefinitionEnhancer';

// Schema definition is the database schema and project name for a namespace
export function buildSchemaDefinition(namespace: Namespace): SchemaDefinition {
  return {
    logicalName: logicalNameFor(namespace.namespaceName),
    physicalName: namespace.namespaceName,
  };
}

export function buildAggregateDefinitions(namespace: Namespace): Array<AggregateDefinition> {
  const result: Array<AggregateDefinition> = [];
  ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates
    .filter((a: Aggregate) => !a.isExtension)
    .forEach((aggregate: Aggregate) => {
      const aggregateDefinition: AggregateDefinition = {
        aggregateRootEntityName: {
          schema: aggregate.schema,
          name: aggregate.root,
        },
        aggregateEntityNames: [],
      };
      const aggregateEntityNames: Array<ApiFullName> = [];
      aggregate.entityTables.forEach((entityTable: EntityTable) => {
        aggregateEntityNames.push({
          schema: entityTable.schema,
          name: entityTable.table,
        });
      });
      aggregateDefinition.aggregateEntityNames = R.sortBy(R.compose(R.toLower, R.prop('name')), aggregateEntityNames);
      result.push(aggregateDefinition);
    });

  return R.sortBy(R.compose(R.toLower, R.path(['aggregateRootEntityName', 'name'])), result);
}

export function buildAggregateExtensionDefinitions(namespace: Namespace): Array<AggregateExtensionDefinition> {
  const result: Array<AggregateExtensionDefinition> = [];
  ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates
    .filter((a: Aggregate) => a.isExtension)
    .forEach((aggregate: Aggregate) => {
      const aggregateExtensionDefinition: AggregateExtensionDefinition = {
        aggregateRootEntityName: {
          schema: 'edfi', // assuming here that extensions are always extending from core
          name: aggregate.root,
        },
        extensionEntityNames: [],
      };
      const extensionEntityNames: Array<ApiFullName> = [];
      aggregate.entityTables.forEach((entityTable: EntityTable) => {
        extensionEntityNames.push({
          schema: entityTable.schema,
          name: entityTable.table,
        });
      });
      aggregateExtensionDefinition.extensionEntityNames = R.sortBy(
        R.compose(R.toLower, R.prop('name')),
        extensionEntityNames,
      );
      result.push(aggregateExtensionDefinition);
    });

  return R.sortBy(R.compose(R.toLower, R.path(['aggregateRootEntityName', 'name'])), result);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const odsPlugin: PluginEnvironment = ((metaEd.plugin.get('edfiOds'): any): PluginEnvironment);
  if (!odsPlugin || !odsPlugin.entity)
    return {
      enhancerName,
      success: false,
    };

  const edFiOdsEntityRepository: EdFiOdsEntityRepository = ((odsPlugin.entity: any): EdFiOdsEntityRepository);

  metaEd.entity.namespace.forEach((namespace: Namespace) => {
    const additionalEntityDefinitions = [];

    const domainModelDefinition: DomainModelDefinition = {
      odsApiVersion: '3.0.0',
      schemaDefinition: buildSchemaDefinition(namespace),
      aggregateDefinitions: buildAggregateDefinitions(namespace),
      aggregateExtensionDefinitions: buildAggregateExtensionDefinitions(namespace),
      entityDefinitions: buildEntityDefinitions(edFiOdsEntityRepository.table, namespace, additionalEntityDefinitions),
      associationDefinitions: buildAssociationDefinitions(edFiOdsEntityRepository.table, namespace),
    };

    ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).domainModelDefinition = domainModelDefinition;
  });

  return {
    enhancerName,
    success: true,
  };
}
