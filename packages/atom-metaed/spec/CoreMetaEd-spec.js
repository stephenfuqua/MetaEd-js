/** @babel */
// @flow

import fs from 'fs-extra';
import path from 'path';
import * as Settings from '../lib/Settings';
import * as coreMetaEd from '../lib/CoreMetaEd';
import { metaEdProjectFileTemplate } from '../lib/templates/TemplateEngine';
import type MetaEdLog from '../lib//MetaEdLog';
import type MetaEdConfig from '../lib/MetaEdConfig';

const coreMetaEdSourceDirectory = 'coreMetaEdSourceDirectory';

describe('CoreMetaEd', () => {
  let testMetaEdLog: MetaEdLog;
  let testMetaEdConfig: MetaEdConfig;

  beforeEach(() => {
    // $FlowIgnore - jasmine spy
    testMetaEdLog = jasmine.createSpyObj('MetaEdLog', ['addMessage', 'clear']);
    // $FlowIgnore - jasmine spy
    testMetaEdConfig = jasmine.createSpyObj('MetaEdConfig', ['updateCoreMetaEdSourceDirectory']);
    spyOn(Settings, 'getCoreMetaEdSourceDirectory').andReturn(coreMetaEdSourceDirectory);
    spyOn(atom.project, 'getPaths');
    spyOn(atom, 'pickFolder');
  });

  describe('when creating new extension project', () => {
    beforeEach(() => {
      spyOn(coreMetaEd, 'createExtensionProjectConfiguration');
    });

    it('returns if no valid core MetaEd directory', () => {
      atom.project.getPaths.andReturn([]);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(atom.pickFolder).not.toHaveBeenCalled();
      expect(coreMetaEd.createExtensionProjectConfiguration).not.toHaveBeenCalled();
    });

    it('prompts user to select directory if no extension project exists, returns if user cancels', () => {
      let callbackCalled = false;
      atom.project.getPaths.andReturn(['corePath']);
      // eslint-disable-next-line
      atom.pickFolder.andCallFake(callback => (callbackCalled = true));
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);
      // $FlowIgnore - jasmine global
      waitsFor(() => callbackCalled);
      // $FlowIgnore - jasmine golbal
      runs(() => {
        expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
        expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
        expect(atom.pickFolder).toHaveBeenCalled();
        expect(coreMetaEd.createExtensionProjectConfiguration).not.toHaveBeenCalled();
      });
    });

    it('creates extension project configuration if extension project already exists', () => {
      spyOn(fs, 'writeFileSync').andReturn(true);
      atom.project.getPaths.andReturn(['corePath', 'extension']);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      expect(atom.pickFolder).not.toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it('creates extension project configuration if more than two projects', () => {
      spyOn(fs, 'writeFileSync').andReturn(true);
      atom.project.getPaths.andReturn(['corePath', 'extension', 'anotherProject']);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      expect(atom.pickFolder).not.toHaveBeenCalled();

      expect(fs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('when creating extension project configuration', () => {
    beforeEach(() => {
      atom.project.getPaths.andReturn(['corePath', 'extensionPath']);
    });

    it('creates project config and writes to path if it does not exist', () => {
      spyOn(fs, 'existsSync').andReturn(false);
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.createExtensionProjectConfiguration(testMetaEdLog);

      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      const expectedPath = path.join('extensionPath/metaEd.json');

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expectedPath,
        metaEdProjectFileTemplate('2.0.0', coreMetaEdSourceDirectory, 'extensionPath'),
      );
    });
  });

  describe('when creating file from template', () => {
    const targetPath = 'targetPath';
    const targetFileName = 'targetFileName.metaed';
    const templateFunction = () => 'templateOutput';

    it('creates file at target path with target file name', () => {
      spyOn(fs, 'existsSync').andReturn(false);
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.createFromTemplate(targetPath, targetFileName, templateFunction);

      expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('targetPath/targetFileName.metaed'), 'templateOutput');
    });

    it('adds number to file name if file already exists', () => {
      spyOn(fs, 'existsSync').andCallFake(filepath => filepath.endsWith('targetFileName.metaed'));
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.createFromTemplate(targetPath, targetFileName, templateFunction);

      expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('targetPath/targetFileName1.metaed'), 'templateOutput');
    });

    it('continues to increment number of file name to ensure unique file name', () => {
      spyOn(fs, 'existsSync').andCallFake(filepath => !filepath.endsWith('targetFileName6.metaed'));
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.createFromTemplate(targetPath, targetFileName, templateFunction);

      expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('targetPath/targetFileName6.metaed'), 'templateOutput');
    });
  });
});
