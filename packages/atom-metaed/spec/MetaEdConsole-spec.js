'use babel';

import fs from 'fs-extra';
import path from 'path';
import * as Settings from '../lib/Settings';
import MetaEdConsole from '../lib/MetaEdConsole';

describe('MetaEdConsole', () => {
  let metaEdConsole;
  let testMetaEdLog;

  beforeEach(() => {
    testMetaEdLog = jasmine.createSpyObj('MetaEdLog', ['addMessage', 'clear']);
    spyOn(Settings, 'getCmdFullPath').andReturn('cmdFullPath');
    spyOn(Settings, 'getCoreMetaEdSourceDirectory').andReturn('coreMetaEdSourceDirectory');
    spyOn(Settings, 'getEdfiOdsApiSourceDirectory').andReturn('edfiOdsApiSourceDirectory');
    spyOn(Settings, 'getMetaEdConsoleSourceDirectory').andReturn('metaEdConsoleSourceDirectory');
    metaEdConsole = new MetaEdConsole(testMetaEdLog);
    spyOn(atom.project, 'getPaths');
  });

  describe('when building meta ed', () => {
    beforeEach(() => {
      spyOn(metaEdConsole, '_gulpTask');
    });

    it('build chooses a gulp task with default isExtensionProject', () => {
      metaEdConsole.build();

      expect(metaEdConsole._gulpTask).toHaveBeenCalledWith('generate-artifacts', false);
    });

    it('build chooses a gulp task with explicit isExtensionProject', () => {
      metaEdConsole.build(true);

      expect(metaEdConsole._gulpTask).toHaveBeenCalledWith('generate-artifacts', true);
    });
  });

  describe('when deploying meta ed', () => {
    beforeEach(() => {
      spyOn(atom, 'confirm');
      spyOn(metaEdConsole, '_gulpTask');
    });

    it('prompts user to confirm action and aborts if user chooses cancels', () => {
      atom.confirm.andReturn(1);
      metaEdConsole.deploy();

      expect(metaEdConsole._gulpTask).not.toHaveBeenCalled();
    });

    it('deploy chooses a gulp task with default isExtensionProject', () => {
      atom.confirm.andReturn(0);
      metaEdConsole.deploy();

      expect(metaEdConsole._gulpTask).toHaveBeenCalledWith('deploy', false);
    });

    it('deploy chooses a gulp task with explicit isExtensionProject', () => {
      atom.confirm.andReturn(0);
      metaEdConsole.deploy(true);

      expect(metaEdConsole._gulpTask).toHaveBeenCalledWith('deploy-extensions-only', true);
    });
  });

  describe('when choosing a gulp task', () => {
    let gulpInputs;
    beforeEach(() => {
      gulpInputs = {
        artifactPath: 'artifactPath',
      };
      spyOn(metaEdConsole, '_verifyGulpInputs');
      spyOn(metaEdConsole, '_cleanUpMetaEdArtifacts').andReturn(Promise.resolve());
      spyOn(metaEdConsole, '_executeGulpTask');
    });

    it('clears meta ed log always', () => {
      metaEdConsole._gulpTask('build');

      expect(testMetaEdLog.clear).toHaveBeenCalled();
    });

    it('returns if no valid gulp inputs', () => {
      metaEdConsole._gulpTask('build');

      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
      expect(metaEdConsole._cleanUpMetaEdArtifacts).not.toHaveBeenCalled();
    });

    it('executes gulp task if valid inputs', () => {
      metaEdConsole._verifyGulpInputs.andReturn(gulpInputs);
      metaEdConsole._gulpTask('build');

      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(metaEdConsole._cleanUpMetaEdArtifacts).toHaveBeenCalled();
      waitsFor(() => metaEdConsole._executeGulpTask.calls.length > 0, 'Gulp Task should have been executed', 500);
      runs(() => {
        expect(metaEdConsole._executeGulpTask).toHaveBeenCalledWith(gulpInputs);
      });
    });
  });

  describe('when collapsing tree view directory', () => {
    let treeViewSpy;

    beforeEach(() => {
      treeViewSpy = jasmine.createSpyObj('treeView', ['collapseDirectory', 'selectEntryForPath']);
      const treeViewPackageStub = { mainModule: { treeView: treeViewSpy } };
      spyOn(atom.packages, 'activatePackage').andReturn(Promise.resolve(treeViewPackageStub));
    });

    it('ignores the change if the directory does not exist', () => {
      treeViewSpy.selectEntryForPath.andReturn(undefined);
      const pathInput = 'path';
      waitsForPromise(() => metaEdConsole._collapseTreeViewDirectory(pathInput));
      runs(() => {
        expect(treeViewSpy.collapseDirectory).not.toHaveBeenCalled();
      });
    });

    it('collapses the folder if the directory does exist', () => {
      const directoryEntry = 'directoryEntry';
      treeViewSpy.selectEntryForPath.andReturn(directoryEntry);
      const pathInput = 'path';
      waitsForPromise(() => metaEdConsole._collapseTreeViewDirectory(pathInput));
      runs(() => {
        expect(treeViewSpy.collapseDirectory).toHaveBeenCalledWith(directoryEntry);
      });
    });
  });

  describe('when verifying gulp inputs', () => {
    it('returns null and logs a message if no projects', () => {
      atom.project.getPaths.andReturn([]);
      const gulpInputs = metaEdConsole._verifyGulpInputs('build');

      expect(gulpInputs).toBeNull();
      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
    });

    it('returns null and logs a message if only 1 project', () => {
      atom.project.getPaths.andReturn(['project 1']);
      const gulpInputs = metaEdConsole._verifyGulpInputs('build');

      expect(gulpInputs).toBeNull();
      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
    });

    it('returns null and logs a message if gulp file path does not exist', () => {
      atom.project.getPaths.andReturn(['project 1', 'project 2']);
      spyOn(fs, 'existsSync').andCallFake(filepath => !filepath.includes('metaEdConsoleSourceDirectory'));
      const gulpInputs = metaEdConsole._verifyGulpInputs('build');

      expect(gulpInputs).toBeNull();
      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
    });

    it('returns null and logs a message if cmd full path does not exist', () => {
      atom.project.getPaths.andReturn(['project 1', 'project 2']);
      spyOn(fs, 'existsSync').andCallFake(filepath => !filepath.includes('cmdFullPath'));
      const gulpInputs = metaEdConsole._verifyGulpInputs('build');

      expect(gulpInputs).toBeNull();
      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
    });

    it('returns gulp inputs if build and all config values set', () => {
      atom.project.getPaths.andReturn(['project 1', 'project 2']);
      spyOn(fs, 'existsSync').andReturn(true);
      const gulpInputs = metaEdConsole._verifyGulpInputs('build');

      expect(gulpInputs.taskName).toEqual('build');
      expect(gulpInputs.isExtensionProject).toEqual(false);
      expect(gulpInputs.projectPath).toEqual('project 2');
      expect(gulpInputs.metaEdConsoleSourceDirectory).toEqual('metaEdConsoleSourceDirectory');
      expect(gulpInputs.coreMetaEdSourceDirectory).toEqual('coreMetaEdSourceDirectory');
      expect(gulpInputs.cmdFullPath).toEqual('cmdFullPath');
      expect(gulpInputs.gulpFilePath).toEqual(path.join('metaEdConsoleSourceDirectory/gulpfile.js'));
      expect(gulpInputs.artifactPath).toEqual(path.join('project 2/MetaEdOutput/'));
      expect(gulpInputs.edfiOdsApiSourceDirectory).toBeUndefined();
      expect(gulpInputs.edfiOdsRepoDirectory).toBeUndefined();
      expect(gulpInputs.edfiOdsImplementationRepoDirectory).toBeUndefined();
      expect(gulpInputs.gulpPath).toContain(path.join('/.bin/gulp.cmd'));

      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
    });

    it('returns null and logs a message if deploy task and edfi ods api source directory does not exist', () => {
      atom.project.getPaths.andReturn(['project 1', 'project 2']);
      spyOn(fs, 'existsSync').andCallFake(
        filepath => !filepath.includes('metaEdConsoleSourceDirectory') && !filepath.includes('cmdFullPath'),
      );
      const gulpInputs = metaEdConsole._verifyGulpInputs('deploy');

      expect(gulpInputs).toBeNull();
      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
    });

    it('returns gulp inputs if deploy and all config values set', () => {
      atom.project.getPaths.andReturn(['project 1', 'project 2']);
      spyOn(fs, 'existsSync').andReturn(true);
      const gulpInputs = metaEdConsole._verifyGulpInputs('deploy');

      expect(gulpInputs.taskName).toEqual('deploy');
      expect(gulpInputs.isExtensionProject).toEqual(false);
      expect(gulpInputs.projectPath).toEqual('project 2');
      expect(gulpInputs.metaEdConsoleSourceDirectory).toEqual('metaEdConsoleSourceDirectory');
      expect(gulpInputs.coreMetaEdSourceDirectory).toEqual('coreMetaEdSourceDirectory');
      expect(gulpInputs.cmdFullPath).toEqual('cmdFullPath');
      expect(gulpInputs.gulpFilePath).toEqual(path.join('metaEdConsoleSourceDirectory/gulpfile.js'));
      expect(gulpInputs.artifactPath).toEqual(path.join('project 2/MetaEdOutput/'));
      expect(gulpInputs.edfiOdsApiSourceDirectory).toEqual('edfiOdsApiSourceDirectory');
      expect(gulpInputs.edfiOdsRepoDirectory).toEqual(path.join('edfiOdsApiSourceDirectory/Ed-Fi-ODS/'));
      expect(gulpInputs.edfiOdsImplementationRepoDirectory).toEqual(
        path.join('edfiOdsApiSourceDirectory/Ed-Fi-ODS-Implementation/'),
      );

      expect(gulpInputs.gulpPath).toContain(path.join('/.bin/gulp.cmd'));

      expect(testMetaEdLog.addMessage).not.toHaveBeenCalled();
    });
  });

  describe('when creating gulp task params', () => {
    let gulpInputs;
    beforeEach(() => {
      gulpInputs = {
        taskName: 'build',
        isExtensionProject: false,
        projectPath: 'projectPath',
        metaEdConsoleSourceDirectory: 'metaEdConsoleSourceDirectory',
        coreMetaEdSourceDirectory: 'coreMetaEdSourceDirectory',
        cmdFullPath: 'cmdFullPath',
        gulpFilePath: 'gulpFilePath',
        artifactPath: 'artifactPath',
        edfiOdsApiSourceDirectory: 'edfiOdsApiSourceDirectory',
        edfiOdsRepoDirectory: 'edfiOdsRepoDirectory',
        edfiOdsImplementationRepoDirectory: 'edfiOdsImplementationRepoDirectory',
        gulpPath: 'gulpPath',
        version: '2.0.0',
      };
    });

    it('returns build params for core project', () => {
      const gulpTaskParams = metaEdConsole._createGulpTaskParams(gulpInputs);

      expect(gulpTaskParams.length).toEqual(9);
      expect(gulpTaskParams[0]).toEqual('/s');
      expect(gulpTaskParams[1]).toEqual('/c');
      expect(gulpTaskParams[2]).toEqual('gulpPath build --color');
      expect(gulpTaskParams[3]).toEqual('--artifactPath');
      expect(gulpTaskParams[4]).toEqual(gulpInputs.artifactPath);
      expect(gulpTaskParams[5]).toEqual('--version');
      expect(gulpTaskParams[6]).toEqual(gulpInputs.version);
      expect(gulpTaskParams[7]).toEqual('--metaEdPath');
      expect(gulpTaskParams[8]).toEqual(gulpInputs.projectPath);
    });

    it('returns build params for extension project', () => {
      gulpInputs.isExtensionProject = true;
      const gulpTaskParams = metaEdConsole._createGulpTaskParams(gulpInputs);

      expect(gulpTaskParams.length).toEqual(12);
      expect(gulpTaskParams[0]).toEqual('/s');
      expect(gulpTaskParams[1]).toEqual('/c');
      expect(gulpTaskParams[2]).toEqual('gulpPath build --color');
      expect(gulpTaskParams[3]).toEqual('--artifactPath');
      expect(gulpTaskParams[4]).toEqual(gulpInputs.artifactPath);
      expect(gulpTaskParams[5]).toEqual('--version');
      expect(gulpTaskParams[6]).toEqual(gulpInputs.version);
      expect(gulpTaskParams[7]).toEqual('--metaEdPath');
      expect(gulpTaskParams[8]).toEqual(gulpInputs.coreMetaEdSourceDirectory);
      expect(gulpTaskParams[9]).toEqual('--extensionMetaEdPath');
      expect(gulpTaskParams[10]).toEqual(gulpInputs.projectPath);
      expect(gulpTaskParams[11]).toEqual('--includeExtensions');
    });

    it('returns deploy params for core project', () => {
      gulpInputs.taskName = 'deploy';
      const gulpTaskParams = metaEdConsole._createGulpTaskParams(gulpInputs);

      expect(gulpTaskParams.length).toEqual(13);
      expect(gulpTaskParams[0]).toEqual('/s');
      expect(gulpTaskParams[1]).toEqual('/c');
      expect(gulpTaskParams[2]).toEqual('gulpPath deploy --color');
      expect(gulpTaskParams[3]).toEqual('--artifactPath');
      expect(gulpTaskParams[4]).toEqual(gulpInputs.artifactPath);
      expect(gulpTaskParams[5]).toEqual('--version');
      expect(gulpTaskParams[6]).toEqual(gulpInputs.version);
      expect(gulpTaskParams[7]).toEqual('--metaEdPath');
      expect(gulpTaskParams[8]).toEqual(gulpInputs.projectPath);
      expect(gulpTaskParams[9]).toEqual('--odsApiRootPath');
      expect(gulpTaskParams[10]).toEqual(gulpInputs.edfiOdsRepoDirectory);
      expect(gulpTaskParams[11]).toEqual('--odsApiImplementationRootPath');
      expect(gulpTaskParams[12]).toEqual(gulpInputs.edfiOdsImplementationRepoDirectory);
    });

    it('returns deploy params for extension project', () => {
      gulpInputs.taskName = 'deploy';
      gulpInputs.isExtensionProject = true;
      const gulpTaskParams = metaEdConsole._createGulpTaskParams(gulpInputs);

      expect(gulpTaskParams.length).toEqual(16);
      expect(gulpTaskParams[0]).toEqual('/s');
      expect(gulpTaskParams[1]).toEqual('/c');
      expect(gulpTaskParams[2]).toEqual('gulpPath deploy --color');
      expect(gulpTaskParams[3]).toEqual('--artifactPath');
      expect(gulpTaskParams[4]).toEqual(gulpInputs.artifactPath);
      expect(gulpTaskParams[5]).toEqual('--version');
      expect(gulpTaskParams[6]).toEqual(gulpInputs.version);
      expect(gulpTaskParams[7]).toEqual('--metaEdPath');
      expect(gulpTaskParams[8]).toEqual(gulpInputs.coreMetaEdSourceDirectory);
      expect(gulpTaskParams[9]).toEqual('--extensionMetaEdPath');
      expect(gulpTaskParams[10]).toEqual(gulpInputs.projectPath);
      expect(gulpTaskParams[11]).toEqual('--includeExtensions');
      expect(gulpTaskParams[12]).toEqual('--odsApiRootPath');
      expect(gulpTaskParams[13]).toEqual(gulpInputs.edfiOdsRepoDirectory);
      expect(gulpTaskParams[14]).toEqual('--odsApiImplementationRootPath');
      expect(gulpTaskParams[15]).toEqual(gulpInputs.edfiOdsImplementationRepoDirectory);
    });
  });

  describe('when cleaning up meta ed artifacts', () => {
    const artifactPath = 'artifactPath';
    let pane1Spy;
    let paneToDestroyItemSpy;
    let editorToDestroySpy;

    beforeEach(() => {
      spyOn(metaEdConsole, '_collapseTreeViewDirectory').andReturn(Promise.resolve());
    });

    it('destroys all editors and removes the artifact path', () => {
      spyOn(fs, 'removeSync');
      const editor1 = {};
      const editor2Spy = jasmine.createSpyObj('Editor 2', ['getPath']);
      const editor3Spy = jasmine.createSpyObj('Editor 3', ['getPath']);
      editorToDestroySpy = jasmine.createSpyObj('Editor 4', ['getPath']);
      editor3Spy.getPath.andReturn('PathWithNoMatch');
      editorToDestroySpy.getPath.andReturn(path.join(artifactPath, 'file'));
      pane1Spy = jasmine.createSpyObj('Pane 1', ['destroyItem', 'getItems']);
      pane1Spy.getItems.andReturn([]);
      paneToDestroyItemSpy = jasmine.createSpyObj('Pane 2', ['destroyItem', 'getItems']);
      paneToDestroyItemSpy.getItems.andReturn([editor1, editor2Spy, editor3Spy, editorToDestroySpy]);
      spyOn(atom.workspace, 'getPanes').andReturn([pane1Spy, paneToDestroyItemSpy]);
      waitsForPromise(() => metaEdConsole._cleanUpMetaEdArtifacts(artifactPath));
      runs(() => {
        expect(pane1Spy.destroyItem).not.toHaveBeenCalled();
        expect(paneToDestroyItemSpy.destroyItem.calls.length).toEqual(1);
        expect(paneToDestroyItemSpy.destroyItem).toHaveBeenCalledWith(editorToDestroySpy);
        expect(fs.removeSync).toHaveBeenCalledWith(artifactPath);
      });
    });
  });

  describe('when executing gulp task', () => {
    let gulpInputs;
    let gulpTaskParams;
    let childProcess;
    let stdOut;
    let stdErr;
    let outputSplitterCallback;
    let stdErrCallback;
    let closeCallback;
    beforeEach(() => {
      childProcess = jasmine.createSpyObj('childProcess', ['on']);
      childProcess.stdout = stdOut;
      childProcess.stderr = stdErr;

      childProcess.on.andCallFake((eventName, callback) => {
        closeCallback = code => callback(code);
      });
      spyOn(metaEdConsole, '_spawn').andReturn(childProcess);

      stdOut = jasmine.createSpyObj('stdOut', ['pipe']);
      stdErr = jasmine.createSpyObj('stdErr', ['on']);
      const outputSplitter = jasmine.createSpyObj('outputSplitter', ['on']);
      stdOut.pipe.andReturn(outputSplitter);
      outputSplitter.on.andCallFake((eventName, callback) => {
        outputSplitterCallback = token => callback(token);
      });
      stdErr.on.andCallFake((eventName, callback) => {
        stdErrCallback = data => callback(data);
      });

      gulpInputs = {
        taskName: 'build',
        cmdFullPath: 'cmdFullPath',
        metaEdConsoleSourceDirectory: 'metaEdConsoleSourceDirectory',
      };
      gulpTaskParams = [];
      spyOn(metaEdConsole, '_createGulpTaskParams');
    });

    it('returns and does not spawn a process if no gulp task params', () => {
      metaEdConsole._createGulpTaskParams.andReturn(undefined);
      metaEdConsole._executeGulpTask(gulpInputs);

      expect(metaEdConsole._spawn).not.toHaveBeenCalled();
    });

    it('spawns child process with events', () => {
      metaEdConsole._createGulpTaskParams.andReturn(gulpTaskParams);
      metaEdConsole._executeGulpTask(gulpInputs);

      expect(metaEdConsole._spawn).toHaveBeenCalled();
      expect(childProcess.stdout.pipe).toHaveBeenCalled();
      expect(childProcess.stderr.on).toHaveBeenCalled();
      expect(childProcess.on).toHaveBeenCalled();
    });

    it('handles error events', () => {
      metaEdConsole._createGulpTaskParams.andReturn(gulpTaskParams);
      metaEdConsole._executeGulpTask(gulpInputs);
      stdErrCallback('errorData');

      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage.calls[0].args[0].includes('errorData')).toEqual(true);
      expect(testMetaEdLog.addMessage.calls[0].args[1]).toEqual(true);
    });

    it('handles token events', () => {
      metaEdConsole._createGulpTaskParams.andReturn(gulpTaskParams);
      metaEdConsole._executeGulpTask(gulpInputs);
      outputSplitterCallback('tokenData');

      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage.calls[0].args[0].includes('tokenData')).toEqual(true);
      expect(testMetaEdLog.addMessage.calls[0].args[1]).toEqual(true);
    });

    it('handles close success event', () => {
      metaEdConsole._createGulpTaskParams.andReturn(gulpTaskParams);
      metaEdConsole._executeGulpTask(gulpInputs);
      closeCallback(0);

      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage.calls[0].args[0].includes('Success')).toEqual(true);
    });

    it('handles close failure event', () => {
      metaEdConsole._createGulpTaskParams.andReturn(gulpTaskParams);
      metaEdConsole._executeGulpTask(gulpInputs);
      closeCallback(-1);

      expect(testMetaEdLog.addMessage).toHaveBeenCalled();
      expect(testMetaEdLog.addMessage.calls[0].args[0].includes('Error')).toEqual(true);
    });
  });
});
