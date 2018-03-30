/** @babel */
// @flow

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// eslint-disable-next-line
import { Notification } from 'atom';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import tmp from 'tmp-promise';
import { spawn } from 'child_process';
import streamSplitter from 'stream-splitter';
import ansihtml from 'ansi-html';
import type { MetaEdConfiguration } from 'metaed-core';
import { getMetaEdConfig } from './CoreMetaEd';
import { getMetaEdJsConsoleSourceDirectory, getCmdFullPath, allianceMode } from './Settings';
import type MetaEdLog from './MetaEdLog';

type BuildPaths = {
  artifactDirectory: string,
  metaEdConsoleDirectory: string,
  cmdExePath: string,
  metaEdConsolePath: string,
  extensionConfigPath: string,
  projectDirectory: string,
};

// collapse directory path in tree-view if exists (workaround for Atom GitHub issue #3365)
function collapseTreeViewDirectory(pathString: string): Promise<void> {
  return atom.packages.activatePackage('tree-view').then(treeViewPackage => {
    const treeView = treeViewPackage.mainModule.treeView;
    const directoryEntry = treeView.selectEntryForPath(pathString);
    if (directoryEntry) {
      treeView.collapseDirectory(directoryEntry);
    }
    return Promise.resolve();
  });
}

function cleanUpMetaEdArtifacts(artifactDirectory: string, metaEdLog: MetaEdLog): Promise<void> {
  // close all MetaEdOutput tabs
  const panes = atom.workspace.getPanes();
  panes.forEach(pane => {
    pane.getItems().forEach(editor => {
      if (typeof editor.getPath === 'function') {
        const editorPath = editor.getPath();
        if (editorPath && editorPath.startsWith(artifactDirectory)) {
          pane.destroyItem(editor);
        }
      }
    });
  });

  // collapse MetaEdOutputDirectory in tree-view if exists
  // (workaround for Atom GitHub issue #3365)
  return collapseTreeViewDirectory(artifactDirectory)
    .then(() => {
      // remove MetaEdOutput directory
      fs.removeSync(artifactDirectory);
    })
    .catch(exception => {
      console.error(exception);
      if (fs.existsSync(artifactDirectory)) {
        metaEdLog.addMessage(`Unable to delete output directory at path "${artifactDirectory}".`);
      }
      if (exception.code === 'ENOTEMPTY' || exception.code === 'EPERM') {
        metaEdLog.addMessage('Please close any files or folders that may be open in other applications.');
      }
      return Promise.reject(exception);
    });
}

function verifyBuildPaths(metaEdLog: MetaEdLog): ?BuildPaths {
  // TODO: support multiple extension projects
  let projectDirectory = atom.project.getPaths()[1];
  if (projectDirectory == null && !allianceMode()) {
    metaEdLog.addMessage('No Extension Project found in editor. Please add an extension project folder.');
    return null;
  }

  if (projectDirectory == null && allianceMode()) {
    if (atom.project.getPaths().length < 1) {
      metaEdLog.addMessage('Please set up a core MetaEd directory under File -> Settings -> Packages -> atom-metaed.');
      return null;
    }
    projectDirectory = atom.project.getPaths()[0];
  }

  const extensionConfigPath: string = getMetaEdConfig(projectDirectory, metaEdLog);
  if (!fs.existsSync(extensionConfigPath)) {
    metaEdLog.addMessage(
      `No Extension Project Configuration found in ${projectDirectory}. Please add an extension configuration`,
    );
    return null;
  }

  // TODO: change to getMetaEdConsoleSourceDirectory once it becomes default setting
  const metaEdConsoleDirectory = getMetaEdJsConsoleSourceDirectory();

  // cmdExePath is for Windows
  const cmdExePath = getCmdFullPath();

  if (!fs.existsSync(path.join(metaEdConsoleDirectory, 'package.json'))) {
    metaEdLog.addMessage(
      `Unable to find package.json file in metaed-console at configured path "${metaEdConsoleDirectory}".`,
    );
    metaEdLog.addMessage(
      'Please configure MetaEd JS Console Source Directory under the atom-metaed package to target the metaed-console root directory.',
    );
    return null;
  }
  if (!fs.existsSync(cmdExePath) && os.platform() === 'win32') {
    metaEdLog.addMessage(`Unable to find cmd.exe at configured path "${cmdExePath}".`);
    metaEdLog.addMessage(
      'Please configure "Full Path to Cmd.exe" under the atom-metaed package to target the command prompt for Windows (Usually found at C:\\Windows\\System32\\cmd.exe).',
    );
    return null;
  }
  const artifactDirectory = path.join(projectDirectory, 'MetaEdJsOutput/');

  let metaEdConsolePath = path.resolve(metaEdConsoleDirectory, '../metaed-console/dist/index.js');
  if (!fs.existsSync(metaEdConsolePath)) {
    metaEdConsolePath = path.resolve(__dirname, '../node_modules/metaed-console/dist/index.js');
    if (!fs.existsSync(metaEdConsolePath)) {
      metaEdLog.addMessage(metaEdConsolePath);
      metaEdLog.addMessage(
        `Unable to find the index.js executable for metaed-console in the Core MetaEd Source Directory at configured path "${metaEdConsoleDirectory}" or its parent.`,
      );
      return null;
    }
  }

  return {
    metaEdConsoleDirectory,
    cmdExePath,
    artifactDirectory,
    metaEdConsolePath,
    extensionConfigPath,
    projectDirectory,
  };
}

