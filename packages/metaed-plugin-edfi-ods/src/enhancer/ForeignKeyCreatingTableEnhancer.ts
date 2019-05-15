import R from 'ramda';
import { asReferentialProperty } from 'metaed-core';
import { EnhancerResult, EntityProperty, MergeDirective, MetaEdEnvironment, Namespace } from 'metaed-core';
import { getAllColumns, getPrimaryKeys, addForeignKey } from '../model/database/Table';
import { newColumnNamePair } from '../model/database/ColumnNamePair';
import { newForeignKey, addColumnNamePair, foreignKeySourceReferenceFrom } from '../model/database/ForeignKey';
import { tableEntities } from './EnhancerHelper';
import { isOdsReferenceProperty } from '../model/property/ReferenceProperty';
import { Column } from '../model/database/Column';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

// Get grouped properties and columns for the foreign keys
// Generate foreign keys, add columns based on primary keys of the tables
// Set cascades based on previous calculations
// Add foreign key to the table
const enhancerName = 'ForeignKeyCreatingTableEnhancer';

export interface PropertyColumnPair {
  property: EntityProperty;
  columns: Column[];
}

export function getReferencePropertiesAndAssociatedColumns(table: Table): PropertyColumnPair[] {
  return R.compose(
    R.map((pair: PropertyColumnPair) => ({ property: R.head(pair).property, columns: R.chain(x => x.columns)(pair) })),
    R.values,
    R.groupBy((pair: PropertyColumnPair) => pair.property.roleName + pair.property.metaEdName),
    R.chain((column: Column) =>
      R.compose(
        R.map((property: EntityProperty) => ({ property, columns: [column] })),
        R.filter((property: EntityProperty) => isOdsReferenceProperty(property) && !R.propOr(false, 'isWeak')(property)),
      )(column.sourceEntityProperties),
    ),
    getAllColumns,
  )(table);
}

export function getMatchingColumnFromSourceEntityProperties(columnToMatch: Column, columns: Column[]): Column | undefined {
  const matchingColumns: Column[] = columns.filter((column: Column) =>
    R.not(R.isEmpty(R.intersection(columnToMatch.sourceEntityProperties, column.sourceEntityProperties))),
  );
  if (matchingColumns.length === 1) return R.head(matchingColumns);

  const nameMatch: Column | undefined = matchingColumns.find((column: Column) => column.name === columnToMatch.name);
  if (nameMatch != null) return nameMatch;

  const contextMatch: Column | undefined = matchingColumns.find((column: Column) =>
    column.mergedReferenceContexts.includes(columnToMatch.referenceContext),
  );
  return contextMatch;
}

export function getMergePropertyColumn(table: Table, column: Column, property: EntityProperty): Column | undefined {
  let result: Column | undefined;
  // TODO: As of METAED-881, the property here could be a shared simple property, which
  // is not currently an extension of ReferentialProperty but has an equivalent mergeDirectives field
  asReferentialProperty(property).mergeDirectives.forEach((mergeDirective: MergeDirective) => {
    if (
      mergeDirective.sourceProperty != null &&
      !column.sourceEntityProperties.includes(mergeDirective.sourceProperty) &&
      !column.mergedReferenceContexts.some((context: string) =>
        context.startsWith(R.tail(mergeDirective.sourcePropertyPathStrings).join('')),
      )
    )
      return;

    const expandedTargetProperties: EntityProperty[] = [];
    if (mergeDirective.targetProperty != null) {
      if (isOdsReferenceProperty(mergeDirective.targetProperty)) {
        // if (isOdsMergeableProperty(mergeDirective.targetProperty)) {
        expandedTargetProperties.push(
          ...R.chain((x: Column) => x.sourceEntityProperties)(
            R.compose(
              R.uniq,
              getPrimaryKeys,
            )(asReferentialProperty(mergeDirective.targetProperty).referencedEntity.data.edfiOds.odsEntityTable),
          ),
        );
      } else {
        expandedTargetProperties.push(mergeDirective.targetProperty);
      }
    }

    const targetProperty: EntityProperty =
      expandedTargetProperties.length === 1
        ? R.head(expandedTargetProperties)
        : R.head(expandedTargetProperties.filter((x: EntityProperty) => column.sourceEntityProperties.includes(x)));

    let targetPropertyPathStrings: string = R.join('')(mergeDirective.targetPropertyPathStrings);
    if (property.parentEntity.type !== 'choice' && table.name !== property.parentEntity.data.edfiOds.odsTableName) {
      // If dealing with a property from a parent table for a join table primary key, add the parent entity name to make paths match
      targetPropertyPathStrings = property.parentEntity.data.edfiOds.odsTableName + targetPropertyPathStrings;
    }
    result = getAllColumns(table).find(
      (x: Column) =>
        x.sourceEntityProperties.includes(targetProperty) &&
        // startsWith() used because we can merge references in the middle of a reference context, but the start will always match
        x.mergedReferenceContexts.some((context: string) => context.startsWith(targetPropertyPathStrings)),
    );
  });
  return result;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);

    tables.forEach((parentTable: Table) => {
      const parentTablePropertyColumnPairs: PropertyColumnPair[] = getReferencePropertiesAndAssociatedColumns(parentTable);
      parentTablePropertyColumnPairs.forEach((parentTablePairs: PropertyColumnPair) => {
        const foreignTableNamespace: Namespace = asReferentialProperty(parentTablePairs.property).referencedEntity.namespace;
        const foreignTable: Table | undefined = tableEntities(metaEd, foreignTableNamespace).get(
          parentTablePairs.property.metaEdName,
        );
        // something is very wrong if table is not there, but for now just ignore
        if (foreignTable == null) return;

        const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
          foreignTableName: foreignTable.name,
          foreignTableSchema: foreignTable.schema,
          foreignTableNamespace: foreignTable.namespace,
          sourceReference: foreignKeySourceReferenceFrom(parentTablePairs.property),
        });

        getPrimaryKeys(foreignTable).forEach((foreignTablePk: Column) => {
          const matchingColumn: Column | undefined = getMatchingColumnFromSourceEntityProperties(
            foreignTablePk,
            parentTablePairs.columns,
          );
          const parentTableColumn: Column | undefined =
            matchingColumn != null
              ? matchingColumn
              : getMergePropertyColumn(parentTable, foreignTablePk, parentTablePairs.property);
          if (parentTableColumn == null) {
            throw new Error(
              `Could not find matching foreign key columns for parent property ${parentTable.schema}.${parentTable.name}.${
                parentTablePairs.property.metaEdName
              } and referenced field ${foreignTable.schema}.${foreignTable.name}.${foreignTablePk.name}`,
            );
          }

          addColumnNamePair(
            foreignKey,
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: parentTableColumn.name,
              foreignTableColumnName: foreignTablePk.name,
            }),
          );
        });

        const isReference = parentTablePairs.property != null && isOdsReferenceProperty(parentTablePairs.property);

        foreignKey.withDeleteCascade = isReference && parentTablePairs.property.data.edfiOds.odsDeleteCascadePrimaryKey;

        foreignKey.withUpdateCascade =
          isReference &&
          asReferentialProperty(parentTablePairs.property).referencedEntity.data.edfiOds.odsCascadePrimaryKeyUpdates &&
          !parentTablePairs.property.data.edfiOds.odsCausesCyclicUpdateCascade;

        addForeignKey(parentTable, foreignKey);
      });
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
