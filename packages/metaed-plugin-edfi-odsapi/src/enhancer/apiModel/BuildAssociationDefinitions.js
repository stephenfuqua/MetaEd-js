// @flow
import type { Table, ForeignKey } from 'metaed-plugin-edfi-ods';
import type { AssociationDefinition, AssociationDefinitionCardinality } from '../../model/apiModel/AssociationDefinition';
import type { ApiProperty } from '../../model/apiModel/ApiProperty';
import { buildApiProperty } from './BuildApiProperty';

// "primary" entity is actually the foreign table, "properties" are columns
function getPrimaryEntityProperties(foreignKey: ForeignKey, tables: Map<string, Table>): Array<ApiProperty> {
  const table = tables.get(foreignKey.foreignTableName);
  if (table == null) throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.foreignTableName}'.`);

  return table.columns.filter(c => foreignKey.foreignTableColumnNames.includes(c.name)).map(c => buildApiProperty(c));
}

// "secondary" entity is actually the parent table, "properties" are columns
function getSecondaryEntityProperties(foreignKey: ForeignKey, tables: Map<string, Table>): Array<ApiProperty> {
  const table = tables.get(foreignKey.parentTableName);
  if (table == null) throw new Error(`BuildAssociationDefinitions: could not find table '${foreignKey.parentTableName}'.`);

  return table.columns.filter(c => foreignKey.parentTableColumnNames.includes(c.name)).map(c => buildApiProperty(c));
}

function cardinalityFrom(foreignKey: ForeignKey): AssociationDefinitionCardinality {
  if (foreignKey.sourceReference.isSubclassRelationship) return 'OneToOneInheritance';
  if (foreignKey.sourceReference.isExtensionRelationship) return 'OneToOneExtension';
  if (foreignKey.sourceReference.isOptionalCollection) return 'OneToZeroOrMore';
  if (foreignKey.sourceReference.isRequiredCollection) return 'OneToOneOrMore';
  return 'OneToOne';
}

// Association definitions are the ODS foreign key definitions for a namespace
export function buildAssociationDefinitions(tables: Map<string, Table>): Array<AssociationDefinition> {
  const result: Array<AssociationDefinition> = [];
  tables.values.forEach((table: Table) => {
    table.foreignKeys.forEach((foreignKey: ForeignKey) => {
      result.push({
        fullName: {
          schema: table.schema,
          name: foreignKey.name,
        },
        cardinality: cardinalityFrom(foreignKey),
        primaryEntityFullName: {
          schema: foreignKey.foreignTableSchema,
          name: foreignKey.foreignTableName,
        },
        primaryEntityProperties: getPrimaryEntityProperties(foreignKey, tables),
        secondaryEntityFullName: {
          schema: foreignKey.parentTableSchema,
          name: foreignKey.parentTableName,
        },
        secondaryEntityProperties: getSecondaryEntityProperties(foreignKey, tables),
        isIdentifying: foreignKey.sourceReference.isPartOfIdentity,
        isRequired: foreignKey.sourceReference.isRequired,
      });
    });
  });

  return result;
}