function executeBuild(
  { cmdExePath, metaEdConsolePath, metaEdConsoleDirectory },
  metaEdConfigurationPath,
  metaEdLog: MetaEdLog,
): Promise<boolean> {
  return new Promise(resolve => {
    const startNotification = new Notification('info', 'Building MetaEd...', { dismissable: true });
    const failNotification = new Notification('error', 'MetaEd Build Failed!', { dismissable: true });
    const buildErrorsNotification = new Notification('warning', 'MetaEd Build Errors Detected!', { dismissable: true });
    let resultNotification = new Notification('success', 'MetaEd Build Complete!', { dismissable: true });

    startNotification.onDidDisplay(() => setTimeout(() => startNotification.dismiss(), 10000));

    [resultNotification, failNotification, buildErrorsNotification].forEach(notification =>
      notification.onDidDisplay(() => {
        startNotification.dismiss();
        setTimeout(() => notification.dismiss(), 3000);
      }),
    );

    setImmediate(() => atom.notifications.addNotification(startNotification));

    const taskParams = ['/s', '/c', `node "${metaEdConsolePath}"`, '--config', `"${metaEdConfigurationPath}"`];

    console.log(`[MetaEdConsoleJS] Executing '${cmdExePath}' with parameters ${taskParams.toString()}.`);

    const childProcess = spawn(cmdExePath, taskParams, {
      cwd: metaEdConsoleDirectory,
      shell: true,
    });

    const outputSplitter: any = childProcess.stdout.pipe(streamSplitter('\n'));
    outputSplitter.encoding = 'utf8';
    outputSplitter.on('token', token => {
      metaEdLog.addMessage(ansihtml(token), true);
    });

    childProcess.stderr.on('data', data => {
      metaEdLog.addMessage(ansihtml(data.toString()).replace(/(?:\r\n|\r|\n)/g, '<br />'), true);
      resultNotification = buildErrorsNotification;
    });

    childProcess.on('close', code => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        metaEdLog.addMessage(`Successfully executed MetaEd build.`);
      } else {
        metaEdLog.addMessage(`Error on MetaEd build.`);
        resultNotification = failNotification;
      }
      atom.notifications.addNotification(resultNotification);
      return resolve(code === 0);
    });
  });
}

// initialConfiguration is temporary until full multi-project support
export async function build(initialConfiguration: MetaEdConfiguration, metaEdLog: MetaEdLog): Promise<boolean> {
  try {
    metaEdLog.clear();

    const buildPaths: ?BuildPaths = verifyBuildPaths(metaEdLog);
    if (!buildPaths) return false;
    metaEdLog.addMessage(`Beginning MetaEd JS build...`);

    const metaEdConfiguration = {
      ...initialConfiguration,
      artifactDirectory: buildPaths.artifactDirectory,
    };

    // add extension project if there
    // $FlowIgnore
    const oldMetaEdJson = require(buildPaths.extensionConfigPath).metaEdConfiguration;
    if (oldMetaEdJson.namespace !== 'edfi') {
      metaEdConfiguration.projects.push({
        namespace: oldMetaEdJson.namespace,
        projectName: oldMetaEdJson.namespace,
        projectVersion: '1.0.0',
        projectExtension: 'EXTENSION',
      });
      metaEdConfiguration.projectPaths.push(buildPaths.projectDirectory);
    }

    await cleanUpMetaEdArtifacts(buildPaths.artifactDirectory, metaEdLog);

    tmp.setGracefulCleanup();
    const tempConfigurationPath = tmp.tmpNameSync({ prefix: 'MetaEdConfig-', postfix: '.json' });
    fs.outputJsonSync(tempConfigurationPath, { metaEdConfiguration }, { spaces: 2 });

    const buildResult = await executeBuild(buildPaths, tempConfigurationPath, metaEdLog);

    fs.removeSync(tempConfigurationPath);
    return buildResult;
  } catch (e) {
    metaEdLog.addMessage(e);
    return false;
  }
}
