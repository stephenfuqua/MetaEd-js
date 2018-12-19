import { EntityProperty } from 'metaed-core';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { Table } from '../../model/database/Table';
import { TableStrategy } from '../../model/database/TableStrategy';

export type TableBuilder = {
  buildTables(
    property: EntityProperty,
    tableStrategy: TableStrategy,
    primaryKeys: Array<Column>,
    buildStrategy: BuildStrategy,
    tables: Array<Table>,
    parentIsRequired: boolean | null,
  ): void;
};

export function nullTableBuilder() {
  return {
    buildTables: (
      // @ts-ignore - unused parameter name
      property: EntityProperty,
      // @ts-ignore - unused parameter name
      tableStrategy: TableStrategy,
      // @ts-ignore - unused parameter name
      primaryKeys: Array<Column>,
      // @ts-ignore - unused parameter name
      buildStrategy: BuildStrategy,
      // @ts-ignore - unused parameter name
      tables: Array<Table>,
      // @ts-ignore - unused parameter name
      parentIsRequired: boolean | null,
    ) => {},
  };
}
