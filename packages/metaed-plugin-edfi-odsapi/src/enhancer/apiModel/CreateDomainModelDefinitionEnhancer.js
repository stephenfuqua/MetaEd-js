// @flow
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

const enhancerName: string = 'CreateDomainModelDefinitionEnhancer';

// Schema definition is the database schema and project name for a namespace
export function buildSchemaDefinition(namespaceInfo: NamespaceInfo): SchemaDefinition {
  return {
    logicalName: namespaceInfo.projectExtension,
    physicalName: namespaceInfo.namespace,
  };
}

// eslint-disable-next-line no-unused-vars
export function buildAggregateDefinitions(namespaceInfo: NamespaceInfo): Array<AggregateDefinition> {
  // is this only for core namespace?????
  // TODO: maybe we just port DomainMetadata generation over, because that's what this is.
  return [];
}

// eslint-disable-next-line no-unused-vars
export function buildAggregateExtensionDefinitions(namespaceInfo: NamespaceInfo): Array<AggregateExtensionDefinition> {
  // only for extension namespaces, one per extension namespace, right????
  // TODO: maybe we just port DomainMetadata generation over, because that's what this is.
  return [];
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
