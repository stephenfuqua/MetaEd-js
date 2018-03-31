// @flow

export type EducationOrganizationReference = {
  name: string,
  identityPropertyName: string,
}

export function newEducationOrganizationReference(): EducationOrganizationReference {
  return {
    name: '',
    identityPropertyName: '',
  };
}
