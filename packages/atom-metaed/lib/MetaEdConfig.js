/** @babel */
// @flow

import path from 'path';
import fs from 'fs-extra';
import { getCoreMetaEdSourceDirectory } from './Settings';

export default class MetaEdConfig {
  _coreMetaEdSourceDirectory: string = '';

  constructor() {
    this.updateCoreMetaEdSourceDirectory();
  }

  updateCoreMetaEdSourceDirectory() {
    const newCoreMetaEdSourceDirectory = getCoreMetaEdSourceDirectory();
    if (!fs.existsSync(newCoreMetaEdSourceDirectory)) {
      return;
    }
    if (!this._coreMetaEdSourceDirectory) {
      this._coreMetaEdSourceDirectory = newCoreMetaEdSourceDirectory;
    }
    const projectPaths = atom.project
      .getPaths()
      .filter(projectPath => path.normalize(projectPath) !== path.normalize(this._coreMetaEdSourceDirectory));
    projectPaths.unshift(newCoreMetaEdSourceDirectory);
    atom.project.setPaths(projectPaths);
    this._coreMetaEdSourceDirectory = newCoreMetaEdSourceDirectory;
  }
}
