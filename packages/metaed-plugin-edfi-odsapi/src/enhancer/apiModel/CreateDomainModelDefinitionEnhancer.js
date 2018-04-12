// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, NamespaceInfo, PluginEnvironment } from 'metaed-core';
import type { EdFiOdsEntityRepository } from 'metaed-plugin-edfi-ods';
import { buildEntityDefinitions } from './BuildEntityDefinitions';
import { buildAssociationDefinitions } from './BuildAssociationDefinitions';
import type { NamespaceInfoEdfiOdsApi } from '../../model/NamespaceInfo';
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
export function buildSchemaDefinition(namespaceInfo: NamespaceInfo): SchemaDefinition {
  return {
    logicalName: logicalNameFor(namespaceInfo.namespace),
    physicalName: namespaceInfo.namespace,
  };
}

export function buildAggregateDefinitions(namespaceInfo: NamespaceInfo): Array<AggregateDefinition> {
  const result: Array<AggregateDefinition> = [];
  ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdfiOdsApi).aggregates
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

export function buildAggregateExtensionDefinitions(namespaceInfo: NamespaceInfo): Array<AggregateExtensionDefinition> {
  const result: Array<AggregateExtensionDefinition> = [];
  ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdfiOdsApi).aggregates
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

  metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
    const additionalEntityDefinitions = [];

    const domainModelDefinition: DomainModelDefinition = {
      odsApiVersion: '3.0.0',
      schemaDefinition: buildSchemaDefinition(namespaceInfo),
      aggregateDefinitions: buildAggregateDefinitions(namespaceInfo),
      aggregateExtensionDefinitions: buildAggregateExtensionDefinitions(namespaceInfo),
      entityDefinitions: buildEntityDefinitions(edFiOdsEntityRepository.table, namespaceInfo, additionalEntityDefinitions),
      associationDefinitions: buildAssociationDefinitions(edFiOdsEntityRepository.table, namespaceInfo),
    };

    ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdfiOdsApi).domainModelDefinition = domainModelDefinition;
  });

  return {
    enhancerName,
    success: true,
  };
}
