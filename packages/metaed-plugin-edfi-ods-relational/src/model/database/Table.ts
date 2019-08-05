import deepFreeze from 'deep-freeze';
import R from 'ramda';
import winston from 'winston';
import { orderByProp, NoTopLevelEntity, NoNamespace } from 'metaed-core';
import { TopLevelEntity, EntityProperty, Namespace } from 'metaed-core';
import { columnConstraintMerge, cloneColumn } from './Column';
import { addColumnNamePair, newForeignKey, foreignKeySourceReferenceFrom } from './ForeignKey';
import { newColumnNamePair } from './ColumnNamePair';
import { Column } from './Column';
import { ColumnTransform } from './ColumnTransform';
import { ForeignKey, ForeignKeySourceReference } from './ForeignKey';
import { ForeignKeyStrategy } from './ForeignKeyStrategy';

winston.configure({ transports: [new winston.transports.Console()], format: winston.format.cli() });

const maxSqlServerIdentifierLength = R.take(128);

export interface Table {
  name: string;
  nameComponents: string[];
  namespace: Namespace;
  schema: string;
  type: string;
  description: string;
  sqlEscapedDescription: string;
  typeHumanizedName: string;
  typeHumanizedNameWithIndefiniteArticle: string;
  includeCreateDateColumn: boolean;
  includeLastModifiedDateAndIdColumn: boolean;
  isRequiredCollectionTable: boolean;
  isTypeTable: boolean;
  hasAlternateKeys: boolean;
  columns: Column[];
  primaryKeys: Column[];
  foreignKeys: ForeignKey[];
  alternateKeys: Column[];
  uniqueIndexes: Column[];
  // not all tables have a parentEntity
  parentEntity: TopLevelEntity;
  isEntityMainTable: boolean;
  isAggregateRootTable: boolean;
  hideFromApiMetadata: boolean;
  hasDiscriminatorColumn: boolean;
  isDeprecated: boolean;
  deprecationReasons: string[];
}

export function newTable(): Table {
  return {
    name: '',
    nameComponents: [],
    namespace: NoNamespace,
    schema: '',
    type: 'table',
    description: '',
    sqlEscapedDescription: '',
    typeHumanizedName: 'Table',
    typeHumanizedNameWithIndefiniteArticle: 'A Table',
    includeCreateDateColumn: false,
    includeLastModifiedDateAndIdColumn: false,
    isRequiredCollectionTable: false,
    isTypeTable: false,
    hasAlternateKeys: false,
    columns: [],
    primaryKeys: [],
    foreignKeys: [],
    alternateKeys: [],
    uniqueIndexes: [],
    parentEntity: NoTopLevelEntity,
    isEntityMainTable: false,
    isAggregateRootTable: false,
    hideFromApiMetadata: false,
    hasDiscriminatorColumn: false,
    isDeprecated: false,
    deprecationReasons: [],
  };
}

export const NoTable: Table = deepFreeze(
  Object.assign(newTable(), {
    name: 'NoTable',
  }),
);

export function getColumnWithStrongestConstraint(
  table: Table,
  column: Column,
  constraintStrategy: (existing: Column, received: Column) => Column,
): Column {
  const existingColumn = table.columns.find(x => x.name === column.name);
  if (existingColumn == null) return column;

  winston.info(`  Duplicate column ${column.name} on table ${table.name}.`);
  table.columns = R.reject(x => x.name === column.name)(table.columns);
  return constraintStrategy(existingColumn, column);
}

export function hasAlternateKeys(table: Table): boolean {
  return table.columns.some(x => x.isPartOfAlternateKey);
}

// AddColumnStrongestConstraint()
export function addColumn(table: Table, column: Column): void {
  const clone: Column = getColumnWithStrongestConstraint(table, column, columnConstraintMerge);
  table.columns.push(clone);
}

export function addColumns(table: Table, columns: Column[], strategy: ColumnTransform): void {
  strategy.transform(columns).forEach(column => addColumn(table, column));
}

export function getAlternateKeys(table: Table): Column[] {
  return orderByProp('name')(table.columns.filter(x => x.isPartOfAlternateKey));
}

