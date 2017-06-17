// @flow
import { defaultTopLevelEntity } from './TopLevelEntity';
import { Enumeration, EnumerationSourceMap } from './Enumeration';

export class SchoolYearEnumeration extends Enumeration {}

export function schoolYearEnumerationFactory(): SchoolYearEnumeration {
  return Object.assign(new SchoolYearEnumeration(), defaultTopLevelEntity(), {
    type: 'schoolYearEnumeration',
    typeGroupHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}
