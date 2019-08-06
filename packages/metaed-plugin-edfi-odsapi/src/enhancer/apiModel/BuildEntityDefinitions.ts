import R from 'ramda';
import {
  asDomainEntity,
  asAssociation,
  isSharedProperty,
  SemVer,
  versionSatisfies,
  PluginEnvironment,
  MetaEdEnvironment,
  Namespace,
  EntityProperty,
} from 'metaed-core';
import { Table, Column } from 'metaed-plugin-edfi-ods-relational';
import { tableEntities } from 'metaed-plugin-edfi-ods-relational';
import { buildApiProperty } from './BuildApiProperty';
import { EntityDefinition } from '../../model/apiModel/EntityDefinition';
import { EntityIdentifier } from '../../model/apiModel/EntityIdentifier';
import { ApiProperty } from '../../model/apiModel/ApiProperty';
import { DbType } from '../../model/apiModel/DbType';

interface BuildSingleEntityDefinitionOptions {
  includeAlternateKeys: boolean;
  isAbstract: boolean;
}

function isUpdatable(table: Table): boolean {
  return table.isEntityMainTable && table.parentEntity.allowPrimaryKeyUpdates;
}

// "identifiers" are the primary key columns of the table
export function identifiersFrom(
  table: Table,
  { includeAlternateKeys }: BuildSingleEntityDefinitionOptions,
): EntityIdentifier[] {
  const result: EntityIdentifier[] = [];
  result.push({
    identifierName: `${table.data.edfiOdsSqlServer.tableName}_PK`,
    identifyingPropertyNames: table.primaryKeys.map((column: Column) => column.data.edfiOdsSqlServer.columnName),
    isPrimary: true,
    isUpdatable: isUpdatable(table),
  });

  if (includeAlternateKeys) {
    result.push({
      identifierName: `${table.data.edfiOdsSqlServer.tableName}_AK`,
      identifyingPropertyNames: table.alternateKeys.map((column: Column) => column.data.edfiOdsSqlServer.columnName),
      isPrimary: false,
      isUpdatable: false,
    });
  }

  table.uniqueIndexes.forEach((column: Column) => {
    result.push({
      identifierName: `${table.data.edfiOdsSqlServer.tableName}_UX_${column.data.edfiOdsSqlServer.columnName}`,
      identifyingPropertyNames: [column.data.edfiOdsSqlServer.columnName],
      isPrimary: false,
      isUpdatable: false,
    });
  });

  if (table.includeLastModifiedDateAndIdColumn) {
    result.push({
      identifierName: `UX_${table.data.edfiOdsSqlServer.tableName}_Id`,
      identifyingPropertyNames: ['Id'],
      isPrimary: false,
      isUpdatable: isUpdatable(table),
    });
  }

  return R.sortBy(
    R.compose(
      R.toLower,
      R.prop('identifierName'),
    ),
    result,
  );
}

// heuristic on whether a column is "locally defined" according to the API:
// non-locally defined are typically only columns that exist to be foreign key references, but
// key unification merges put a spin on this because some foreign key reference columns
// may actually be defined by simple properties as well and thus "locally defined",
// for example when they are the target of a merge then a column can be there both because of the foreign key
// and because of the local definition
function includeColumn(column: Column, table: Table, foreignKeyColumnIdsOnTable: string[]): boolean {
  // automatically include if not an FK column
  if (!foreignKeyColumnIdsOnTable.includes(column.columnId)) return true;

  // otherwise, include the FK column if a source property of that column is on the same DE
  // as the table that this FK column is on -- shared simple properties only
  return column.sourceEntityProperties.some(
    (property: EntityProperty) =>
      isSharedProperty(property) &&
      property.mergeTargetedBy.length > 0 &&
      property.parentEntity.data.edfiOdsRelational.odsEntityTable === table,
  );
}

function locallyDefinedPropertiesFrom(targetTechnologyVersion: SemVer, table: Table): ApiProperty[] {
  const foreignKeyColumnIdsOnTable: string[] = table.foreignKeys.flatMap(fk =>
    fk.columnPairs.map(cp => cp.parentTableColumnId),
  );

  const result: ApiProperty[] = table.columns
    .filter((column: Column) => includeColumn(column, table, foreignKeyColumnIdsOnTable))
    .map((column: Column) => buildApiProperty(column));

  const datetime: DbType = versionSatisfies(targetTechnologyVersion, '>=3.1.1') ? 'DateTime2' : 'DateTime';

  if (table.includeCreateDateColumn) {
    result.push({
      propertyName: 'CreateDate',
      propertyType: {
        dbType: datetime,
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
        dbType: datetime,
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

  return R.sortBy(
    R.compose(
      R.toLower,
      R.prop('propertyName'),
    ),
    result,
  );
}

function buildSingleEntityDefinitionFrom(
  targetTechnologyVersion: SemVer,
  table: Table,
  options: BuildSingleEntityDefinitionOptions,
): EntityDefinition {
  return {
    schema: table.schema,
    name: table.data.edfiOdsSqlServer.tableName,
    locallyDefinedProperties: locallyDefinedPropertiesFrom(targetTechnologyVersion, table),
    identifiers: identifiersFrom(table, options),
    isAbstract: options.isAbstract,
    description: table.description,
    isDeprecated: table.isDeprecated ? true : undefined,
    deprecationReasons: table.deprecationReasons.length > 0 ? table.deprecationReasons : undefined,
  };
}

function isAbstract(table: Table): boolean {
  // true for the hardcoded Descriptor table
  if (table.tableId === 'Descriptor' && table.schema === 'edfi') return true;
  // true for the main table of an Abstract Entity
  return (
    (table.parentEntity.type === 'domainEntity' &&
      asDomainEntity(table.parentEntity).isAbstract &&
      table.isEntityMainTable) ||
    (table.parentEntity.type === 'association' && asAssociation(table.parentEntity).isAbstract && table.isEntityMainTable)
  );
}

function shouldIncludeAlternateKeys(table: Table): boolean {
  // true for the hardcoded Descriptor table
  return table.tableId === 'Descriptor' && table.schema === 'edfi';
}

// Entity definitions are the ODS table definitions for a namespaceName, including columns and primary keys
export function buildEntityDefinitions(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  additionalEntityDefinitions: EntityDefinition[],
): EntityDefinition[] {
  const { targetTechnologyVersion } = metaEd.plugin.get('edfiOdsRelational') as PluginEnvironment;
  const result: EntityDefinition[] = [];
  tableEntities(metaEd, namespace).forEach((table: Table) => {
    result.push(
      buildSingleEntityDefinitionFrom(targetTechnologyVersion, table, {
        isAbstract: isAbstract(table),
        includeAlternateKeys: shouldIncludeAlternateKeys(table),
      }),
    );
  });

  result.push(...additionalEntityDefinitions);
  return R.sortBy(
    R.compose(
      R.toLower,
      R.prop('name'),
    ),
    result,
  );
}
