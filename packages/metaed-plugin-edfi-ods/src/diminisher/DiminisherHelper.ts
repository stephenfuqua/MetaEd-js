import R from 'ramda';
import { getForeignKeys } from '../model/database/Table';
import { Column } from '../model/database/Column';
import { ColumnNamePair } from '../model/database/ColumnNamePair';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

export function renameForeignKeyColumn(
  table: Table,
  foreignTableName: string,
  foreignColumnName: string,
  newForeignColumnName: string,
  parentColumnName: string,
  newParentColumnName: string,
): void {
  const foreignKey: ForeignKey | undefined = getForeignKeys(table).find(
    (fk: ForeignKey) => fk.foreignTableName === foreignTableName,
  );
  if (foreignKey == null) return;

  const columnNamePair: ColumnNamePair | undefined = foreignKey.columnNames.find(
    (x: ColumnNamePair) => x.foreignTableColumnName === foreignColumnName && x.parentTableColumnName === parentColumnName,
  );
  if (columnNamePair == null) return;

  columnNamePair.foreignTableColumnName = newForeignColumnName;
  columnNamePair.parentTableColumnName = newParentColumnName;
}

export function renameColumn(table: Table, columnName: string, newColumnName: string): void {
  const column: Column | undefined = table.columns.find((x: Column) => x.name === columnName);
  if (column == null) return;

  column.name = newColumnName;
}

export function removeColumn(table: Table, columnName: string): void {
  table.columns = R.reject((column: Column) => column.name === columnName)(table.columns);
}
