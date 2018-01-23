// @flow

export type EntityIdentifier = {
  identifierName: string,
  identifyingPropertyNames: Array<string>,
  isPrimary: boolean,
  isUpdatable: boolean,
};
