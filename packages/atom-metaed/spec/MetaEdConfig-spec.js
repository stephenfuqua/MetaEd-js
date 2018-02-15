/** @babel */
// @flow

import fs from 'fs-extra';
import * as Settings from '../lib/Settings';
import MetaEdConfig from '../lib/MetaEdConfig';

describe('MetaEdConfig', () => {
  describe('when the core metaEd source directory is updated', () => {
    let metaEdConfig;

    beforeEach(() => {
      metaEdConfig = new MetaEdConfig();
    });

    it('ignores the change if the directory does not exist', () => {
      spyOn(fs, 'existsSync').andReturn(false);
      spyOn(Settings, 'getCoreMetaEdSourceDirectory').andReturn('');
      metaEdConfig.updateCoreMetaEdSourceDirectory();

      expect(metaEdConfig._coreMetaEdSourceDirectory).toEqual('');
    });

    it('adds the source directory as a project', () => {
      spyOn(fs, 'existsSync').andReturn(true);
      spyOn(atom.project, 'getPaths').andReturn([]);
      spyOn(atom.project, 'setPaths');
      const newDirectory = 'newDirectory';
      spyOn(Settings, 'getCoreMetaEdSourceDirectory').andReturn(newDirectory);
      metaEdConfig.updateCoreMetaEdSourceDirectory();

      expect(atom.project.setPaths).toHaveBeenCalledWith([newDirectory]);
      expect(metaEdConfig._coreMetaEdSourceDirectory).toEqual(newDirectory);
    });

    it('adds the source directory first if projects already exist', () => {
      const newDirectory = 'newDirectory';
      const existingProject = 'existingProject';
      spyOn(fs, 'existsSync').andReturn(true);
      spyOn(atom.project, 'getPaths').andReturn([existingProject]);
      spyOn(atom.project, 'setPaths');
      spyOn(Settings, 'getCoreMetaEdSourceDirectory').andReturn(newDirectory);
      metaEdConfig.updateCoreMetaEdSourceDirectory();

      expect(atom.project.setPaths).toHaveBeenCalledWith([newDirectory, existingProject]);
      expect(metaEdConfig._coreMetaEdSourceDirectory).toEqual(newDirectory);
    });

    it('removes the previous source directory if it exists', () => {
      const newDirectory = 'newDirectory';
      const existingProject = 'existingProject';
      spyOn(fs, 'existsSync').andReturn(true);
      spyOn(atom.project, 'getPaths').andReturn([existingProject]);
      spyOn(atom.project, 'setPaths');
      spyOn(Settings, 'getCoreMetaEdSourceDirectory').andReturn(newDirectory);
      metaEdConfig._coreMetaEdSourceDirectory = existingProject;
      metaEdConfig.updateCoreMetaEdSourceDirectory();

      expect(atom.project.setPaths).toHaveBeenCalledWith([newDirectory]);
      expect(metaEdConfig._coreMetaEdSourceDirectory).toEqual(newDirectory);
    });
  });
});
