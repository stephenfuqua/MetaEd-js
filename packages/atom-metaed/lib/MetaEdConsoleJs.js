/** @babel */
// @flow

// eslint-disable-next-line
import { Notification } from 'atom';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { spawn as nodeSpawn } from 'child_process';
import streamSplitter from 'stream-splitter';
import ansihtml from 'ansi-html';
import {
  getCoreMetaEdSourceDirectory,
  getMetaEdJsConsoleSourceDirectory,
  getCmdFullPath,
  getEdfiOdsApiSourceDirectory,
  allianceMode,
} from './Settings';
import type MetaEdLog from './MetaEdLog';

type TaskInputs = {
  'taskName': string,
  'isExtensionProject': boolean,
  'projectPath': string,
  'metaEdJsConsoleSourceDirectory': string,
  'coreMetaEdSourceDirectory': string,
  'cmdFullPath': string,
  'packageFilePath': string,
  'artifactPath': string,
  'edfiOdsApiSourceDirectory': ?string,
  'edfiOdsRepoDirectory': ?string,
  'edfiOdsImplementationRepoDirectory': ?string,
  'consolePath': string,
}

export default class MetaEdConsoleJs {
  // this is to allow mocking of spawn in tests
  _spawn: nodeSpawn;
  _metaEdLog: MetaEdLog;

  constructor(metaEdLog: MetaEdLog) {
    this._spawn = nodeSpawn;
    this._metaEdLog = metaEdLog;
  }

  build(isExtensionProject: boolean = false) {
    this._task('generate-artifacts', isExtensionProject);
  }

  deploy(isExtensionProject: boolean = false) {
    const result = atom.confirm({
      message: 'Are you sure you want to deploy MetaEd artifacts?',
      detailedMessage: 'This will overwrite core and extension files in the Ed-Fi ODS / API with MetaEd generated versions.  You will need to run initdev afterwards to reinitialize the Ed-Fi ODS / API.',
      buttons: [
        'OK',
        'Cancel',
      ],
    });
    if (result !== 0) {
      return;
    }
    if (isExtensionProject) {
      // deploy-extensions-only
    } else {
      // deploy
    }
  }

  _task(taskName: string, isExtensionProject: boolean = false): Promise<void> {
    this._metaEdLog.clear();

    const inputs = this._verifyInputs(taskName, isExtensionProject);
    if (!inputs) {
      return Promise.reject();
    }
    this._metaEdLog.addMessage(`Beginning execution of MetaEd task ${taskName}...`);

    return this._cleanUpMetaEdArtifacts(inputs.artifactPath)
    .then(() => this._executeTask(inputs));
  }

  _cleanUpMetaEdArtifacts(artifactPath: string): Promise<void> {
    // close all MetaEdOutput tabs
    const panes = atom.workspace.getPanes();
    panes.forEach((pane) => {
      pane.getItems().forEach((editor) => {
        if (typeof editor.getPath === 'function') {
          const editorPath = editor.getPath();
          if (editorPath && editorPath.startsWith(artifactPath)) {
            pane.destroyItem(editor);
          }
        }
      });
    });

      // collapse MetaEdOutputDirectory in tree-view if exists
      // (workaround for Atom GitHub issue #3365)
    return this._collapseTreeViewDirectory(artifactPath).then(() => {
      // remove MetaEdOutput directory
      fs.removeSync(artifactPath);
    }).catch((exception) => {
      console.error(exception);
      if (fs.existsSync(artifactPath)) {
        this._metaEdLog.addMessage(`Unable to delete output directory at path "${artifactPath}".`);
      }
      if (exception.code === 'ENOTEMPTY' || exception.code === 'EPERM') {
        this._metaEdLog.addMessage('Please close any files or folders that may be open in other applications.');
      }
      return Promise.reject(exception);
    });
  }

