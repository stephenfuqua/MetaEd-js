import { ForeignKey } from './ForeignKey';
import { Table } from './Table';
import { EnumerationRow } from './EnumerationRow';
import { SchoolYearEnumerationRow } from './SchoolYearEnumerationRow';

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
