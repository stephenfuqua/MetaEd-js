import { Namespace } from 'metaed-core';
import { Table } from './Table';

export class TableStrategy {
  table: Table;

  schema: string;

  schemaNamespace: Namespace;

  name: string;

  constructor(table: Table) {
    this.table = table;
    this.schema = table.schema;
    this.schemaNamespace = table.namespace;
    this.name = table.name;
  }

  static default(table: Table) {
    return new TableStrategy(table);
  }

  static extension(table: Table, baseSchemaName: string, baseSchemaNamespace: Namespace, baseTableName: string) {
    // eslint-disable-next-line no-use-before-define
    return new ExtensionTableStrategy(table, baseSchemaName, baseSchemaNamespace, baseTableName);
  }
}

class ExtensionTableStrategy extends TableStrategy {
  constructor(table: Table, baseSchemaName: string, baseSchemaNamespace: Namespace, baseTableName: string) {
    super(table);
    this.schema = baseSchemaName;
    this.schemaNamespace = baseSchemaNamespace;
    this.name = baseTableName;
  }
}
