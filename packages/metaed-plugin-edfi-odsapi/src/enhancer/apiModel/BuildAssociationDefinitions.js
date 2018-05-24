// @flow
import R from 'ramda';
import type { Namespace, MetaEdEnvironment } from 'metaed-core';
import type { Table, Column, ForeignKey, ColumnNamePair } from 'metaed-plugin-edfi-ods';
import { tableEntities } from 'metaed-plugin-edfi-ods';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';
import type { AssociationDefinition, AssociationDefinitionCardinality } from '../../model/apiModel/AssociationDefinition';
import type { ApiProperty } from '../../model/apiModel/ApiProperty';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';
import { buildApiProperty } from './BuildApiProperty';

function findAggregateWithEntity(
  aggregates: Array<Aggregate>,
  entityTableSchema: string,
  entityTableName: string,
): ?Aggregate {
  const aggregatesWithEntityTable: Array<Aggregate> = aggregates.reduce(
    (result: Array<Aggregate>, currentAggregate: Aggregate) => {
      const inThisAggregate: boolean = currentAggregate.entityTables.some(
        (e: EntityTable) => e.schema === entityTableSchema && e.table === entityTableName,
      );
      return inThisAggregate ? result.concat(currentAggregate) : result;
    },
    [],
  );
  return aggregatesWithEntityTable.length === 1 ? aggregatesWithEntityTable[0] : null;
}

function cardinalityFrom(
  isIdentifying: boolean,
  foreignKey: ForeignKey,
  schemasTables: Map<string, Map<string, Table>>,
  domainMetadataAggregatesForNamespace: Array<Aggregate>,
): AssociationDefinitionCardinality {
  if (foreignKey.sourceReference.isSubclassRelationship) return 'OneToOneInheritance';
  if (foreignKey.sourceReference.isExtensionRelationship) return 'OneToOneExtension';

  const parentSchemaTableMap: ?Map<string, Table> = schemasTables.get(foreignKey.parentTableSchema);
  if (parentSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.parentTableSchema}'.`);
  const parentTable: ?Table = parentSchemaTableMap.get(foreignKey.parentTableName);
  if (parentTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.parentTableName}'.`);

  const foreignSchemaTableMap: ?Map<string, Table> = schemasTables.get(foreignKey.foreignTableSchema);
  if (foreignSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.foreignTableSchema}'.`);
  const foreignTable: ?Table = foreignSchemaTableMap.get(foreignKey.foreignTableName);
  if (foreignTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.foreignTableName}'.`);

  // this is what the if statement in the C# code had: count of PK columns on both sides are
  // equal -- this feels like too weak a constraint
  if (isIdentifying && parentTable.primaryKeys.length === foreignTable.primaryKeys.length) return 'OneToOne';

  // OneToOneOrMore is based on the "isRequiredCollection" flag in DomainMetadata, when the foreign key is the
  // back reference from an aggregate dependent table to either the root table or an intermediate dependent table
  const rootAggregate: ?Aggregate = findAggregateWithEntity(
    domainMetadataAggregatesForNamespace,
    foreignKey.foreignTableSchema,
    foreignKey.foreignTableName,
  );
  if (rootAggregate == null) return 'OneToZeroOrMore';

  const childEntitySearch: Array<EntityTable> = rootAggregate.entityTables.filter(
    (et: EntityTable) => et.table === foreignKey.parentTableName && et.schema === foreignKey.parentTableSchema,
  );
  if (childEntitySearch.length !== 1) return 'OneToZeroOrMore';
  if (childEntitySearch[0].isRequiredCollection) return 'OneToOneOrMore';
  return 'OneToZeroOrMore';
}

// "primary" entity is actually the foreign table, "properties" are columns
function getPrimaryEntityProperties(
  foreignKey: ForeignKey,
  schemasTables: Map<string, Map<string, Table>>,
  isIdentifying: boolean,
): Array<ApiProperty> {
  const foreignSchemaTableMap: ?Map<string, Table> = schemasTables.get(foreignKey.foreignTableSchema);
  if (foreignSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.foreignTableSchema}'.`);
  const foreignTable: ?Table = foreignSchemaTableMap.get(foreignKey.foreignTableName);
  if (foreignTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.foreignTableName}'.`);

  // maintain foreign key column order
  return foreignKey.foreignTableColumnNames
    .map((columnName: string) => foreignTable.columns.filter(c => c.name === columnName))
    .map((columnArray: Array<Column>) => columnArray[0])
    .map((c: Column) => ({ ...buildApiProperty(c), isIdentifying }));
}

// Override the typical isServerAssigned - it's true iff it's from a 1-1 or 1-1 inheritance relation and the matching
// column on the other side of the FK is server assigned.
function buildApiPropertyWithServerAssignedOverride(
  column: Column,
  foreignKey: ForeignKey,
  schemasTables: Map<string, Map<string, Table>>,
  isIdentifying: boolean,
  domainMetadataAggregatesForNamespace: Array<Aggregate>,
): ApiProperty {
  const result: ApiProperty = { ...buildApiProperty(column), isIdentifying };
  const associationDefinitionCardinality: AssociationDefinitionCardinality = cardinalityFrom(
    isIdentifying,
    foreignKey,
    schemasTables,
    domainMetadataAggregatesForNamespace,
  );
  if (
    associationDefinitionCardinality === 'OneToOne' ||
    associationDefinitionCardinality === 'OneToOneInheritance' ||
    associationDefinitionCardinality === 'OneToOneExtension'
  ) {
    const foreignSchemaTableMap: ?Map<string, Table> = schemasTables.get(foreignKey.foreignTableSchema);
    if (foreignSchemaTableMap == null)
      throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.foreignTableSchema}'.`);
    const foreignTable: ?Table = foreignSchemaTableMap.get(foreignKey.foreignTableName);
    if (foreignTable == null)
      throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.foreignTableName}'.`);
    const columnNamePair: ColumnNamePair = foreignKey.columnNames.filter(
      (cnp: ColumnNamePair) => cnp.parentTableColumnName === column.name,
    )[0];
    const otherColumn: Column = foreignTable.columns.filter(
      (c: Column) => c.name === columnNamePair.foreignTableColumnName,
    )[0];
    return { ...result, isServerAssigned: otherColumn.isIdentityDatabaseType };
  }
  return result;
}

