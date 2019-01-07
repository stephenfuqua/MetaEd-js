// @flow
export type EnumerationDefinition = {
  elementGroup: string,
  enumeration: string,
  definition: string,
};

export const newEnumerationDefinition = (): EnumerationDefinition => ({
  elementGroup: '',
  enumeration: '',
  definition: '',
});
