import { ForeignKey, Table, EnumerationRow, SchoolYearEnumerationRow } from 'metaed-plugin-edfi-ods-relational';

export interface SchemaContainer {
  tables: Table[];
  foreignKeys: ForeignKey[];
  enumerationRows: EnumerationRow[];
  schoolYearEnumerationRows: SchoolYearEnumerationRow[];
}

export function newSchemaContainer(): SchemaContainer {
  return {
    tables: [],
    foreignKeys: [],
    enumerationRows: [],
    schoolYearEnumerationRows: [],
  };
}