// "secondary" entity is actually the parent table, "properties" are columns
function getSecondaryEntityProperties(
  foreignKey: ForeignKey,
  schemasTables: Map<string, Map<string, Table>>,
  isIdentifying: boolean,
  domainMetadataAggregatesForNamespace: Array<Aggregate>,
): Array<ApiProperty> {
  const parentSchemaTableMap: ?Map<string, Table> = schemasTables.get(foreignKey.parentTableSchema);
  if (parentSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.parentTableSchema}'.`);
  const parentTable: ?Table = parentSchemaTableMap.get(foreignKey.parentTableName);
  if (parentTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.parentTableName}'.`);

  // maintain foreign key column order
  return foreignKey.parentTableColumnNames
    .map((columnName: string) => parentTable.columns.filter(c => c.name === columnName))
    .map((columnArray: Array<Column>) => columnArray[0])
    .map((c: Column) =>
      buildApiPropertyWithServerAssignedOverride(
        c,
        foreignKey,
        schemasTables,
        isIdentifying,
        domainMetadataAggregatesForNamespace,
      ),
    );
}

// For some reason, this is where all of the source columns in the foreign key are part of the PK
function isIdentifyingForeignKey(foreignKey: ForeignKey, schemasTables: Map<string, Map<string, Table>>): boolean {
  const parentSchemaTableMap: ?Map<string, Table> = schemasTables.get(foreignKey.parentTableSchema);
  if (parentSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.parentTableSchema}'.`);
  const parentTable: ?Table = parentSchemaTableMap.get(foreignKey.parentTableName);
  if (parentTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.parentTableName}'.`);
  const primaryKeyColumnNames: Array<string> = parentTable.primaryKeys.map((c: Column) => c.name);

  return foreignKey.parentTableColumnNames.every(foreignKeyColumnName =>
    primaryKeyColumnNames.includes(foreignKeyColumnName),
  );
}

function isRequiredFrom(
  cardinality: AssociationDefinitionCardinality,
  foreignKey: ForeignKey,
  schemasTables: Map<string, Map<string, Table>>,
): boolean {
  if (cardinality === 'OneToOneInheritance' || cardinality === 'OneToOneExtension' || cardinality === 'OneToOne')
    return true;

  const parentSchemaTableMap: ?Map<string, Table> = schemasTables.get(foreignKey.parentTableSchema);
  if (parentSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.parentTableSchema}'.`);
  const parentTable: ?Table = parentSchemaTableMap.get(foreignKey.parentTableName);
  if (parentTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.parentTableName}'.`);

  const parentTableForeignKeyColumns: Array<Column> = parentTable.columns.filter((c: Column) =>
    foreignKey.parentTableColumnNames.includes(c.name),
  );
  return parentTableForeignKeyColumns.every((c: Column) => !c.isNullable);
}

function allTablesInNamespacesBySchema(metaEd: MetaEdEnvironment): Map<string, Map<string, Table>> {
  const schemaTableMaps: Map<string, Map<string, Table>> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    schemaTableMaps.set(namespace.namespaceName, tableEntities(metaEd, namespace));
  });
  return schemaTableMaps;
}

// Association definitions are the ODS foreign key definitions for a namespace
export function buildAssociationDefinitions(metaEd: MetaEdEnvironment, namespace: Namespace): Array<AssociationDefinition> {
  const result: Array<AssociationDefinition> = [];
  const domainMetadataAggregatesForNamespace: Array<Aggregate> = ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi)
    .aggregates;

  const schemasTables: Map<string, Map<string, Table>> = allTablesInNamespacesBySchema(metaEd);

  tableEntities(metaEd, namespace).forEach((table: Table) => {
    table.foreignKeys.forEach((foreignKey: ForeignKey) => {
      const isIdentifying: boolean = isIdentifyingForeignKey(foreignKey, schemasTables);
      const cardinality: AssociationDefinitionCardinality = cardinalityFrom(
        isIdentifying,
        foreignKey,
        schemasTables,
        domainMetadataAggregatesForNamespace,
      );
      const isRequired: boolean = isRequiredFrom(cardinality, foreignKey, schemasTables);
      result.push({
        fullName: {
          schema: table.schema,
          name: foreignKey.name,
        },
        cardinality,
        primaryEntityFullName: {
          schema: foreignKey.foreignTableSchema,
          name: foreignKey.foreignTableName,
        },
        primaryEntityProperties: getPrimaryEntityProperties(foreignKey, schemasTables, isIdentifying),
        secondaryEntityFullName: {
          schema: foreignKey.parentTableSchema,
          name: foreignKey.parentTableName,
        },
        secondaryEntityProperties: getSecondaryEntityProperties(
          foreignKey,
          schemasTables,
          isIdentifying,
          domainMetadataAggregatesForNamespace,
        ),
        isIdentifying,
        isRequired,
      });
    });
  });

  return R.sortBy(R.compose(R.toLower, R.path(['fullName', 'name'])), result);
}
