/** @babel */

/*
import fs from 'fs-extra';
import path from 'path';
import * as Settings from '../lib/Settings';
import * as coreMetaEd from '../lib/CoreMetaEd';
import { metaEdConfigTemplate } from '../lib/templates/TemplateEngine';
import type OutputWindow from '../lib//OutputWindow';
import type MetaEdConfig from '../lib/MetaEdConfig';

const coreMetaEdSourceDirectory = 'coreMetaEdSourceDirectory';

describe('CoreMetaEd', (): void => {
  let testMetaEdLog: OutputWindow | any;
  let testMetaEdConfig: MetaEdConfig | any;

  beforeEach(() => {
    testMetaEdLog = jasmine.createSpyObj('OutputWindow', ['addMessage', 'clear']);
    testMetaEdConfig = jasmine.createSpyObj('MetaEdConfig', ['updateCoreMetaEdSourceDirectory']);
    spyOn(Settings, 'getCoreMetaEdSourceDirectory').andReturn(coreMetaEdSourceDirectory);
    spyOn(atom.project, 'getPaths');
    spyOn(atom, 'pickFolder');
  });

  describe('when creating new extension project', (): void => {
    it('returns if no valid core MetaEd directory', (): void => {
      atom.project.getPaths.andReturn([]);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(atom.pickFolder).not.toHaveBeenCalled();
    });

    it('prompts user to select directory if no extension project exists and returns when user cancels', (): void => {
      atom.project.getPaths.andReturn(['core']);
      atom.pickFolder.andCallFake(() => null);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      expect(atom.pickFolder).toHaveBeenCalled();
    });

    it('prompts user to select directory if no extension project exists', (): void => {
      atom.project.getPaths.andReturn(['core']);
      atom.pickFolder.andCallFake(() => ['extension']);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      expect(atom.pickFolder).toHaveBeenCalled();
    });

    it('prompts user to select directory if extension project already exists', (): void => {
      atom.project.getPaths.andReturn(['core', 'extension']);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      expect(atom.pickFolder).toHaveBeenCalled();
    });

    it('prompts user to select directory if multiple extension projects already exists', (): void => {
      atom.project.getPaths.andReturn(['core', 'extensionOne', 'extensionTwo']);
      coreMetaEd.createNewExtensionProject(testMetaEdLog, testMetaEdConfig);

      expect(testMetaEdConfig.updateCoreMetaEdSourceDirectory).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      expect(atom.pickFolder).toHaveBeenCalled();
    });
  });

  describe('when getting a metaed config', (): void => {
    beforeEach(() => {
      atom.project.getPaths.andReturn(['core', 'extension']);
    });

    it('uses an existing config if one exists', (): void => {
      spyOn(fs, 'existsSync').andReturn(true);
      spyOn(fs, 'writeFileSync').andReturn(false);
      coreMetaEd.getMetaEdConfig('extension', testMetaEdLog);

      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('creates config if none exist', (): void => {
      spyOn(fs, 'existsSync').andReturn(false);
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.getMetaEdConfig('extension', testMetaEdLog);

      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.join('extension/metaEd.json'),
        metaEdConfigTemplate('2.0.0', coreMetaEdSourceDirectory, 'extension'),
      );
    });
  });

  describe('when creating file from template', (): void => {
    const targetPath = 'targetPath';
    const targetFileName = 'targetFileName.metaed';
    const templateFunction = () => 'templateOutput';

    it('creates file at target path with target file name', (): void => {
      spyOn(fs, 'existsSync').andReturn(false);
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.createFromTemplate(targetPath, targetFileName, templateFunction);

      expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('targetPath/targetFileName.metaed'), 'templateOutput');
    });

    it('adds number to file name if file already exists', (): void => {
      spyOn(fs, 'existsSync').andCallFake(filepath => filepath.endsWith('targetFileName.metaed'));
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.createFromTemplate(targetPath, targetFileName, templateFunction);

      expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('targetPath/targetFileName1.metaed'), 'templateOutput');
    });

    it('continues to increment number of file name to ensure unique file name', (): void => {
      spyOn(fs, 'existsSync').andCallFake(filepath => !filepath.endsWith('targetFileName6.metaed'));
      spyOn(fs, 'writeFileSync').andReturn(true);
      coreMetaEd.createFromTemplate(targetPath, targetFileName, templateFunction);

      expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('targetPath/targetFileName6.metaed'), 'templateOutput');
    });
  });
});
*/
