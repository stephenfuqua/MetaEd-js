import { ForeignKey } from './ForeignKey';
import { Table } from './Table';
import { EnumerationRow } from './EnumerationRow';
import { SchoolYearEnumerationRow } from './SchoolYearEnumerationRow';

export interface SchemaContainer {
  tables: Array<Table>;
  foreignKeys: Array<ForeignKey>;
  enumerationRows: Array<EnumerationRow>;
  schoolYearEnumerationRows: Array<SchoolYearEnumerationRow>;
}

export function newSchemaContainer(): SchemaContainer {
  return {
    tables: [],
    foreignKeys: [],
    enumerationRows: [],
    schoolYearEnumerationRows: [],
  };
}
