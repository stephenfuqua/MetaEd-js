// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs-extra';
import tmp from 'tmp-promise';
import { MetaEdConfiguration } from 'metaed-core';

function createMetaEdConfiguration(): MetaEdConfiguration | undefined {
  const { workspaceFolders } = vscode.workspace;
  if (workspaceFolders == null) return undefined;
  const workspaceRootPath = workspaceFolders[0].uri.fsPath;

  return {
    artifactDirectory: path.join(workspaceRootPath, 'MetaEdOutput'),
    deployDirectory: '',
    pluginTechVersion: {},
    projects: [
      {
        namespaceName: 'EdFi',
        projectName: 'Ed-Fi',
        projectVersion: '3.2.0',
        projectExtension: '',
      },
    ],
    projectPaths: [workspaceRootPath],
    pluginConfigDirectories: [],
    defaultPluginTechVersion: '3.2.0',
    allianceMode: false,
  };
}

// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // eslint-disable-next-line no-console
  console.log('Congratulations, your extension "vscode-metaed" is now active!');

  let NEXT_TERM_ID = 1;

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('extension.metaed.build', async () => {
    // The code you place here will be executed every time your command is executed

    vscode.window.showInformationMessage('Building MetaEd...');
    const metaEdConsoleDirectory = path.resolve(__dirname, '../..', 'metaed-console');

    const terminal: vscode.Terminal = vscode.window.createTerminal(
      `Ext Terminal #${NEXT_TERM_ID}`,
      'C:\\Windows\\System32\\cmd.exe',
    );
    NEXT_TERM_ID += 1;

    terminal.show(true);

    tmp.setGracefulCleanup();
    const tempConfigurationPath = await tmp.tmpName({ prefix: 'MetaEdConfig-VsCode-', postfix: '.json' });
    const metaEdConfiguration = createMetaEdConfiguration();
    await fs.outputJson(tempConfigurationPath, { metaEdConfiguration }, { spaces: 2 });

    terminal.sendText(`node ${metaEdConsoleDirectory} --config ${tempConfigurationPath}`, true);

    // TODO: remove tempfile after awaiting for build to finish
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
