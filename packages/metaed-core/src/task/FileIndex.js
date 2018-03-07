// @flow
import R from 'ramda';
import type { MetaEdFile } from './MetaEdFile';

export type FileAndLineNumber = {
  file: MetaEdFile,
  lineNumber: number,
};

export type FileMap = {
  fullPath: string,
  lineNumber: number,
};

export type FileIndex = {
  fileAndLineNumbersSorted: FileAndLineNumber[],
  totalLineCount: number,
};

export function getAllContents(fileIndex: ?FileIndex): string {
  if (fileIndex == null) return '';
  return fileIndex.fileAndLineNumbersSorted.map(x => x.file.contents).join('');
}

export function getFilenameAndLineNumber(fileIndex: FileIndex, concatenatedLineNumber: number): FileMap {
  const matchingFileAndLineNumber = R.findLast(
    x => x.lineNumber <= concatenatedLineNumber,
    fileIndex.fileAndLineNumbersSorted,
  );

  if (matchingFileAndLineNumber == null) {
    return { fullPath: 'Error/matchingFileAndLineNumber/null', lineNumber: -1 };
  }

  const lineNumber = concatenatedLineNumber - matchingFileAndLineNumber.lineNumber + 1;
  return { fullPath: matchingFileAndLineNumber.file.fullPath, lineNumber };
}

export function createFileIndex(metaEdFiles: MetaEdFile[]): FileIndex {
  const fileAndLineNumbers: FileAndLineNumber[] = [];
  let lineNumber = 1;
  metaEdFiles.forEach(file => {
    fileAndLineNumbers.push({ file, lineNumber });
    lineNumber += file.lineCount;
  });

  return {
    fileAndLineNumbersSorted: R.sortBy(R.prop('lineNumber'))(fileAndLineNumbers),
    totalLineCount: lineNumber,
  };
}
