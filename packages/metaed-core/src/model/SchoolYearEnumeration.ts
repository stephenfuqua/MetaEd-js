import { ModelBase } from './ModelBase';
import { Enumeration } from './Enumeration';
import { newEnumeration } from './Enumeration';

/**
 *
 */
export type SchoolYearEnumeration = Enumeration;

/**
 *
 */
export function newSchoolYearEnumeration(): SchoolYearEnumeration {
  return {
    ...newEnumeration(),
    type: 'schoolYearEnumeration',
    typeHumanizedName: 'School Year Enumeration',
  };
}

/**
 *
 */
export const asSchoolYearEnumeration = (x: ModelBase): SchoolYearEnumeration => x as SchoolYearEnumeration;
