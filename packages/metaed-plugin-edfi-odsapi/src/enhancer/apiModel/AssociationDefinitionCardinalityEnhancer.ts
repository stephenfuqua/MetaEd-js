import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { ForeignKey, Table } from 'metaed-plugin-edfi-ods-relational';
import { AssociationDefinition, AssociationDefinitionCardinality } from '../../model/apiModel/AssociationDefinition';
import { Aggregate } from '../../model/domainMetadata/Aggregate';
import { EntityTable } from '../../model/domainMetadata/EntityTable';
import { NamespaceEdfiOdsApi } from '../../model/Namespace';
import { allTablesInNamespacesBySchema, foreignKeyFor } from './EnhancerHelper';

const enhancerName = 'AssociationDefinitionIsRequiredEnhancer';

function findAggregateWithEntity(
  aggregates: Aggregate[],
  entityTableSchema: string,
  entityTableName: string,
): Aggregate | null {
  const aggregatesWithEntityTable: Aggregate[] = aggregates.reduce((result: Aggregate[], currentAggregate: Aggregate) => {
    const inThisAggregate: boolean = currentAggregate.entityTables.some(
      (e: EntityTable) => e.schema === entityTableSchema && e.table === entityTableName,
    );
    return inThisAggregate ? result.concat(currentAggregate) : result;
  }, []);
  return aggregatesWithEntityTable.length === 1 ? aggregatesWithEntityTable[0] : null;
}

function cardinalityFrom(
  { isIdentifying }: AssociationDefinition,
  foreignKey: ForeignKey,
  schemasTables: Map<string, Map<string, Table>>,
  domainMetadataAggregatesForNamespace: Aggregate[],
): AssociationDefinitionCardinality {
  if (foreignKey.sourceReference.isSubclassRelationship) return 'OneToOneInheritance';
  if (foreignKey.sourceReference.isExtensionRelationship) return 'OneToOneExtension';

  const parentSchemaTableMap: Map<string, Table> | undefined = schemasTables.get(foreignKey.parentTable.schema);
  if (parentSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.parentTable.schema}'.`);
  const parentTable: Table | undefined = parentSchemaTableMap.get(foreignKey.parentTable.tableId);
  if (parentTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.parentTable.tableId}'.`);

  const foreignSchemaTableMap: Map<string, Table> | undefined = schemasTables.get(foreignKey.foreignTableSchema);
  if (foreignSchemaTableMap == null)
    throw new Error(`BuildAssociationDefinitions: could not find table schema '${foreignKey.foreignTableSchema}'.`);
  const foreignTable: Table | undefined = foreignSchemaTableMap.get(foreignKey.foreignTableId);
  if (foreignTable == null)
    throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.foreignTableId}'.`);

  // this is what the if statement in the C# code had: count of PK columns on both sides are
  // equal -- this feels like too weak a constraint
  if (isIdentifying && parentTable.primaryKeys.length === foreignTable.primaryKeys.length) return 'OneToOne';

  // OneToOneOrMore is based on the "isRequiredCollection" flag in DomainMetadata, when the foreign key is the
  // back reference from an aggregate dependent table to either the root table or an intermediate dependent table
  const rootAggregate: Aggregate | null = findAggregateWithEntity(
    domainMetadataAggregatesForNamespace,
    foreignKey.foreignTableSchema,
    foreignKey.foreignTableId,
  );
  if (rootAggregate == null) return 'OneToZeroOrMore';

  const childEntitySearch: EntityTable[] = rootAggregate.entityTables.filter(
    (et: EntityTable) =>
      et.table === foreignKey.parentTable.data.edfiOdsSqlServer.tableName && et.schema === foreignKey.parentTable.schema,
  );
  if (childEntitySearch.length !== 1) return 'OneToZeroOrMore';
  if (childEntitySearch[0].isRequiredCollection) return 'OneToOneOrMore';
  return 'OneToZeroOrMore';
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const { domainModelDefinition, aggregates } = namespace.data.edfiOdsApi as NamespaceEdfiOdsApi;
    const { associationDefinitions } = domainModelDefinition;
    const schemasTables: Map<string, Map<string, Table>> = allTablesInNamespacesBySchema(metaEd);

    associationDefinitions.forEach((associationDefinition: AssociationDefinition) => {
      const foreignKey = foreignKeyFor(metaEd, namespace, associationDefinition.fullName.name);
      if (foreignKey == null) return;

      associationDefinition.cardinality = cardinalityFrom(associationDefinition, foreignKey, schemasTables, aggregates);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
