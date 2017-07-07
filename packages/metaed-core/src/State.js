// @flow
import type { InputDirectory } from './task/FileSystemFilenameLoader';
import type { FileSet } from './task/MetaEdFile';
import type { FileIndex } from './task/FileIndex';
import type { MetaEdGrammar } from './grammar/gen/MetaEdGrammar';
import type { ValidationFailure } from './validator/ValidationFailure';
import type { MetaEdEnvironment } from './MetaEdEnvironment';
import { newMetaEdEnvironment } from './MetaEdEnvironment';
import type { PluginManifest } from './plugin/PluginTypes';

export type State = {
  // the collection of error messages from syntax and semantic validation, and other processes
  validationFailure: Array<ValidationFailure>,

  // the specified directories to load .metaed files from
  inputDirectories: ?InputDirectory[],

  // filepaths to exclude from loading, usually used to allow upstream tasks to provide their own versions in a FileSet
  // e.g. files that are open and unsaved in an editor
  filepathsToExclude: Set<string>,

  // the set of files whose contents have been loaded
  loadedFileSet: Array<FileSet>,

  // the line number indexing for the concatenation of all .metaed files
  fileIndex: ?FileIndex,

  // the ANTLR parse tree of the concatenated .metaed files
  parseTree: ?MetaEdGrammar,

  // the MetaEd environment
  metaEd: MetaEdEnvironment,

  // the directory to scan for plugins
  pluginScanDirectory: ?string,

  // plugins
  pluginManifest: Array<PluginManifest>,
};

export const newState: () => State = () =>
  ({
    validationFailure: [],
    inputDirectories: [],
    filepathsToExclude: new Set(),
    loadedFileSet: [],
    fileIndex: null,
    parseTree: null,
    metaEd: newMetaEdEnvironment(),
    pluginScanDirectory: null,
    pluginManifest: [],
  });
