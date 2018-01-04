/** @babel */
// @flow

type Range = Array<Array<number>>;

export type LinterMessage = {
  type: string,
  text?: string,
  html?: string,
  filePath?: string,
  // ^ MUST be an absolute path (relative paths are not supported)
  range?: Range,
  severity?: 'error' | 'warning' | 'info',
};
