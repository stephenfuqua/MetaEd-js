// @flow
export type EnumerationItemDefinition = {
  elementGroup: string,
  enumeration: string,
  codeValue: string,
  shortDescription: string,
  description: string,
};

export const newEnumerationItemDefinition = (): EnumerationItemDefinition => ({
  elementGroup: '',
  enumeration: '',
  codeValue: '',
  shortDescription: '',
  description: '',
});
