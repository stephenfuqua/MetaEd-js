// @flow
import type { MetaEdEnvironment } from 'metaed-core';
import { initialize as initializeUnifiedPlugin } from 'metaed-plugin-edfi-unified';
import { initialize as initializeOdsPlugin } from '../../../index';
import { generate as odsGenerate } from '../../../src/generator/OdsGenerator';
import { generate as schemaGenerate } from '../../../src/generator/SchemaGenerator';
import { createDatabaseIfNotExists, dropDatabaseIfExists } from './DatabaseUtility';
import { disconnectAll, executeGeneratedSql, rollbackAndBeginTransaction, disconnect } from './DatabaseConnection';
import type { DatabaseColumn } from './DatabaseColumn';
import type { DatabaseForeignKey } from './DatabaseForeignKey';
import type { DatabaseIndex } from './DatabaseIndex';
import type { DatabaseTable } from './DatabaseTable';

export const testDatabaseName: string = 'MetaEd_Ods_Integration_Tests';
export const coreNamespace: string = 'edfi';
export const extensionNamespace: string = 'extension';
export const projectExtension: string = 'EXTENSION';

beforeAll(async () => {
  await dropDatabaseIfExists(testDatabaseName);
  await createDatabaseIfNotExists(testDatabaseName);
  await disconnect('master');
});

afterAll(async () => {
  await dropDatabaseIfExists(testDatabaseName);
  await disconnectAll();
});

export async function testTearDown(databaseName: string = testDatabaseName): Promise<*> {
  await rollbackAndBeginTransaction(databaseName);
}

export function table(schema: string, name: string): DatabaseTable {
  return {
    schema,
    name,
  };
}

export function column(parentTableSchema: string, parentTableName: string, name: string): DatabaseColumn {
  return {
    parentTableSchema,
    parentTableName,
    name,
  };
}

export function foreignKey(
  parentTableColumn: Array<DatabaseColumn>,
  foreignTableColumn: Array<DatabaseColumn>,
): DatabaseForeignKey {
  return {
    parentTable: table(parentTableColumn[0].parentTableSchema, parentTableColumn[0].parentTableName),
    parentColumns: parentTableColumn.map((dbColumn: DatabaseColumn) => dbColumn.name),
    foreignTable: table(foreignTableColumn[0].parentTableSchema, foreignTableColumn[0].parentTableName),
    foreignColumns: foreignTableColumn.map((dbColumn: DatabaseColumn) => dbColumn.name),
  };
}

export function index(primaryColumn: DatabaseColumn): DatabaseIndex {
  return {
    databaseTable: table(primaryColumn.parentTableSchema, primaryColumn.parentTableName),
    columns: [primaryColumn.name],
  };
}

// as found in DATA_TYPE column of INFORMATION_SCHEMA.COLUMNS system view
export const columnDataTypes = {
  bit: 'bit',
  date: 'date',
  dateTime: 'datetime',
  decimal: 'decimal',
  integer: 'int',
  money: 'money',
  nvarchar: 'nvarchar',
  smallint: 'smallint',
  time: 'time',
  uniqueIdentifier: 'uniqueidentifier',
};

export async function enhanceGenerateAndExecuteSql(
  metaEd: MetaEdEnvironment,
  databaseName: string = testDatabaseName,
): Promise<*> {
  initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(metaEd));
  initializeOdsPlugin().enhancer.forEach(enhance => enhance(metaEd));

  metaEd.dataStandardVersion = '2.0.0';
  const sql: Array<string> = [];
  (await schemaGenerate(metaEd)).generatedOutput.forEach(result => sql.push(result.resultString));
  (await odsGenerate(metaEd)).generatedOutput.forEach(result => sql.push(result.resultString));
  await executeGeneratedSql(sql.join(''), databaseName);
}
