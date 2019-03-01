import R from 'ramda';
import { MetaEdEnvironment, EnhancerResult, Namespace, PluginEnvironment } from 'metaed-core';
import { buildEntityDefinitions } from './BuildEntityDefinitions';
import { buildAssociationDefinitions } from './BuildAssociationDefinitions';
import { deriveLogicalNameFromProjectName } from '../../model/apiModel/SchemaDefinition';
import { NamespaceEdfiOdsApi } from '../../model/Namespace';
import { AggregateDefinition } from '../../model/apiModel/AggregateDefinition';
import { AggregateExtensionDefinition } from '../../model/apiModel/AggregateExtensionDefinition';
import { DomainModelDefinition } from '../../model/apiModel/DomainModelDefinition';
import { SchemaDefinition } from '../../model/apiModel/SchemaDefinition';
import { Aggregate } from '../../model/domainMetadata/Aggregate';
import { EntityTable } from '../../model/domainMetadata/EntityTable';
import { ApiFullName } from '../../model/apiModel/ApiFullName';

const enhancerName = 'CreateDomainModelDefinitionEnhancer';

// Schema definition is the database schema and project name for a namespace
export function buildSchemaDefinition(namespace: Namespace): SchemaDefinition {
  return {
    logicalName: deriveLogicalNameFromProjectName(namespace.projectName),
    physicalName: namespace.namespaceName.toLowerCase(),
  };
}

export function buildAggregateDefinitions(namespace: Namespace): Array<AggregateDefinition> {
  const result: Array<AggregateDefinition> = [];
  (namespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates
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
      aggregateDefinition.aggregateEntityNames = R.sortBy(
        R.compose(
          R.toLower,
          R.prop('name'),
        ),
        aggregateEntityNames,
      );
      result.push(aggregateDefinition);
    });

  return R.sortBy(
    R.compose(
      R.toLower,
      R.path(['aggregateRootEntityName', 'name']),
    ),
    result,
  );
}

export function buildAggregateExtensionDefinitions(namespace: Namespace): Array<AggregateExtensionDefinition> {
  const result: Array<AggregateExtensionDefinition> = [];
  (namespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates
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
        R.compose(
          R.toLower,
          R.prop('name'),
        ),
        extensionEntityNames,
      );
      result.push(aggregateExtensionDefinition);
    });

  return R.sortBy(
    R.compose(
      R.toLower,
      R.path(['aggregateRootEntityName', 'name']),
    ),
    result,
  );
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const additionalEntityDefinitions = [];

    const odsApiVersion: string = (metaEd.plugin.get('edfiOds') as PluginEnvironment).targetTechnologyVersion || '3.0.0';
    const version: string = namespace.projectVersion;

    const domainModelDefinition: DomainModelDefinition = {
      odsApiVersion,
      version,
      schemaDefinition: buildSchemaDefinition(namespace),
      aggregateDefinitions: buildAggregateDefinitions(namespace),
      aggregateExtensionDefinitions: buildAggregateExtensionDefinitions(namespace),
      entityDefinitions: buildEntityDefinitions(metaEd, namespace, additionalEntityDefinitions),
      associationDefinitions: buildAssociationDefinitions(metaEd, namespace),
    };

    (namespace.data.edfiOdsApi as NamespaceEdfiOdsApi).domainModelDefinition = domainModelDefinition;
  });

  return {
    enhancerName,
    success: true,
  };
}
