// @flow
import { defaultTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';
import { Enumeration, EnumerationSourceMap } from './Enumeration';

export class SchoolYearEnumeration extends Enumeration {}

export function schoolYearEnumerationFactory(): SchoolYearEnumeration {
  return Object.assign(new SchoolYearEnumeration(), defaultTopLevelEntity(), {
    type: 'schoolYearEnumeration',
    typeHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export const asSchoolYearEnumeration = (x: ModelBase): SchoolYearEnumeration => ((x: any): SchoolYearEnumeration);
