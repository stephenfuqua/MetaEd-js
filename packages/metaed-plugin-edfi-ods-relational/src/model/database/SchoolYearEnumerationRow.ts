import deepFreeze from 'deep-freeze';
import { newEnumerationRowBase } from './EnumerationRowBase';
import { EnumerationRowBase } from './EnumerationRowBase';

export interface SchoolYearEnumerationRow extends EnumerationRowBase {
  schoolYear: number;
  schoolYearDescription: string;
}

export function newSchoolYearEnumerationRow(): SchoolYearEnumerationRow {
  return {
    ...newEnumerationRowBase(),
    type: 'schoolYearEnumerationRow',
    schoolYear: 0,
    schoolYearDescription: '',
  };
}

export const NoSchoolYearEnumerationRow: SchoolYearEnumerationRow = deepFreeze({
  ...newSchoolYearEnumerationRow(),
  name: 'NoSchoolYearEnumerationRow',
});
