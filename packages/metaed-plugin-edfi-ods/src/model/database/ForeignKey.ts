import R from 'ramda';
import winston from 'winston';
import { orderByProp, asCommonProperty, NoNamespace } from 'metaed-core';
import { EntityProperty, PropertyType, Namespace } from 'metaed-core';
import { ReferencePropertyEdfiOds } from '../property/ReferenceProperty';
import { NoTable, getPrimaryKeys } from './Table';
import { ColumnNamePair } from './ColumnNamePair';
import { Table } from './Table';
import { Column } from './Column';

winston.configure({ transports: [new winston.transports.Console()], format: winston.format.cli() });

export interface ForeignKeySourceReference {
  isPartOfIdentity: boolean;
  isRequired: boolean;
  isOptional: boolean;
  isRequiredCollection: boolean;
  isOptionalCollection: boolean;
  isSubclassRelationship: boolean;
  isExtensionRelationship: boolean;
  isSyntheticRelationship: boolean;
  propertyType: PropertyType;
}

export interface ForeignKey {
  name: string;
  columnNames: ColumnNamePair[];
  parentTable: Table;
  parentTableName: string;
  parentTableSchema: string;
  foreignTableName: string;
  foreignTableSchema: string;
  foreignTableNamespace: Namespace;
  foreignKeyNameSuffix: string;
  parentTableColumnNames: string[];
  foreignTableColumnNames: string[];
  withDeleteCascade: boolean;
  withUpdateCascade: boolean;
  withReverseForeignKeyIndex: boolean;
  sourceReference: ForeignKeySourceReference;
}

export function newForeignKeySourceReference(): ForeignKeySourceReference {
  return {
    isPartOfIdentity: false,
    isRequired: false,
    isOptional: false,
    isRequiredCollection: false,
    isOptionalCollection: false,
    isSubclassRelationship: false,
    isExtensionRelationship: false,
    isSyntheticRelationship: false,
    propertyType: 'unknown',
  };
}

const referenceProperty: PropertyType[] = ['choice', 'common', 'descriptor', 'association', 'domainEntity'];
const isReferenceProperty = (property: EntityProperty): boolean => referenceProperty.includes(property.type);

function isSubclassRelationship(property: EntityProperty): boolean {
  if (isReferenceProperty(property)) {
    return !!(property.data.edfiOds as ReferencePropertyEdfiOds).odsIsReferenceToSuperclass;
  }
  return false;
}

function isExtensionRelationship(property: EntityProperty): boolean {
  if (property.type === 'common' && asCommonProperty(property).isExtensionOverride) return true;
  if (isReferenceProperty(property)) {
    return !!(property.data.edfiOds as ReferencePropertyEdfiOds).odsIsReferenceToExtensionParent;
  }
  return false;
}

export function foreignKeySourceReferenceFrom(property: EntityProperty): ForeignKeySourceReference {
  return {
    isPartOfIdentity: property.isPartOfIdentity,
    isRequired: property.isPartOfIdentity || property.isRequired,
    isOptional: property.isOptional,
    isRequiredCollection: property.isRequiredCollection,
    isOptionalCollection: property.isOptionalCollection,
    isSubclassRelationship: isSubclassRelationship(property),
    isExtensionRelationship: isExtensionRelationship(property),
    isSyntheticRelationship: false,
    propertyType: property.type,
  };
}

export function newForeignKey(): ForeignKey {
  return {
    name: '',
    columnNames: [],
    parentTable: NoTable,
    parentTableName: '',
    parentTableSchema: '',
    foreignTableName: '',
    foreignTableSchema: '',
    foreignTableNamespace: NoNamespace,
    foreignKeyNameSuffix: '',
    parentTableColumnNames: [],
    foreignTableColumnNames: [],
    withDeleteCascade: false,
    withUpdateCascade: false,
    withReverseForeignKeyIndex: false,
    sourceReference: newForeignKeySourceReference(),
  };
}

export function getOrderedColumnNamePairs(foreignKey: ForeignKey, foreignTable: Table | null = null): ColumnNamePair[] {
  if (foreignTable == null) {
    return orderByProp('foreignTableColumnName')(foreignKey.columnNames);
  }

  const primaryKeyOrder: string[] = (foreignTable.primaryKeys.length === 0
    ? getPrimaryKeys(foreignTable)
    : foreignTable.primaryKeys
  ).map((pk: Column) => pk.name);
  const foreignKeyColumnPairLookup: { [foreignKeyName: string]: ColumnNamePair } = R.groupBy(
    R.prop('foreignTableColumnName'),
    foreignKey.columnNames,
  );
  // eslint-disable-next-line no-underscore-dangle
  const foreignKeyColumnPairFor: (foreignKeyName: string) => ColumnNamePair = R.prop(R.__, foreignKeyColumnPairLookup);

  return R.chain((pkName: string) => foreignKeyColumnPairFor(pkName))(primaryKeyOrder);
}

export function getParentTableColumnNames(foreignKey: ForeignKey, foreignTable: Table | null = null): string[] {
  return getOrderedColumnNamePairs(foreignKey, foreignTable).map((x: ColumnNamePair) => x.parentTableColumnName);
}

export function getForeignTableColumnNames(foreignKey: ForeignKey, foreignTable: Table | null = null): string[] {
  return getOrderedColumnNamePairs(foreignKey, foreignTable).map((x: ColumnNamePair) => x.foreignTableColumnName);
}

export function addColumnNamePair(foreignKey: ForeignKey, columnNamePair: ColumnNamePair): void {
  const existingPair = foreignKey.columnNames.find(
    (x: ColumnNamePair) =>
      x.parentTableColumnName === columnNamePair.parentTableColumnName &&
      x.foreignTableColumnName === columnNamePair.foreignTableColumnName,
  );

  if (existingPair == null) {
    foreignKey.columnNames.push(columnNamePair);
  } else {
    winston.info(
      `  Attempt to add duplicate column name pair: [${columnNamePair.parentTableColumnName}, ${
        columnNamePair.foreignTableColumnName
      }] on foreign key referencing ${foreignKey.foreignTableSchema}.${foreignKey.foreignTableName} failed.`,
    );
  }
}

export function addColumnNamePairs(foreignKey: ForeignKey, columnNamePairs: ColumnNamePair[]): void {
  columnNamePairs.forEach((columnNamePair: ColumnNamePair) => addColumnNamePair(foreignKey, columnNamePair));
}
