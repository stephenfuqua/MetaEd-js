import deepFreeze from 'deep-freeze';
import { newEnumerationRowBase } from './EnumerationRowBase';
import { EnumerationRowBase } from './EnumerationRowBase';

export interface EnumerationRow extends EnumerationRowBase {
  codeValue: string;
  description: string;
  shortDescription: string;
}

export function newEnumerationRow(): EnumerationRow {
  return Object.assign({}, newEnumerationRowBase(), {
    codeValue: '',
    description: '',
    shortDescription: '',
  });
}

export const NoEnumerationRow: EnumerationRow = deepFreeze(
  Object.assign(newEnumerationRow(), {
    name: 'NoEnumerationRow',
  }),
);
