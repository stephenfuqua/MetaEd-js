// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';
import R from 'ramda';
import path from 'path';
import fs from 'fs-extra';
import tmp from 'tmp-promise';
import { MetaEdConfiguration, newMetaEdConfiguration } from 'metaed-core';
import { findMetaEdProjectMetadata, MetaEdProjectMetadata } from './Projects';

function validProjectMetadata(metaEdProjectMetadata: MetaEdProjectMetadata[]): boolean {
  let hasInvalidProject = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const pm of metaEdProjectMetadata) {
    if (pm.invalidProject) {
      vscode.window.showErrorMessage(`Project file ${pm.invalidProjectReason}.`);
      hasInvalidProject = true;
    }
  }
  if (hasInvalidProject) return false;

  // const hasExtensionProjects: boolean = R.any((pm: MetaEdProjectMetadata) => pm.isExtensionProject, metaEdProjectMetadata);
  // const coreProjectMetadata: MetaEdProjectMetadata[] = metaEdProjectMetadata.filter(
  //   (pm: MetaEdProjectMetadata) => !pm.isExtensionProject,
  // );

  // // if (coreProjectMetadata.length > 1) {
  // //   outputWindow.addMessage('MetaEd does not support multiple core MetaEd projects.');
  // //   return false;
  // // }

  // // Note - we are intentionally not validating that there are multiple extension projects with the same namespace

  // if (coreProjectMetadata.length < 1) {
  //   outputWindow.addMessage('Please set up a core MetaEd directory under MetaEd -> Settings...');
  //   return false;
  // }

  // if (coreProjectMetadata[0].projectVersion !== getTargetDsVersionSemver()) {
  //   outputWindow.addMessage(
  //     'Core MetaEd project version does not match Data Standard version selected under MetaEd -> Settings...',
  //   );
  //   return false;
  // }

  // if (!hasExtensionProjects && !allianceMode()) {
  //   outputWindow.addMessage('No extension project.  Please add an extension project folder.');
  //   return false;
  // }

  // if (semver.satisfies(getTargetOdsApiVersionSemver(), '2.x')) {
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const pm of metaEdProjectMetadata) {
  //     if (pm.isExtensionProject && pm.projectNamespace !== 'Extension') {
  //       outputWindow.addMessage(
  //         `Namespace derived from projectName (first character capitalized, remove special characters) is not "Extension". ODS/API version 2.x only supports the namespace "Extension".`,
  //       );
  //       return false;
  //     }
  //   }
  // }

  return true;
}

async function createMetaEdConfiguration(): Promise<MetaEdConfiguration | undefined> {
  const metaEdProjectMetadata: MetaEdProjectMetadata[] = await findMetaEdProjectMetadata();
  if (!validProjectMetadata(metaEdProjectMetadata)) return undefined;

  const lastProjectPath = vscode.workspace.workspaceFolders ? R.last(vscode.workspace.workspaceFolders).uri.fsPath : '';

  const metaEdConfiguration: MetaEdConfiguration = {
    ...newMetaEdConfiguration(),
    defaultPluginTechVersion: '3.2.0',
    allianceMode: false,
    artifactDirectory: path.join(lastProjectPath, 'MetaEdOutput'),
  };

  metaEdProjectMetadata.forEach(pm => {
    metaEdConfiguration.projects.push({
      namespaceName: pm.projectNamespace,
      projectName: pm.projectName,
      projectVersion: pm.projectVersion,
      projectExtension: pm.projectExtension,
    });
    metaEdConfiguration.projectPaths.push(pm.projectPath);
  });

  return metaEdConfiguration;
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
    const metaEdConfiguration = await createMetaEdConfiguration();
    await fs.outputJson(tempConfigurationPath, { metaEdConfiguration }, { spaces: 2 });

    terminal.sendText(`node ${metaEdConsoleDirectory} --config ${tempConfigurationPath}`, true);

    // TODO: remove tempfile after awaiting for build to finish
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
