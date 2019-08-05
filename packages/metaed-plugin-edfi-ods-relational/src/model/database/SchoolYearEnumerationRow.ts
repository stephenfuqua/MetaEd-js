import deepFreeze from 'deep-freeze';
import { newEnumerationRowBase } from './EnumerationRowBase';
import { EnumerationRowBase } from './EnumerationRowBase';

export interface SchoolYearEnumerationRow extends EnumerationRowBase {
  schoolYear: number;
  schoolYearDescription: string;
}

export function newSchoolYearEnumerationRow(): SchoolYearEnumerationRow {
  return Object.assign({}, newEnumerationRowBase(), {
    type: 'schoolYearEnumerationRow',
    schoolYear: 0,
    schoolYearDescription: '',
  });
}

export const NoSchoolYearEnumerationRow: SchoolYearEnumerationRow = deepFreeze(
  Object.assign(newSchoolYearEnumerationRow(), {
    name: 'NoSchoolYearEnumerationRow',
  }),
);