  _verifyInputs(taskName: string, isExtensionProject: boolean = false): ?TaskInputs {
    let projectPath = atom.project.getPaths()[1];
    if (!projectPath && !allianceMode()) {
      this._metaEdLog.addMessage('No Extension Project found in editor. Please add an extension project folder.');
      return null;
    }

    if (!projectPath && allianceMode()) {
      if (atom.project.getPaths().length < 1) {
        this._metaEdLog.addMessage('Please set up a core MetaEd directory under File -> Settings -> Packages -> atom-metaed.');
        return null;
      }
      projectPath = atom.project.getPaths()[0];
    }

    // TODO: change to getMetaEdConsoleSourceDirectory once it becomes default setting
    const metaEdJsConsoleSourceDirectory = getMetaEdJsConsoleSourceDirectory();
    const coreMetaEdSourceDirectory = getCoreMetaEdSourceDirectory();

    // cmdFullPath is for Windows
    const cmdFullPath = getCmdFullPath();
    const packageFilePath = path.join(metaEdJsConsoleSourceDirectory, 'package.json');
    if (!fs.existsSync(packageFilePath)) {
      this._metaEdLog.addMessage(`Unable to find package.json file in metaed-console at configured path "${metaEdJsConsoleSourceDirectory}".`);
      this._metaEdLog.addMessage('Please configure MetaEd JS Console Source Directory under the atom-metaed package to target the metaed-console root directory.');
      return null;
    }
    if (!fs.existsSync(coreMetaEdSourceDirectory)) {
      this._metaEdLog.addMessage(`Unable to find Core MetaEd Source Directory at configured path "${coreMetaEdSourceDirectory}".`);
      this._metaEdLog.addMessage('Please configure Core MetaEd Source Directory under the atom-metaed package to target a core Ed-Fi Model root directory.');
      return null;
    }
    if (!fs.existsSync(cmdFullPath) && os.platform() === 'win32') {
      this._metaEdLog.addMessage(`Unable to find cmd.exe at configured path "${cmdFullPath}".`);
      this._metaEdLog.addMessage('Please configure "Full Path to Cmd.exe" under the atom-metaed package to target the command prompt for Windows (Usually found at C:\\Windows\\System32\\cmd.exe).');
      return null;
    }
    const artifactPath = path.join(projectPath, 'MetaEdOutput/');

    let consolePath = path.resolve(metaEdJsConsoleSourceDirectory, '../metaed-console/dist/metaed-console.js');
    if (!fs.existsSync(consolePath)) {
      consolePath = path.resolve(__dirname, '../node_modules/metaed-console/dist/metaed-console.js');
      if (!fs.existsSync(consolePath)) {
        this._metaEdLog.addMessage(consolePath);
        this._metaEdLog.addMessage(`Unable to find the metaed-console.js executable in the Core MetaEd Source Directory at configured path "${coreMetaEdSourceDirectory}" or its parent.`);
        return null;
      }
    }

    let edfiOdsApiSourceDirectory;
    let edfiOdsRepoDirectory;
    let edfiOdsImplementationRepoDirectory;
    if (taskName.startsWith('deploy')) {
      edfiOdsApiSourceDirectory = getEdfiOdsApiSourceDirectory();
      edfiOdsRepoDirectory = path.join(edfiOdsApiSourceDirectory, 'Ed-Fi-ODS/');
      edfiOdsImplementationRepoDirectory = path.join(edfiOdsApiSourceDirectory, 'Ed-Fi-ODS-Implementation/');
      if (!fs.existsSync(edfiOdsRepoDirectory) || !fs.existsSync(edfiOdsImplementationRepoDirectory)) {
        this._metaEdLog.addMessage(`Unable to find Ed-Fi-ODS and Ed-Fi-ODS-Implementation folders at configured path "${edfiOdsApiSourceDirectory}".`);
        this._metaEdLog.addMessage('Please configure Ed-Fi ODS Api Source Directory under the atom-metaed package to target the local copy of the Ed-Fi-ODS Api source code.  The targeted folder should contain the repositories for Ed-Fi-ODS and Ed-Fi-ODS-Implementation.');
        return null;
      }
    }

    return {
      taskName,
      isExtensionProject,
      projectPath,
      metaEdJsConsoleSourceDirectory,
      coreMetaEdSourceDirectory,
      cmdFullPath,
      packageFilePath,
      artifactPath,
      edfiOdsApiSourceDirectory,
      edfiOdsRepoDirectory,
      edfiOdsImplementationRepoDirectory,
      consolePath,
    };
  }

  _createTaskParams(inputs: TaskInputs) {
    const params = [
      '/s',
      '/c',
      `node ${inputs.consolePath}`,
    ];
    if (inputs.isExtensionProject) {
      params.push(...['-e', inputs.coreMetaEdSourceDirectory]);
      params.push(...['-x', inputs.projectPath]);
    } else {
      params.push(...['-e', inputs.coreMetaEdSourceDirectory]);
    }
    if (inputs.taskName.startsWith('deploy')) {
      // deploy
    }
    return params;
  }

  _executeTask(inputs: TaskInputs) {
    const startNotification = new Notification('info', 'Building MetaEd...', { dismissable: true });
    const failNotification = new Notification('error', 'MetaEd Build Failed!', { dismissable: true });
    const buildErrorsNotification = new Notification('warning', 'MetaEd Build Errors Detected!', { dismissable: true });
    let resultNotification = new Notification('success', 'MetaEd Build Complete!', { dismissable: true });

    startNotification.onDidDisplay(() => setTimeout(() => startNotification.dismiss(), 10000));

    [resultNotification, failNotification, buildErrorsNotification].forEach(notification =>
      notification.onDidDisplay(() => {
        startNotification.dismiss();
        setTimeout(() => notification.dismiss(), 3000);
      }));

    setImmediate(() => atom.notifications.addNotification(startNotification));

    const taskParams = this._createTaskParams(inputs);
    if (!taskParams) {
      return;
    }

    console.log(`Executing cmd.exe with parameters ${JSON.stringify(taskParams)}.`);

    const childProcess = this._spawn(
      inputs.cmdFullPath,
      taskParams, { cwd: inputs.metaEdJsConsoleSourceDirectory });

    const outputSplitter = childProcess.stdout.pipe(streamSplitter('\n'));
    outputSplitter.encoding = 'utf8';
    outputSplitter.on('token', (token) => {
      this._metaEdLog.addMessage(ansihtml(token), true);
    });

    childProcess.stderr.on('data', (data) => {
      this._metaEdLog.addMessage(ansihtml(data.toString()).replace(/(?:\r\n|\r|\n)/g, '<br />'), true);
      resultNotification = buildErrorsNotification;
    });

    childProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        this._metaEdLog.addMessage(`Successfully executed MetaEd task ${inputs.taskName}.`);
      } else {
        this._metaEdLog.addMessage(`Error on call to MetaEd task ${inputs.taskName}.`);
        resultNotification = failNotification;
      }
      atom.notifications.addNotification(resultNotification);
    });
  }

    // collapse directory path in tree-view if exists (workaround for Atom GitHub issue #3365)
  _collapseTreeViewDirectory(pathString: string): Promise<void> {
    return atom.packages.activatePackage('tree-view').then((treeViewPackage) => {
      const treeView = treeViewPackage.mainModule.treeView;
      const directoryEntry = treeView.selectEntryForPath(pathString);
      if (directoryEntry) {
        treeView.collapseDirectory(directoryEntry);
      }
      return Promise.resolve();
    });
  }
}
