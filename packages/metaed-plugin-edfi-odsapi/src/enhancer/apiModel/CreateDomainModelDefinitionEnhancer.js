// @flow
import R from 'ramda';
import { getAllTopLevelEntities } from 'metaed-core';
import type { MetaEdEnvironment, EnhancerResult, NamespaceInfo, PluginEnvironment, TopLevelEntity } from 'metaed-core';
import type { EdFiOdsEntityRepository } from 'metaed-plugin-edfi-ods';
import { buildEntityDefinitions } from './BuildEntityDefinitions';
import { buildAssociationDefinitions } from './BuildAssociationDefinitions';
import type { NamespaceInfoEdfiOdsApi } from '../../model/NamespaceInfo';
import type { AggregateDefinition } from '../../model/apiModel/AggregateDefinition';
import type { AggregateExtensionDefinition } from '../../model/apiModel/AggregateExtensionDefinition';

import type { DomainModelDefinition } from '../../model/apiModel/DomainModelDefinition';
import type { SchemaDefinition } from '../../model/apiModel/SchemaDefinition';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';
import type { ApiFullName } from '../../model/apiModel/ApiFullName';

const enhancerName: string = 'CreateDomainModelDefinitionEnhancer';

// Schema definition is the database schema and project name for a namespace
export function buildSchemaDefinition(namespaceInfo: NamespaceInfo): SchemaDefinition {
  return {
    logicalName: namespaceInfo.namespace === 'edfi' ? 'Ed-Fi' : namespaceInfo.projectExtension,
    physicalName: namespaceInfo.namespace,
  };
}

export function buildAggregateDefinitions(namespaceInfo: NamespaceInfo): Array<AggregateDefinition> {
  const result: Array<AggregateDefinition> = [];
  ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdfiOdsApi).aggregates
    .filter((a: Aggregate) => a.schema === namespaceInfo.namespace)
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
    .filter((a: Aggregate) => a.schema !== namespaceInfo.namespace)
    .forEach((aggregate: Aggregate) => {
      const aggregateExtensionDefinition: AggregateExtensionDefinition = {
        aggregateRootEntityName: {
          schema: aggregate.schema,
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
  const topLevelEntities: Array<TopLevelEntity> = getAllTopLevelEntities(metaEd.entity);

  metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
    const entitiesInNamespace: Array<TopLevelEntity> = topLevelEntities.filter(
      x => x.namespaceInfo.namespace === namespaceInfo.namespace,
    );
    const domainModelDefinition: DomainModelDefinition = {
      schemaDefinition: buildSchemaDefinition(namespaceInfo),
      aggregateDefinitions: buildAggregateDefinitions(namespaceInfo),
      aggregateExtensionDefinitions: buildAggregateExtensionDefinitions(namespaceInfo),
      entityDefinitions: buildEntityDefinitions(entitiesInNamespace),
      associationDefinitions: buildAssociationDefinitions(edFiOdsEntityRepository.table),
    };

    ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdfiOdsApi).domainModelDefinition = domainModelDefinition;
  });

  return {
    enhancerName,
    success: true,
  };
}
