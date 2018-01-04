// @flow
import path from 'path';

export type MetaEdFile = {
  contents: string,
  lineCount: number,
  directoryName: string,
  filename: string,
  fullName: string,
};

export type FileSet = {
  namespace: string,
  projectExtension: string,
  isExtension: boolean,
  files: MetaEdFile[],
};

export function createMetaEdFile(directoryName: string, filename: string, originalContents: string): MetaEdFile {
  let contents = originalContents;
  if (contents == null) contents = '';

  if (!contents.endsWith('\r\n') && !contents.endsWith('\n')) {
    contents += '\r\n';
  }

  const lineCount = contents.split(/\r\n|\r|\n/).length - 1;

  return {
    contents,
    lineCount,
    directoryName,
    filename,
    fullName: directoryName ? path.join(directoryName, filename) : filename,
  };
}