export function getPrimaryKeys(table: Table): Column[] {
  return orderByProp('name')(table.columns.filter(x => x.isPartOfPrimaryKey));
}

export function getNonPrimaryKeys(table: Table): Column[] {
  return table.columns.filter(x => !x.isPartOfPrimaryKey);
}

export function getUniqueIndexes(table: Table): Column[] {
  return orderByProp('name')(table.columns.filter(x => x.isUniqueIndex));
}

export function getAllColumns(table: Table): Column[] {
  return [...getPrimaryKeys(table), ...getNonPrimaryKeys(table)];
}

export function getColumnView(table: Table): Column[] {
  return getAllColumns(table).map(x => cloneColumn(x));
}

export function getForeignKeys(table: Table): ForeignKey[] {
  return orderByProp('name')(table.foreignKeys);
}

export function isForeignKey(table: Table, column: Column): boolean {
  return table.foreignKeys.some(fk => fk.columnNames.some(x => x.parentTableColumnName === column.name));
}

export function getForeignKeyName(foreignKey: ForeignKey): string {
  return maxSqlServerIdentifierLength(
    `FK_${foreignKey.parentTableName}_${foreignKey.foreignTableName}${foreignKey.foreignKeyNameSuffix}`,
  );
}

function getForeignKeyNameSuffix(table: Table, foreignKey: ForeignKey): string {
  if (table.foreignKeys.some((fk: ForeignKey) => getForeignKeyName(fk) === getForeignKeyName(foreignKey))) {
    return R.compose(
      R.toString,
      R.inc,
      R.when(R.isNil, () => 0),
      R.head,
      R.sort((a, b) => b - a),
      R.map(x => x.foreignKeyNameSuffix),
      R.filter(x => x.foreignTableName === foreignKey.foreignTableName),
    )(table.foreignKeys);
  }
  return '';
}

export function addForeignKey(table: Table, foreignKey: ForeignKey): void {
  foreignKey.parentTable = table;
  foreignKey.parentTableName = table.name;
  foreignKey.parentTableSchema = table.schema;
  foreignKey.foreignKeyNameSuffix = getForeignKeyNameSuffix(table, foreignKey);
  table.foreignKeys.push(foreignKey);
}

function createForeignKeyInternal(
  sourceReference: ForeignKeySourceReference,
  foreignKeyColumns: Column[],
  foreignTableSchema: string,
  foreignTableNamespace: Namespace,
  foreignTableName: string,
  strategy: ForeignKeyStrategy,
): ForeignKey {
  const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
    foreignTableSchema,
    foreignTableName,
    foreignTableNamespace,
    withDeleteCascade: strategy.hasDeleteCascade(),
    withUpdateCascade: strategy.hasUpdateCascade(),
    sourceReference,
  });
  foreignKeyColumns.forEach(column =>
    addColumnNamePair(
      foreignKey,
      Object.assign(newColumnNamePair(), {
        parentTableColumnName: strategy.parentColumnName(column),
        foreignTableColumnName: strategy.foreignColumnName(column),
      }),
    ),
  );

  return foreignKey;
}

export function createForeignKey(
  sourceProperty: EntityProperty,
  foreignKeyColumns: Column[],
  foreignTableSchema: string,
  foreignTableNamespace: Namespace,
  foreignTableName: string,
  strategy: ForeignKeyStrategy,
): ForeignKey {
  return createForeignKeyInternal(
    foreignKeySourceReferenceFrom(sourceProperty),
    foreignKeyColumns,
    foreignTableSchema,
    foreignTableNamespace,
    foreignTableName,
    strategy,
  );
}

export function createForeignKeyUsingSourceReference(
  sourceReference: ForeignKeySourceReference,
  foreignKeyColumns: Column[],
  foreignTableSchema: string,
  foreignTableNamespace: Namespace,
  foreignTableName: string,
  strategy: ForeignKeyStrategy,
): ForeignKey {
  return createForeignKeyInternal(
    sourceReference,
    foreignKeyColumns,
    foreignTableSchema,
    foreignTableNamespace,
    foreignTableName,
    strategy,
  );
}
