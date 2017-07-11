// @flow
import { newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';
import { Enumeration, EnumerationSourceMap } from './Enumeration';

export class SchoolYearEnumeration extends Enumeration {}

export function newSchoolYearEnumeration(): SchoolYearEnumeration {
  return Object.assign(new SchoolYearEnumeration(), newTopLevelEntity(), {
    type: 'schoolYearEnumeration',
    typeHumanizedName: 'School Year Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export const asSchoolYearEnumeration = (x: ModelBase): SchoolYearEnumeration => ((x: any): SchoolYearEnumeration);
