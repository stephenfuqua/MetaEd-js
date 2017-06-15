// @flow

export type ValidationMessage = {
  validatorName: string,
  message: string,
  filename: string,
  lineNumber: number,
  characterPosition: number,
  concatenatedLineNumber: number,
  tokenText: string
}
