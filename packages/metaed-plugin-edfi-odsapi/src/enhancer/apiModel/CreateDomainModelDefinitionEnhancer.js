// @flow
import R from 'ramda';
import { getAllTopLevelEntities } from 'metaed-core';
import type { MetaEdEnvironment, EnhancerResult, NamespaceInfo, PluginEnvironment, TopLevelEntity } from 'metaed-core';
import type { Table, Column, DecimalColumn, StringColumn, ForeignKey, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import type { NamespaceInfoEdFiOdsApi } from '../../model/NamespaceInfo';
import type { AggregateDefinition } from '../../model/apiModel/AggregateDefinition';
import type { AggregateExtensionDefinition } from '../../model/apiModel/AggregateExtensionDefinition';
import type { AssociationDefinition } from '../../model/apiModel/AssociationDefinition';
import type { DomainModelDefinition } from '../../model/apiModel/DomainModelDefinition';
import type { EntityDefinition } from '../../model/apiModel/EntityDefinition';
import type { EntityIdentifier } from '../../model/apiModel/EntityIdentifier';
import type { ApiProperty } from '../../model/apiModel/ApiProperty';
import type { ApiPropertyType } from '../../model/apiModel/ApiPropertyType';
import type { DbType } from '../../model/apiModel/DbType';
import type { SchemaDefinition } from '../../model/apiModel/SchemaDefinition';

const enhancerName: string = 'CreateDomainModelDefinitionEnhancer';

// Schema definition is the database schema and project name for a namespace
export function buildSchemaDefinition(namespaceInfo: NamespaceInfo): SchemaDefinition {
  return {
    logicalName: namespaceInfo.projectExtension,
    physicalName: namespaceInfo.namespace,
  };
}

// is this only for core namespace?????
export function buildAggregateDefinitions(namespaceInfo: NamespaceInfo): Array<AggregateDefinition> {
  // TODO: maybe we just port DomainMetadata generation over, because that's what this is.
  return [];
}

// only for extension namespaces, one per extension namespace, right????
export function buildAggregateExtensionDefinitions(namespaceInfo: NamespaceInfo): Array<AggregateExtensionDefinition> {
  // TODO: maybe we just port DomainMetadata generation over, because that's what this is.
  return [];
}

function dbTypeFrom(column: Column): DbType {
  if (column.type === 'boolean') return 'Boolean';
  if (column.type === 'currency') return 'Currency';
  if (column.type === 'date') return 'Date';
  if (column.type === 'decimal') return 'Decimal';
  if (column.type === 'duration') return 'String';
  if (column.type === 'integer') return 'Int32';
  if (column.type === 'percent') return 'Decimal';
  if (column.type === 'short') return 'Int16';
  if (column.type === 'string') return 'String';
  if (column.type === 'time') return 'Time';
  if (column.type === 'year') return 'Int16';

  return 'Unknown';
}

function maxLengthFrom(column: Column): number {
  if (column.type === 'duration') return 30;
  if (column.type === 'percent') return 5;
  if (column.type === 'string') return Number.parseInt(((column: any): StringColumn).length, 10);
  return 0;
}

function precisionFrom(column: Column): number {
  if (column.type === 'currency') return 19;
  if (column.type === 'decimal') return Number.parseInt(((column: any): DecimalColumn).precision, 10);
  if (column.type === 'percent') return 5;
  return 0;
}

function scaleFrom(column: Column): number {
  if (column.type === 'currency') return 4;
  if (column.type === 'decimal') return Number.parseInt(((column: any): DecimalColumn).scale, 10);
  if (column.type === 'percent') return 4;
  return 0;
}

function apiPropertyTypeFrom(column: Column): ApiPropertyType {
  return {
    dbType: dbTypeFrom(column),
    maxLength: maxLengthFrom(column),
    precision: precisionFrom(column),
    scale: scaleFrom(column),
    isNullable: column.isNullable,
  };
}

// "identifiers" are the primary key columns of the table
function identifiersFrom(table: Table): Array<EntityIdentifier> {
  const result: Array<EntityIdentifier> = [];
  result.push({
    identifierName: `${table.name}_PK`,
    identifyingPropertyNames: table.primaryKeys.map((column: Column) => column.name),
    isPrimary: true,
    isUpdatable:
      table.parentEntity != null &&
      ((table.parentEntity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_CascadePrimaryKeyUpdates,
  });

  result.push({
    identifierName: `${table.name}_AK`,
    identifyingPropertyNames: table.alternateKeys.map((column: Column) => column.name),
    isPrimary: false,
    isUpdatable: false,
  });

  table.uniqueIndexes.forEach((column: Column) => {
    result.push({
      identifierName: `${table.name}_UX_${column.name}`,
      identifyingPropertyNames: [column.name],
      isPrimary: false,
      isUpdatable: false,
    });
  });

  if (table.includeLastModifiedDateAndIdColumn) {
    result.push({
      identifierName: `UX_${table.name}_Id`,
      identifyingPropertyNames: ['Id'],
      isPrimary: false,
      isUpdatable: false,
    });
  }

  return result;
}

// locally defined "properties" are the columns on a table minus the columns there to provide a FK reference
function locallyDefinedPropertiesFrom(table: Table): Array<ApiProperty> {
  const foreignKeyColumnNamesOnTable: Array<string> = R.chain(
    (foreignKey: ForeignKey) => foreignKey.parentTableColumnNames,
    table.foreignKeys,
  );

  const result: Array<ApiProperty> = table.columns
    .filter((column: Column) => !foreignKeyColumnNamesOnTable.includes(column.name))
    .map((column: Column) => ({
      propertyName: column.name,
      propertyType: apiPropertyTypeFrom(column),
      description: column.description,
      isIdentifying: column.isPartOfPrimaryKey,
      isServerAssigned: column.isIdentityDatabaseType,
    }));

  if (table.includeCreateDateColumn) {
    result.push({
      propertyName: 'CreateDate',
      propertyType: {
        dbType: 'DateTime',
        maxLength: 0,
        precision: 0,
        scale: 0,
        isNullable: false,
      },
      description: '',
      isIdentifying: false,
      isServerAssigned: false,
    });
  }

  if (table.includeLastModifiedDateAndIdColumn) {
    result.push({
      propertyName: 'Id',
      propertyType: {
        dbType: 'Guid',
        maxLength: 0,
        precision: 0,
        scale: 0,
        isNullable: false,
      },
      description: '',
      isIdentifying: false,
      isServerAssigned: false,
    });

    result.push({
      propertyName: 'LastModifiedDate',
      propertyType: {
        dbType: 'DateTime',
        maxLength: 0,
        precision: 0,
        scale: 0,
        isNullable: false,
      },
      description: '',
      isIdentifying: false,
      isServerAssigned: false,
    });
  }
  return result;
}

// Entity definitions are the ODS table definitions for a namespace, including columns and primary keys
export function buildEntityDefinitions(
  namespaceInfo: NamespaceInfo,
  entities: Array<TopLevelEntity>,
): Array<EntityDefinition> {
  const result: Array<EntityDefinition> = [];
  entities.forEach((entity: TopLevelEntity) => {
    const odsTablesForEntity: Array<Table> = entity.data.edfiOds.ods_Tables;
    odsTablesForEntity.forEach((table: Table) => {
      result.push({
        schema: table.schema,
        name: table.name,
        locallyDefinedProperties: locallyDefinedPropertiesFrom(table),
        identifiers: identifiersFrom(table),
        // this is true only for the root table of an Abstract Entity
        isAbstract: entity.type === 'abstractEntity' && entity.data.edfiOds.ods_EntityTable.name === table.name,
        description: table.description,
      });
    });
  });

  return result;
}

// Association definitions are the ODS foreign key definitions for a namespace
export function buildAssociationDefinitions(
  namespaceInfo: NamespaceInfo,
  entities: Array<TopLevelEntity>,
): Array<AssociationDefinition> {
  return [];
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const odsPlugin: PluginEnvironment = ((metaEd.plugin.get('edfiOds'): any): PluginEnvironment);
  if (!odsPlugin || !odsPlugin.table)
    return {
      enhancerName,
      success: false,
    };

  const topLevelEntities: Array<TopLevelEntity> = getAllTopLevelEntities(metaEd.entity);

  metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
    const entitiesInNamespace: Array<TopLevelEntity> = topLevelEntities.filter(
      x => x.namespaceInfo.namespace === namespaceInfo.namespace,
    );
    const domainModelDefinition: DomainModelDefinition = {
      schemaDefinition: buildSchemaDefinition(namespaceInfo),
      aggregateDefinitions: buildAggregateDefinitions(namespaceInfo),
      aggregateExtensionDefinitions: buildAggregateExtensionDefinitions(namespaceInfo),
      entityDefinitions: buildEntityDefinitions(namespaceInfo, entitiesInNamespace),
      associationDefinitions: buildAssociationDefinitions(namespaceInfo, entitiesInNamespace),
    };

    ((namespaceInfo.data.edfiOdsApi: any): NamespaceInfoEdFiOdsApi).domainModelDefinition = domainModelDefinition;
  });

  return {
    enhancerName,
    success: true,
  };
}
